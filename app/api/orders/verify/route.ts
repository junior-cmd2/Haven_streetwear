import { NextResponse } from "next/server";
import { getOrderTotal, getShippingFee, MAX_CART_QUANTITY } from "@/lib/checkout";
import {
  isCategory,
  getProduct,
  type Product,
} from "@/lib/data/products";
import {
  asString,
  getEmailFrom,
  getNotificationEmail,
  getResend,
  isValidEmail,
  renderOrderEmail,
} from "@/lib/email";

type IncomingItem = {
  category: string;
  id: number;
  size: string;
  quantity: number;
};

type IncomingBody = {
  reference?: unknown;
  items?: unknown;
  customer?: Record<string, unknown>;
  shipping?: Record<string, unknown>;
};

type ResolvedItem = {
  product: Product;
  size: string;
  quantity: number;
};

function resolveItems(input: unknown): ResolvedItem[] {
  if (!Array.isArray(input) || input.length === 0 || input.length > 50) {
    throw new Error("Your bag is empty or contains too many items.");
  }

  const resolved: ResolvedItem[] = [];

  for (const raw of input) {
    if (!raw || typeof raw !== "object") throw new Error("Invalid item in bag.");
    const item = raw as IncomingItem;

    const category = asString(item.category);
    const id = Number(item.id);
    const size = asString(item.size);
    const quantity = Number(item.quantity);

    if (!isCategory(category) || !Number.isInteger(id)) {
      throw new Error("Invalid item in bag.");
    }

    const product = getProduct(category, id);
    if (!product) throw new Error("An item in your bag is no longer available.");

    const resolvedSize = product.sizes.includes(size) ? size : product.sizes[0] ?? "One size";

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_CART_QUANTITY) {
      throw new Error("Invalid quantity in bag.");
    }

    const existing = resolved.find(
      (entry) => entry.product.category === product.category && entry.product.id === product.id && entry.size === resolvedSize,
    );

    if (existing) {
      existing.quantity = Math.min(MAX_CART_QUANTITY, existing.quantity + quantity);
    } else {
      resolved.push({ product, size: resolvedSize, quantity });
    }
  }

  return resolved;
}

async function verifyWithPaystack(
  reference: string,
  expectedAmount: number,
): Promise<{ ok: boolean; message?: string; status?: number }> {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    const demoAllowed =
      process.env.NODE_ENV !== "production" || process.env.PAYSTACK_ALLOW_DEMO === "true";

    if (!demoAllowed) {
      console.error(
        "[orders/verify] PAYSTACK_SECRET_KEY is missing in production. Refusing to accept an unverified payment.",
      );
      return {
        ok: false,
        status: 503,
        message:
          "Payment verification is not configured. Please contact support before placing this order.",
      };
    }

    console.warn(
      "[orders/verify] PAYSTACK_SECRET_KEY is not set — falling back to demo verification. Configure the secret key before accepting live payments.",
    );
    return { ok: true };
  }

  const response = await fetch(
    `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
    {
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return { ok: false, message: "We could not reach Paystack to verify this payment." };
  }

  const payload = (await response.json()) as {
    status?: boolean;
    data?: {
      status?: string;
      amount?: number;
      currency?: string;
    };
  };

  if (!payload.status || payload.data?.status !== "success") {
    return { ok: false, message: "This payment has not been completed." };
  }

  if (payload.data.currency && payload.data.currency !== "NGN") {
    return { ok: false, message: "Unexpected payment currency." };
  }

  if (typeof payload.data.amount !== "number" || payload.data.amount !== expectedAmount * 100) {
    return { ok: false, message: "The paid amount does not match this order." };
  }

  return { ok: true };
}

export async function POST(request: Request) {
  let body: IncomingBody;

  try {
    body = (await request.json()) as IncomingBody;
  } catch {
    return NextResponse.json({ verified: false, error: "Invalid request body." }, { status: 400 });
  }

  const reference = asString(body.reference);
  if (reference.length < 4 || reference.length > 120 || !/^[A-Za-z0-9._=:-]+$/.test(reference)) {
    return NextResponse.json({ verified: false, error: "Invalid payment reference." }, { status: 400 });
  }

  const customer = body.customer ?? {};
  const shipping = body.shipping ?? {};

  const email = asString(customer.email);
  const firstName = asString(customer.firstName);
  const lastName = asString(customer.lastName);
  const phone = asString(customer.phone);

  if (!isValidEmail(email)) {
    return NextResponse.json({ verified: false, error: "A valid email address is required." }, { status: 400 });
  }

  if (!firstName || !lastName) {
    return NextResponse.json({ verified: false, error: "Customer name is required." }, { status: 400 });
  }

  if (!/^[0-9+\s()-]{7,20}$/.test(phone)) {
    return NextResponse.json({ verified: false, error: "A valid phone number is required." }, { status: 400 });
  }

  const address = asString(shipping.address);
  const city = asString(shipping.city);
  const state = asString(shipping.state);

  if (address.length < 5 || !city || !state) {
    return NextResponse.json({ verified: false, error: "A complete delivery address is required." }, { status: 400 });
  }

  let items: ResolvedItem[];
  try {
    items = resolveItems(body.items);
  } catch (error) {
    return NextResponse.json(
      { verified: false, error: error instanceof Error ? error.message : "Invalid bag." },
      { status: 400 },
    );
  }

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = getShippingFee(subtotal);
  const total = getOrderTotal(subtotal);

  try {
    const verification = await verifyWithPaystack(reference, total);
    if (!verification.ok) {
      return NextResponse.json(
        { verified: false, error: verification.message ?? "Payment verification failed." },
        { status: verification.status ?? 400 },
      );
    }
  } catch (error) {
    console.error("[orders/verify] Paystack verification failed", error);
    return NextResponse.json(
      { verified: false, error: "We could not verify this payment. Please contact support." },
      { status: 502 },
    );
  }

  const resend = getResend();
  if (resend) {
    try {
      const { error } = await resend.emails.send({
        from: getEmailFrom(),
        to: [getNotificationEmail()],
        replyTo: email,
        subject: `New order ${reference} — ${firstName} ${lastName}`,
        html: renderOrderEmail({
          reference,
          customer: { firstName, lastName, email, phone },
          shipping: {
            address,
            city,
            state,
            postalCode: asString(shipping.postalCode),
            notes: asString(shipping.notes).slice(0, 500),
          },
          items: items.map((item) => ({
            name: item.product.name,
            size: item.size,
            quantity: item.quantity,
            price: item.product.price,
          })),
          subtotal,
          shippingFee,
          total,
        }),
      });

      if (error) {
        console.error("[orders/verify] Order email failed", error);
      }
    } catch (error) {
      console.error("[orders/verify] Order email failed", error);
    }
  } else {
    console.warn("[orders/verify] RESEND_API_KEY is not set — order confirmation email skipped.");
  }

  return NextResponse.json({
    verified: true,
    reference,
    subtotal,
    shipping: shippingFee,
    total,
    demo: !process.env.PAYSTACK_SECRET_KEY,
  });
}
