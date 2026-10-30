import { Resend } from "resend";
import { formatPrice } from "@/lib/format";
import { siteConfig } from "@/lib/site";

/**
 * Escape a value before interpolating it into an HTML email body.
 * Every user-provided value must pass through this helper.
 */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function getEmailFrom(): string {
  return process.env.EMAIL_FROM ?? "Haven Streetwear <onboarding@resend.dev>";
}

export function getNotificationEmail(): string {
  return process.env.ORDER_NOTIFICATION_EMAIL ?? siteConfig.orderEmail;
}

/**
 * Returns a Resend client when the API key is configured, otherwise null so
 * local/demo environments can keep working without an email provider.
 */
export function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

type OrderEmailItem = {
  name: string;
  size: string;
  quantity: number;
  price: number;
};

type OrderEmailPayload = {
  reference: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  shipping: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
    notes: string;
  };
  items: OrderEmailItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
};

export function renderOrderEmail(order: OrderEmailPayload): string {
  const rows = order.items
    .map(
      (item) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #eee9e1;color:#131313;">
            ${escapeHtml(item.name)}<br />
            <span style="font-size:12px;color:#6b665d;">Size ${escapeHtml(item.size)} · Qty ${item.quantity}</span>
          </td>
          <td style="padding:10px 0;border-bottom:1px solid #eee9e1;text-align:right;color:#131313;">
            ${escapeHtml(formatPrice(item.price * item.quantity))}
          </td>
        </tr>`,
    )
    .join("");

  const address = [
    order.shipping.address,
    order.shipping.city,
    order.shipping.state,
    order.shipping.postalCode,
    "Nigeria",
  ]
    .filter(Boolean)
    .join(", ");

  return `
  <!doctype html>
  <html lang="en">
    <body style="margin:0;background:#f6f4ef;font-family:Arial,Helvetica,sans-serif;color:#131313;">
      <div style="max-width:620px;margin:0 auto;padding:32px 16px;">
        <div style="background:#131313;color:#fff;padding:24px 28px;border-radius:18px 18px 0 0;">
          <p style="margin:0;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#a8a39a;">Haven Streetwear</p>
          <h1 style="margin:8px 0 0;font-size:26px;letter-spacing:-1px;">New order confirmed</h1>
          <p style="margin:6px 0 0;font-size:13px;color:#d6d2ca;">Reference ${escapeHtml(order.reference)}</p>
        </div>

        <div style="background:#fff;padding:28px;border:1px solid #e0dbd2;border-top:0;border-radius:0 0 18px 18px;">
          <h2 style="margin:0 0 6px;font-size:16px;">Customer</h2>
          <p style="margin:0;font-size:13px;line-height:1.7;color:#4a463f;">
            ${escapeHtml(order.customer.firstName)} ${escapeHtml(order.customer.lastName)}<br />
            ${escapeHtml(order.customer.email)}<br />
            ${escapeHtml(order.customer.phone)}
          </p>

          <h2 style="margin:24px 0 6px;font-size:16px;">Delivery</h2>
          <p style="margin:0;font-size:13px;line-height:1.7;color:#4a463f;">${escapeHtml(address)}</p>
          ${
            order.shipping.notes
              ? `<p style="margin:6px 0 0;font-size:12px;color:#6b665d;"><strong>Notes:</strong> ${escapeHtml(order.shipping.notes)}</p>`
              : ""
          }

          <h2 style="margin:24px 0 6px;font-size:16px;">Items</h2>
          <table style="width:100%;border-collapse:collapse;font-size:13px;">
            <tbody>${rows}</tbody>
          </table>

          <table style="width:100%;border-collapse:collapse;margin-top:18px;font-size:13px;">
            <tr>
              <td style="padding:4px 0;color:#6b665d;">Subtotal</td>
              <td style="padding:4px 0;text-align:right;">${escapeHtml(formatPrice(order.subtotal))}</td>
            </tr>
            <tr>
              <td style="padding:4px 0;color:#6b665d;">Delivery</td>
              <td style="padding:4px 0;text-align:right;">${
                order.shippingFee === 0 ? "Free" : escapeHtml(formatPrice(order.shippingFee))
              }</td>
            </tr>
            <tr>
              <td style="padding:12px 0 0;border-top:1px solid #e0dbd2;font-weight:bold;">Total paid</td>
              <td style="padding:12px 0 0;border-top:1px solid #e0dbd2;text-align:right;font-weight:bold;">
                ${escapeHtml(formatPrice(order.total))}
              </td>
            </tr>
          </table>

          <p style="margin:24px 0 0;font-size:12px;line-height:1.7;color:#6b665d;">
            Reply to this email or contact ${escapeHtml(siteConfig.email)} if anything looks wrong.
            We usually respond within one working day.
          </p>
        </div>
      </div>
    </body>
  </html>`;
}
