import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronDown, ChevronRight, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { ProductActions } from "@/components/product/product-actions";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductGrid } from "@/components/product/product-grid";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  categoryInfo,
  getProduct,
  getProductsByCategory,
  isCategory,
  productHref,
  products,
} from "@/lib/data/products";
import { formatPrice } from "@/lib/format";
import { siteConfig } from "@/lib/site";

type Params = { params: Promise<{ category: string; id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({
    category: product.category,
    id: String(product.id),
  }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category, id } = await params;
  if (!isCategory(category)) return { title: "Product not found" };

  const product = getProduct(category, Number(id));
  if (!product) return { title: "Product not found" };

  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: productHref(product) },
    openGraph: {
      type: "website",
      title: `${product.name} — Haven Streetwear`,
      description: product.description,
      images: [{ url: product.image, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} — Haven Streetwear`,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: Params) {
  const { category, id } = await params;
  if (!isCategory(category)) notFound();

  const product = getProduct(category, Number(id));
  if (!product) notFound();

  const info = categoryInfo[product.category];
  const related = getProductsByCategory(product.category)
    .filter((item) => item.id !== product.id)
    .slice(0, 4);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((image) => new URL(image, siteConfig.url).toString()),
    sku: `HAVEN-${product.category}-${product.id}`,
    brand: { "@type": "Brand", name: "Haven Streetwear" },
    offers: {
      "@type": "Offer",
      url: new URL(productHref(product), siteConfig.url).toString(),
      priceCurrency: "NGN",
      price: product.price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <div className="container-page py-6 sm:py-10">
        <nav className="flex flex-wrap items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
          <Link href="/" className="transition hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="size-3" />
          <Link href="/shop" className="transition hover:text-foreground">
            Shop
          </Link>
          <ChevronRight className="size-3" />
          <Link href={`/shop/${product.category}`} className="transition hover:text-foreground">
            {info.label}
          </Link>
          <ChevronRight className="size-3" />
          <span className="truncate text-foreground">{product.name}</span>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <ProductGallery key={`${product.category}-${product.id}`} product={product} />

          <div className="lg:sticky lg:top-28 lg:h-fit">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/shop/${product.category}`}
                className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground transition hover:text-foreground"
              >
                {info.label}
              </Link>
              {product.badge ? (
                <span className="rounded-full bg-secondary px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em]">
                  {product.badge}
                </span>
              ) : null}
            </div>

            <h1 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-4xl lg:text-5xl">
              {product.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <p className="text-xl font-semibold text-foreground">{formatPrice(product.price)}</p>
              <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <span className="inline-block size-1.5 rounded-full bg-emerald-500" />
                In stock
              </span>
            </div>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <ProductActions product={product} />

            <div className="mt-8 divide-y divide-border border-t border-border">
              <details className="group py-5" open>
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold [&::-webkit-details-marker]:hidden">
                  Details & care
                  <ChevronDown className="size-4 text-muted-foreground transition group-open:rotate-180" />
                </summary>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="mt-2 inline-block size-1 shrink-0 rounded-full bg-foreground" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </details>

              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold [&::-webkit-details-marker]:hidden">
                  Shipping & returns
                  <ChevronDown className="size-4 text-muted-foreground transition group-open:rotate-180" />
                </summary>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <p className="flex items-start gap-2">
                    <Truck className="mt-0.5 size-4 shrink-0 text-foreground" />
                    Nationwide delivery in 1–5 working days. Free delivery on orders over{" "}
                    {formatPrice(200_000)}.
                  </p>
                  <p className="flex items-start gap-2">
                    <RotateCcw className="mt-0.5 size-4 shrink-0 text-foreground" />
                    7-day returns on unworn items with original tags attached.
                  </p>
                  <p className="flex items-start gap-2">
                    <ShieldCheck className="mt-0.5 size-4 shrink-0 text-foreground" />
                    Secure payment via Paystack. Visa, Mastercard and Verve accepted.
                  </p>
                </div>
              </details>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-2xl bg-white p-4 text-xs text-muted-foreground">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-foreground text-[11px] font-black text-background">
                H
              </span>
              <p>
                Quality checked in Lagos. Questions?{" "}
                <Link href="/contact" className="font-semibold text-foreground underline underline-offset-2">
                  Talk to us
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="border-t border-border bg-white">
          <div className="container-page py-14 sm:py-20">
            <SectionHeading
              eyebrow="Complete the fit"
              title="You may also like."
              action={
                <Link
                  href={`/shop/${product.category}`}
                  className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground transition hover:text-foreground"
                >
                  View all {info.label}
                </Link>
              }
            />
            <ProductGrid products={related} className="mt-8" />
          </div>
        </section>
      ) : null}
    </>
  );
}
