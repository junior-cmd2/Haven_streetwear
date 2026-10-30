import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "@/lib/checkout";
import { formatPrice } from "@/lib/format";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shipping, returns & policies",
  description:
    "Haven Streetwear shipping and delivery times, returns and exchanges, sizing guidance, privacy and terms of service.",
  alternates: { canonical: "/policies" },
};

const navItems = [
  { id: "shipping", label: "Shipping & delivery" },
  { id: "returns", label: "Returns & exchanges" },
  { id: "sizing", label: "Sizing guide" },
  { id: "privacy", label: "Privacy policy" },
  { id: "terms", label: "Terms of service" },
];

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-b border-border py-10 first:pt-0 last:border-0 sm:py-12">
      <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] sm:text-3xl">{title}</h2>
      <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-2 [&_strong]:text-foreground">
        {children}
      </div>
    </section>
  );
}

export default function PoliciesPage() {
  return (
    <>
      <section className="border-b border-border bg-white">
        <div className="container-page py-12 sm:py-16">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
            The fine print
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-[-0.05em] sm:text-5xl lg:text-6xl">
            Policies, plainly<span className="text-accent">.</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Everything you need to know about delivery, returns, sizing and how we handle your
            information. Last updated October 2026.
          </p>
        </div>
      </section>

      <div className="container-page py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-16">
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              On this page
            </p>
            <nav className="mt-3 flex flex-wrap gap-x-4 gap-y-2 lg:flex-col lg:gap-3" aria-label="Policy sections">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-sm text-muted-foreground transition hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-8 rounded-2xl border border-border bg-white p-5">
              <Mail className="size-5" />
              <p className="mt-3 text-sm font-semibold">Need a hand?</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Email us and we&apos;ll respond within one working day.
              </p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-3 inline-flex text-xs font-semibold underline underline-offset-2"
              >
                {siteConfig.email}
              </a>
            </div>
          </aside>

          <div className="max-w-3xl">
            <Section id="shipping" eyebrow="01" title="Shipping & delivery">
              <p>
                We deliver to every state in Nigeria. Orders placed before 2pm WAT on a working day
                are packed the same day; orders placed after 2pm, on weekends or on public holidays
                are packed the next working day.
              </p>
              <div className="overflow-x-auto rounded-2xl border border-border bg-white">
                <table className="w-full min-w-[28rem] text-sm">
                  <thead className="bg-secondary/60 text-left text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Destination</th>
                      <th className="px-4 py-3 font-semibold">Time</th>
                      <th className="px-4 py-3 text-right font-semibold">Fee</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="px-4 py-3 text-foreground">Lagos</td>
                      <td className="px-4 py-3">1–2 working days</td>
                      <td className="px-4 py-3 text-right">{formatPrice(SHIPPING_FEE)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-foreground">Rest of Nigeria</td>
                      <td className="px-4 py-3">2–5 working days</td>
                      <td className="px-4 py-3 text-right">{formatPrice(SHIPPING_FEE)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-foreground">Orders over {formatPrice(FREE_SHIPPING_THRESHOLD)}</td>
                      <td className="px-4 py-3">2–5 working days</td>
                      <td className="px-4 py-3 text-right font-semibold text-emerald-700">Free</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                Delivery is flat-rate nationwide. You&apos;ll receive a confirmation email as soon as
                your payment is verified, and your order is dispatched with a tracking reference
                where available.
              </p>
              <p>
                We currently ship within Nigeria only. For delivery to multiple addresses, please
                place separate orders.
              </p>
            </Section>

            <Section id="returns" eyebrow="02" title="Returns & exchanges">
              <p>
                If something isn&apos;t right, you have <strong>7 days</strong> from delivery to request
                a return or exchange. Items must be unworn, unwashed and in their original condition
                with tags attached.
              </p>
              <p>
                To start a return, email{" "}
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> with your order
                reference and the reason for the return. We&apos;ll send instructions within one
                working day.
              </p>
              <p>
                <strong>What we can&apos;t accept:</strong> worn or washed items, caps with broken
                straps, footwear with visible outdoor wear, and items marked final sale. For hygiene
                reasons, we cannot accept returns on earrings or other pierced jewellery.
              </p>
              <p>
                <strong>Faulty items:</strong> if a piece arrives damaged or incorrect, contact us
                within 48 hours with photos and we&apos;ll cover return shipping and make it right.
                For change-of-mind returns, return shipping is paid by the customer.
              </p>
              <p>
                Approved refunds are processed to the original payment method within 5–10 working
                days after we receive and inspect the item.
              </p>
            </Section>

            <Section id="sizing" eyebrow="03" title="Sizing guide">
              <p>
                Fit matters. Our tees are cut relaxed and oversized — if you prefer a closer fit,
                size down. Pants are measured in inches at the waist. Shoes are listed in EU sizes
                and fit true to size.
              </p>
              <div className="overflow-hidden rounded-2xl border border-border bg-white">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/60 text-left text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Haven size</th>
                      <th className="px-4 py-3 font-semibold">Chest (in)</th>
                      <th className="px-4 py-3 font-semibold">Length (in)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      ["S", "38–40", "27"],
                      ["M", "40–42", "28"],
                      ["L", "42–44", "29"],
                      ["XL", "44–46", "30"],
                      ["XXL", "46–48", "31"],
                    ].map(([size, chest, length]) => (
                      <tr key={size}>
                        <td className="px-4 py-3 font-semibold text-foreground">{size}</td>
                        <td className="px-4 py-3">{chest}</td>
                        <td className="px-4 py-3">{length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                Still unsure? Email us the piece and your usual size in another brand — we&apos;ll
                recommend the best fit.
              </p>
            </Section>

            <Section id="privacy" eyebrow="04" title="Privacy policy">
              <p>
                We collect only the information needed to process your order and improve your
                experience: your name, email address, phone number, delivery address and order
                history. Payment card details are handled entirely by Paystack — we never see or
                store them.
              </p>
              <p>
                Your information is used to fulfil orders, send order updates, respond to enquiries
                and — only if you opt in — share news about drops and restocks. We do not sell or
                rent your personal data.
              </p>
              <p>
                We use trusted service providers including Paystack for payments and Resend for
                transactional email. These providers process data only on our instructions.
              </p>
              <p>
                You can request access to, correction of, or deletion of your personal data at any
                time by emailing <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
                We&apos;ll respond within 30 days.
              </p>
            </Section>

            <Section id="terms" eyebrow="05" title="Terms of service">
              <p>
                By placing an order with Haven Streetwear you confirm that the information you
                provide is accurate and that you are authorised to use the payment method supplied.
              </p>
              <p>
                All prices are listed in Nigerian Naira (NGN) and include applicable taxes. We
                reserve the right to correct pricing errors and to cancel orders where an item is
                unavailable or a payment cannot be verified. If we cancel a paid order, you&apos;ll
                receive a full refund.
              </p>
              <p>
                Product colours may appear slightly different depending on your screen. We make
                every effort to represent pieces accurately.
              </p>
              <p>
                All content on this site — including product photography, copy and the Haven name
                and marks — is owned by Haven Streetwear and may not be reproduced without written
                permission.
              </p>
              <p>
                These terms are governed by the laws of the Federal Republic of Nigeria. Questions?
                Contact <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
              </p>
            </Section>

            <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-3xl bg-neutral-950 p-6 text-white sm:flex-row sm:items-center sm:p-8">
              <div>
                <p className="text-lg font-black tracking-tight">Still have a question?</p>
                <p className="mt-1 text-sm text-white/55">
                  Our team replies within one working day.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <ButtonLink
                  href="/contact"
                  size="md"
                  className="bg-white text-neutral-950 hover:bg-white/90"
                >
                  Contact us
                  <ArrowRight className="size-4" />
                </ButtonLink>
                <Link
                  href="/shop"
                  className="inline-flex h-11 items-center rounded-full border border-white/25 px-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white/10"
                >
                  Shop the collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
