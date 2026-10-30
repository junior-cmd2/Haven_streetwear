import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Home, Search } from "lucide-react";
import { ProductGrid } from "@/components/product/product-grid";
import { ButtonLink } from "@/components/ui/button";
import { featuredProducts } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="container-page py-14 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
          Error 404
        </p>
        <h1 className="mt-4 text-6xl font-black tracking-[-0.07em] sm:text-8xl">
          Lost the thread<span className="text-accent">.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
          The page you&apos;re looking for has moved, sold out, or never existed. Let&apos;s get you
          back to something good.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/shop" size="lg">
            Shop the collection
            <ArrowRight className="size-4" />
          </ButtonLink>
          <Link
            href="/"
            className="inline-flex h-13 items-center gap-2 rounded-full border border-foreground/25 px-8 text-xs font-semibold uppercase tracking-[0.16em] transition hover:bg-foreground hover:text-background"
          >
            <Home className="size-4" />
            Back home
          </Link>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 text-xs text-muted-foreground sm:flex-row">
          <span className="flex items-center gap-2">
            <Search className="size-3.5" />
            Looking for something specific?
          </span>
          <Link href="/shop" className="font-semibold text-foreground underline underline-offset-2">
            Browse all pieces
          </Link>
        </div>
      </div>

      <div className="mt-14 border-t border-border pt-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              While you&apos;re here
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] sm:text-3xl">
              Popular right now.
            </h2>
          </div>
          <Link
            href="/shop"
            className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground transition hover:text-foreground"
          >
            View all
          </Link>
        </div>
        <ProductGrid products={featuredProducts.slice(0, 4)} className="mt-8" />
      </div>
    </div>
  );
}
