# Haven Streetwear

A production-minded storefront for **Haven Streetwear**, a Nigerian streetwear label.
Built with Next.js 16 (App Router), React 19, Tailwind CSS v4, Zustand and Paystack.

## Features

- **Single typed catalog** — 54 products across four categories in `lib/data/products.ts`,
  with numeric NGN prices, multiple images, sizes and badges.
- **Storefront** — editorial home page, category browsing, sorting, search, product detail
  pages with galleries, related products and structured data.
- **Cart & checkout** — size-aware cart persisted with Zustand, free-delivery progress,
  validated checkout form, Paystack popup payment and server-side verification.
- **Order handling** — `POST /api/orders/verify` recomputes every line item from the catalog
  (never trusts client prices), verifies the Paystack transaction and emails the order via Resend.
- **Contact & newsletter** — validated API routes, HTML-escaped emails and graceful demo mode
  when email is not configured.
- **SEO** — metadata, Open Graph, product JSON-LD, sitemap and robots.

## Getting started

```bash
npm install
cp .env.example .env.local   # Windows: copy .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical site URL used in metadata and the sitemap. |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | Yes (checkout) | Opens the Paystack payment popup. |
| `PAYSTACK_SECRET_KEY` | Yes (production) | Verifies transactions server-side. |
| `PAYSTACK_ALLOW_DEMO` | Optional | Set `true` to allow unverified demo checkout in production. |
| `RESEND_API_KEY` | Recommended | Sends order, contact and newsletter emails. |
| `EMAIL_FROM` | Optional | Verified sender, e.g. `Haven <orders@yourdomain.com>`. |
| `ORDER_NOTIFICATION_EMAIL` | Optional | Where order and contact notifications are sent. |

> **Demo mode:** without `PAYSTACK_SECRET_KEY`, checkout completes without server-side
> verification in development. In production the verification route refuses unverified orders
> unless `PAYSTACK_ALLOW_DEMO=true`. Always configure the secret key for a live store.
> Without `RESEND_API_KEY`, emails are logged and the UI still succeeds.

## Scripts

```bash
npm run dev        # start the dev server
npm run build      # production build
npm run start      # serve the production build
npm run lint       # ESLint
npm run typecheck  # TypeScript, no emit
```

## Project structure

```
app/
  api/
    newsletter/route.ts     # newsletter signups
    orders/verify/route.ts  # PAYMENT VERIFICATION + order email (source of truth for totals)
    send/route.ts           # contact form
  cart/ checkout/ contact/ gallery/ policies/ shop/ products/
  layout.tsx  page.tsx  sitemap.ts  robots.ts
components/
  contact/ layout/ product/ shop/ ui/
lib/
  data/products.ts          # catalog (single source of truth)
  checkout.ts               # shipping constants and totals
  email.ts                  # Resend client + escaped HTML templates
  format.ts  site.ts  utils.ts
store/cartStore.ts          # persisted, size-aware cart
```

## Notes

- Prices are integers in NGN; format them with `formatPrice()` from `lib/format.ts`.
- Shipping is a flat `₦5,000`, free on orders over `₦200,000` (`lib/checkout.ts`).
- The catalog is the only place product data should live. Cart, checkout and verification all
  resolve products from it.
