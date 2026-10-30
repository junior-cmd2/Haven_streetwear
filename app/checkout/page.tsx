"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  CreditCard,
  Loader2,
  Lock,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button";
import { inputClass, labelClass, FieldError } from "@/components/ui/form";
import { getOrderTotal, getShippingFee } from "@/lib/checkout";
import type { CartItem } from "@/store/cartStore";
import {
  getCartItemPrice,
  selectCartCount,
  selectSubtotal,
  useCartStore,
} from "@/store/cartStore";
import { formatPrice } from "@/lib/format";
import { nigerianStates, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useHasMounted } from "@/lib/use-has-mounted";

type FormState = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  notes: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

type CompletedOrder = {
  reference: string;
  total: number;
  email: string;
  count: number;
};

const initialForm: FormState = {
  email: "",
  firstName: "",
  lastName: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  notes: "",
};

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!form.firstName.trim()) errors.firstName = "First name is required.";
  if (!form.lastName.trim()) errors.lastName = "Last name is required.";
  if (!/^[0-9+\s()-]{7,20}$/.test(form.phone.trim())) {
    errors.phone = "Enter a valid phone number.";
  }
  if (form.address.trim().length < 5) errors.address = "Enter your street address.";
  if (!form.city.trim()) errors.city = "City is required.";
  if (!form.state.trim()) errors.state = "Select your state.";
  return errors;
}

