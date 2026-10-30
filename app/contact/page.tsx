import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle, Package, Ruler, Truck } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Questions about sizing, orders, delivery or returns? Contact Haven Streetwear — we reply within one working day.",
  alternates: { canonical: "/contact" },
};

const helpTopics = [
  {
    icon: Package,
    title: "Order support",
    copy: "Tracking, changes or something missing from your order.",
  },
  {
    icon: Ruler,
    title: "Sizing & fit",
    copy: "Measurements, fit notes and help choosing your size.",
  },
  {
    icon: Truck,
    title: "Delivery",
    copy: "Nationwide timelines, fees and delivery to your area.",
  },
];

const faqs = [
  {
    question: "How long does delivery take?",
    answer:
      "Orders are packed within 24 hours and delivered in 1–5 working days nationwide. Lagos orders usually arrive within 1–2 working days.",
  },
  {
    question: "Can I change or cancel my order?",
    answer:
      "Yes — contact us within 2 hours of placing your order with your reference number. Once an order has been packed, we can't guarantee changes.",
  },
  {
    question: "How do I know which size to order?",
    answer:
      "Our tees are cut relaxed. If you prefer a closer fit, size down. Every product page lists the available sizes, and we're happy to send exact measurements on request.",
  },
  {
    question: "Do you ship outside Nigeria?",
    answer:
      "Not yet. We currently deliver within Nigeria only. Join the newsletter and we'll announce international shipping first.",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-border bg-white">
        <div className="container-page py-12 sm:py-16">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
            Customer care
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-[-0.05em] sm:text-5xl lg:text-6xl">
            Talk to us<span className="text-accent">.</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Real people, not a bot. Questions about sizing, an order, or the next drop — we read
            every message and reply within one working day.
          </p>
        </div>
      </section>

      <section className="container-page py-10 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <div className="space-y-8">
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <a
                href={`mailto:${siteConfig.email}`}
                className="group flex items-start gap-4 rounded-2xl border border-border bg-white p-5 transition hover:border-foreground/30"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary">
                  <Mail className="size-4" />
                </span>
                <span>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Email
                  </span>
                  <span className="mt-1 block text-sm font-semibold transition group-hover:text-accent">
                    {siteConfig.email}
                  </span>
                </span>
              </a>

              <div className="flex items-start gap-4 rounded-2xl border border-border bg-white p-5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary">
                  <MessageCircle className="size-4" />
                </span>
                <span>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    WhatsApp
                  </span>
                  <span className="mt-1 block text-sm font-semibold">{siteConfig.phone}</span>
                </span>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-border bg-white p-5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary">
                  <MapPin className="size-4" />
                </span>
                <span>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Studio
                  </span>
                  <span className="mt-1 block text-sm font-semibold">{siteConfig.location}</span>
                </span>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-border bg-white p-5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary">
                  <Clock className="size-4" />
                </span>
                <span>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Hours
                  </span>
                  <span className="mt-1 block text-sm font-semibold">Mon–Fri, 9am–6pm WAT</span>
                </span>
              </div>
            </div>

            <div className="rounded-2xl bg-neutral-950 p-6 text-white sm:p-7">
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-white/40">
                Before you write
              </p>
              <h2 className="mt-3 text-xl font-black tracking-[-0.03em]">
                Have your order reference ready.
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                If your question is about an existing order, include the reference from your
                confirmation email. It helps us find your order straight away.
              </p>
              <Link
                href="/policies"
                className="mt-5 inline-flex text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70 underline underline-offset-4 transition hover:text-white"
              >
                Read shipping & returns
              </Link>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <section className="border-y border-border bg-white">
        <div className="container-page py-12 sm:py-16">
          <div className="grid gap-4 sm:grid-cols-3">
            {helpTopics.map((topic) => (
              <div key={topic.title} className="rounded-2xl border border-border p-5">
                <topic.icon className="size-5" />
                <h2 className="mt-4 text-base font-bold tracking-tight">{topic.title}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{topic.copy}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[0.65fr_1.35fr]">
            <div>
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                Quick answers
              </p>
              <h2 className="mt-3 text-2xl font-black tracking-[-0.04em] sm:text-3xl">
                Common questions.
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Still stuck? Send us a message and we&apos;ll sort it out.
              </p>
            </div>

            <div className="divide-y divide-border border-y border-border">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span className="text-lg leading-none text-muted-foreground transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
