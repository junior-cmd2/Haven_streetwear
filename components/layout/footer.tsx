import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { footerLinks, siteConfig } from "@/lib/site";
import { NewsletterForm } from "./newsletter-form";

export default function Footer() {
  return (
    <footer className="mt-20 bg-neutral-950 text-white sm:mt-28">
      <div className="container-page">
        <div className="grid gap-12 py-14 sm:py-16 lg:grid-cols-[1.4fr_0.7fr_0.7fr_1.3fr] lg:gap-10">
          <div>
            <Link href="/" className="inline-flex items-baseline gap-1" aria-label="Haven Streetwear home">
              <span className="text-2xl font-black tracking-[-0.08em]">HAVEN</span>
              <span className="text-[8px] font-semibold uppercase tracking-[0.22em] text-white/40">
                Streetwear
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
              Considered streetwear out of Lagos. Heavyweight essentials, limited runs and pieces made to
              outlive the season.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
              {siteConfig.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-white"
                >
                  {social.label} ↗
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-white/35">Shop</p>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-white/35">Help</p>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              {footerLinks.help.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-white/35">
              Join the list
            </p>
            <p className="mt-3 text-xl font-bold tracking-tight">Early access to every drop.</p>
            <div className="mt-5">
              <NewsletterForm />
            </div>

            <div className="mt-6 space-y-2 text-xs text-white/50">
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 transition hover:text-white">
                <Mail className="size-3.5" />
                {siteConfig.email}
              </a>
              <p className="flex items-center gap-2">
                <MapPin className="size-3.5" />
                {siteConfig.location}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-[10px] uppercase tracking-[0.14em] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Haven Streetwear. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-2">
            <span>Secure checkout</span>
            <span className="text-white/60">Paystack</span>
            <span className="text-white/20">/</span>
            <span>Visa</span>
            <span>Mastercard</span>
            <span>Verve</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