export default function CheckoutPage() {
  const mounted = useHasMounted();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const cartCount = useCartStore(selectCartCount);
  const subtotal = useCartStore(selectSubtotal);

  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "paying" | "verifying">("idle");
  const [order, setOrder] = useState<CompletedOrder | null>(null);

  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
  const shipping = getShippingFee(subtotal);
  const total = getOrderTotal(subtotal);

  const orderItems = useMemo(
    () =>
      items.map((item: CartItem) => ({
        category: item.category,
        id: item.id,
        size: item.size,
        quantity: item.quantity,
      })),
    [items],
  );

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  async function verifyPayment(reference: string) {
    setStatus("verifying");

    try {
      const response = await fetch("/api/orders/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference,
          items: orderItems,
          customer: {
            email: form.email.trim(),
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            phone: form.phone.trim(),
          },
          shipping: {
            address: form.address.trim(),
            city: form.city.trim(),
            state: form.state,
            postalCode: form.postalCode.trim(),
            country: "Nigeria",
            notes: form.notes.trim(),
          },
        }),
      });

      const data = (await response.json()) as {
        verified?: boolean;
        error?: string;
        total?: number;
      };

      if (!response.ok || !data.verified) {
        setStatus("idle");
        toast.error(data.error ?? "We could not verify this payment. Please contact support.");
        return;
      }

      setOrder({
        reference,
        total: data.total ?? total,
        email: form.email.trim(),
        count: cartCount,
      });
      clearCart();
      setStatus("idle");
      toast.success("Payment confirmed. Thank you!");
    } catch {
      setStatus("idle");
      toast.error("Payment succeeded, but verification failed. Please contact support with your reference.");
    }
  }

  async function onPlaceOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status !== "idle") return;

    const nextErrors = validate(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      toast.error("Please check the highlighted fields.");
      return;
    }

    if (!publicKey) {
      toast.error("Paystack is not configured. Add NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY to .env.local.");
      return;
    }

    setStatus("paying");

    try {
      // Loaded on demand so the Paystack browser bundle never runs during SSR/prerender.
      const { default: PaystackPop } = await import("@paystack/inline-js");
      const paystack = new PaystackPop();

      paystack.newTransaction({
        key: publicKey,
        email: form.email.trim(),
        amount: Math.round(total * 100),
        currency: "NGN",
        metadata: {
          custom_fields: [
            {
              display_name: "Customer name",
              variable_name: "customer_name",
              value: `${form.firstName} ${form.lastName}`.trim(),
            },
            {
              display_name: "Phone number",
              variable_name: "phone_number",
              value: form.phone,
            },
            {
              display_name: "Delivery address",
              variable_name: "delivery_address",
              value: `${form.address}, ${form.city}, ${form.state}`,
            },
          ],
        },
        onSuccess: (transaction) => {
          void verifyPayment(transaction.reference);
        },
        onCancel: () => {
          setStatus("idle");
          toast.info("Payment cancelled.");
        },
        onError: (error) => {
          setStatus("idle");
          console.error(error);
          toast.error("Something went wrong with the payment. Please try again.");
        },
      });
    } catch (error) {
      setStatus("idle");
      console.error(error);
      toast.error("We could not open the payment window. Please try again.");
    }
  }

  if (!mounted) {
    return (
      <div className="container-page py-12">
        <div className="h-10 w-56 animate-pulse rounded-full bg-secondary" />
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="h-[32rem] animate-pulse rounded-2xl bg-secondary" />
          <div className="h-96 animate-pulse rounded-2xl bg-secondary" />
        </div>
      </div>
    );
  }

  if (order) {
    return (
      <div className="container-page flex min-h-[70vh] flex-col items-center justify-center py-14 text-center">
        <div className="flex size-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="size-10" />
        </div>
        <p className="mt-6 font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
          Order confirmed
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
          Thank you for your order<span className="text-accent">.</span>
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          We&apos;ve sent a confirmation to <span className="font-semibold text-foreground">{order.email}</span>.
          Keep the reference below — our team will use it if you need help.
        </p>

        <div className="mt-8 w-full max-w-md rounded-2xl border border-border bg-white p-6 text-left">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Reference</span>
            <span className="font-mono text-xs font-semibold">{order.reference}</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Items</span>
            <span className="font-semibold">{order.count}</span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
            <span className="font-semibold">Total paid</span>
            <span className="font-black">{formatPrice(order.total)}</span>
          </div>
        </div>

        <div className="mt-8 grid w-full max-w-2xl gap-3 text-left sm:grid-cols-3">
          {[
            { title: "Confirmed", copy: "Your payment is verified and your order is in." },
            { title: "Packed", copy: "We pick and check your pieces within 24 hours." },
            { title: "Delivered", copy: "Nationwide delivery in 1–5 working days." },
          ].map((step, index) => (
            <div key={step.title} className="rounded-2xl border border-border bg-white p-4">
              <span className="flex size-7 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background">
                {index + 1}
              </span>
              <p className="mt-3 text-sm font-semibold">{step.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{step.copy}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/shop" size="lg">
            Continue shopping
            <ArrowRight className="size-4" />
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline" size="lg">
            Contact support
          </ButtonLink>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
        <h1 className="text-3xl font-black tracking-[-0.04em]">Nothing to check out.</h1>
        <p className="mt-3 max-w-sm text-sm text-muted-foreground">
          Your bag is empty. Add a piece or two and come back.
        </p>
        <ButtonLink href="/shop" size="lg" className="mt-7">
          Shop the collection
          <ArrowRight className="size-4" />
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
            Secure checkout
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
            Complete your order<span className="text-accent">.</span>
          </h1>
        </div>
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Back to bag
        </Link>
      </div>

      <form onSubmit={onPlaceOrder} className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10" noValidate>
        <div className="space-y-8">
          <section className="rounded-2xl border border-border bg-white p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
                1
              </span>
              <div>
                <h2 className="text-lg font-black tracking-tight">Contact</h2>
                <p className="text-xs text-muted-foreground">We&apos;ll send your receipt here.</p>
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="email" className={labelClass}>
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                className={cn(inputClass, errors.email && "border-red-500 focus:border-red-500")}
                placeholder="you@example.com"
                aria-invalid={Boolean(errors.email)}
              />
              <FieldError message={errors.email} />
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-white p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
                2
              </span>
              <div>
                <h2 className="text-lg font-black tracking-tight">Delivery</h2>
                <p className="text-xs text-muted-foreground">Nationwide delivery across Nigeria.</p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className={labelClass}>
                  First name
                </label>
                <input
                  id="firstName"
                  autoComplete="given-name"
                  value={form.firstName}
                  onChange={(event) => updateField("firstName", event.target.value)}
                  className={cn(inputClass, errors.firstName && "border-red-500")}
                  aria-invalid={Boolean(errors.firstName)}
                />
                <FieldError message={errors.firstName} />
              </div>
              <div>
                <label htmlFor="lastName" className={labelClass}>
                  Last name
                </label>
                <input
                  id="lastName"
                  autoComplete="family-name"
                  value={form.lastName}
                  onChange={(event) => updateField("lastName", event.target.value)}
                  className={cn(inputClass, errors.lastName && "border-red-500")}
                  aria-invalid={Boolean(errors.lastName)}
                />
                <FieldError message={errors.lastName} />
              </div>

              <div>
                <label htmlFor="phone" className={labelClass}>
                  Phone number
                </label>
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  className={cn(inputClass, errors.phone && "border-red-500")}
                  placeholder="+234 800 000 0000"
                  aria-invalid={Boolean(errors.phone)}
                />
                <FieldError message={errors.phone} />
              </div>
              <div>
                <label htmlFor="postalCode" className={labelClass}>
                  Postal code <span className="normal-case tracking-normal">(optional)</span>
                </label>
                <input
                  id="postalCode"
                  autoComplete="postal-code"
                  value={form.postalCode}
                  onChange={(event) => updateField("postalCode", event.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="address" className={labelClass}>
                  Street address
                </label>
                <input
                  id="address"
                  autoComplete="street-address"
                  value={form.address}
                  onChange={(event) => updateField("address", event.target.value)}
                  className={cn(inputClass, errors.address && "border-red-500")}
                  placeholder="House number, street, area"
                  aria-invalid={Boolean(errors.address)}
                />
                <FieldError message={errors.address} />
              </div>

              <div>
                <label htmlFor="city" className={labelClass}>
                  City
                </label>
                <input
                  id="city"
                  autoComplete="address-level2"
                  value={form.city}
                  onChange={(event) => updateField("city", event.target.value)}
                  className={cn(inputClass, errors.city && "border-red-500")}
                  aria-invalid={Boolean(errors.city)}
                />
                <FieldError message={errors.city} />
              </div>
              <div>
                <label htmlFor="state" className={labelClass}>
                  State
                </label>
                <select
                  id="state"
                  autoComplete="address-level1"
                  value={form.state}
                  onChange={(event) => updateField("state", event.target.value)}
                  className={cn(inputClass, "appearance-none", errors.state && "border-red-500")}
                  aria-invalid={Boolean(errors.state)}
                >
                  <option value="">Select state</option>
                  {nigerianStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                <FieldError message={errors.state} />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="notes" className={labelClass}>
                  Delivery notes <span className="normal-case tracking-normal">(optional)</span>
                </label>
                <input
                  id="notes"
                  value={form.notes}
                  onChange={(event) => updateField("notes", event.target.value)}
                  className={inputClass}
                  placeholder="Landmark, gate code or preferred delivery time"
                />
              </div>
            </div>

            <div className="mt-5 flex items-start gap-3 rounded-xl bg-secondary/60 p-4">
              <Truck className="mt-0.5 size-4 shrink-0" />
              <div className="text-xs">
                <p className="font-semibold">Standard nationwide delivery</p>
                <p className="mt-0.5 text-muted-foreground">
                  {shipping === 0 ? "Free" : formatPrice(shipping)} · 1–5 working days
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-white p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
                3
              </span>
              <div>
                <h2 className="text-lg font-black tracking-tight">Payment</h2>
                <p className="text-xs text-muted-foreground">Secured by Paystack. Cards and bank transfer.</p>
              </div>
            </div>

            <div className="mt-5 rounded-xl border-2 border-foreground/80 bg-secondary/30 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <CreditCard className="size-5" />
                  <div>
                    <p className="text-sm font-semibold">Paystack</p>
                    <p className="text-[11px] text-muted-foreground">Visa · Mastercard · Verve · Bank transfer</p>
                  </div>
                </div>
                <span className="flex size-5 items-center justify-center rounded-full border border-foreground bg-foreground text-background">
                  <Check className="size-3" />
                </span>
              </div>
            </div>

            {!publicKey ? (
              <p className="mt-4 rounded-xl bg-amber-50 p-3 text-xs text-amber-800">
                Payment is not configured. Add <code>NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY</code> to your
                environment to accept orders.
              </p>
            ) : null}

            <Button type="submit" size="lg" className="mt-6 w-full" disabled={status !== "idle"}>
              {status === "paying" ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Opening Paystack…
                </>
              ) : status === "verifying" ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Verifying payment…
                </>
              ) : (
                <>
                  <Lock className="size-4" />
                  Pay {formatPrice(total)}
                </>
              )}
            </Button>

            <p className="mt-3 text-center text-[10px] leading-relaxed text-muted-foreground">
              By placing this order you agree to our{" "}
              <Link href="/policies#terms" className="underline underline-offset-2 hover:text-foreground">
                terms
              </Link>{" "}
              and{" "}
              <Link href="/policies#returns" className="underline underline-offset-2 hover:text-foreground">
                returns policy
              </Link>
              .
            </p>
          </section>
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-white p-5 sm:p-6 lg:sticky lg:top-28">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black tracking-tight">Your order</h2>
            <Link href="/cart" className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground">
              Edit bag
            </Link>
          </div>

          <ul className="mt-5 max-h-80 space-y-4 overflow-y-auto pr-1">
            {items.map((item) => (
              <li key={item.key} className="flex gap-3">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-[#eeebe5]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="64px"
                    className="object-contain p-1.5"
                  />
                  <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-foreground text-[9px] font-bold text-background">
                    {item.quantity}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{item.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">Size: {item.size}</p>
                  <p className="mt-1 text-xs font-semibold">{formatPrice(getCartItemPrice(item) * item.quantity)}</p>
                </div>
              </li>
            ))}
          </ul>

          <dl className="mt-5 space-y-3 border-t border-border pt-5 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Subtotal ({cartCount})</dt>
              <dd className="font-semibold">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Delivery</dt>
              <dd className="font-semibold">
                {shipping === 0 ? <span className="text-emerald-700">Free</span> : formatPrice(shipping)}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-3 text-base">
              <dt className="font-semibold">Total</dt>
              <dd className="font-black">{formatPrice(total)}</dd>
            </div>
          </dl>

          <div className="mt-5 space-y-2 rounded-xl bg-secondary/60 p-4 text-[11px] text-muted-foreground">
            <p className="flex items-center gap-2">
              <ShieldCheck className="size-3.5 text-foreground" />
              Secured by Paystack
            </p>
            <p className="flex items-center gap-2">
              <Truck className="size-3.5 text-foreground" />
              Delivery in 1–5 working days
            </p>
            <p className="flex items-center gap-2">
              <Check className="size-3.5 text-foreground" />
              7-day returns on unworn items
            </p>
          </div>

          <p className="mt-4 text-center text-[10px] text-muted-foreground">
            Need help?{" "}
            <a href={`mailto:${siteConfig.email}`} className="underline underline-offset-2 hover:text-foreground">
              {siteConfig.email}
            </a>
          </p>
        </aside>
      </form>
    </div>
  );
}
