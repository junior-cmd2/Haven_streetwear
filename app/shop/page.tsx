import type { Metadata } from "next";
import {
  allProducts,
  categories,
  categoryInfo,
} from "@/lib/data/products";
import { ShopCatalog } from "@/components/shop/shop-catalog";

export const metadata: Metadata = {
  title: "Shop the collection",
  description:
    "Shop Haven Streetwear — heavyweight tees, relaxed denim, caps and curated footwear. Nationwide delivery across Nigeria.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <>
      <section className="border-b border-border bg-white">
        <div className="container-page py-12 sm:py-16">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
            SS26 / Vol. 01
          </p>
          <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-4xl font-black tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                The collection<span className="text-accent">.</span>
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {allProducts.length} considered pieces across tees, pants, shoes and caps. Built for
                the rotation, made to outlive the season.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {categories.map((category) => (
                <span key={category} className="flex flex-col gap-1">
                  <span className="text-lg font-black tracking-tight text-foreground">
                    {categoryInfo[category].label}
                  </span>
                  <span>
                    {allProducts.filter((product) => product.category === category).length} pieces
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-8 sm:py-12">
        <ShopCatalog products={allProducts} />
      </section>
    </>
  );
}
