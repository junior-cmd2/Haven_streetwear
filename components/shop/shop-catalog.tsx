"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { ProductGrid } from "@/components/product/product-grid";
import {
  categories,
  categoryInfo,
  type Category,
  type Product,
} from "@/lib/data/products";
import { cn } from "@/lib/utils";

type SortOption = "featured" | "price-asc" | "price-desc" | "name";

const sortLabels: Record<SortOption, string> = {
  featured: "Featured",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  name: "Name: A–Z",
};

export function ShopCatalog({
  products,
  initialCategory = "all",
  showCategoryFilter = true,
}: {
  products: Product[];
  initialCategory?: Category | "all";
  showCategoryFilter?: boolean;
}) {
  const [category, setCategory] = useState<Category | "all">(initialCategory);
  const [sort, setSort] = useState<SortOption>("featured");

  const visible = useMemo(() => {
    const filtered =
      category === "all" ? products : products.filter((product) => product.category === category);

    return [...filtered].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "name") return a.name.localeCompare(b.name);
      return 0;
    });
  }, [category, products, sort]);

  return (
    <div>
      <div className="flex flex-col gap-4 border-y border-border py-4 sm:flex-row sm:items-center sm:justify-between">
        {showCategoryFilter ? (
          <div className="hide-scrollbar flex gap-2 overflow-x-auto">
            <button
              type="button"
              onClick={() => setCategory("all")}
              aria-pressed={category === "all"}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] transition",
                category === "all"
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-white text-muted-foreground hover:border-foreground/40 hover:text-foreground",
              )}
            >
              All
            </button>
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] transition",
                  category === item
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-white text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                )}
              >
                {categoryInfo[item].label}
              </button>
            ))}
          </div>
        ) : (
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            {visible.length} pieces
          </p>
        )}

        <div className="flex shrink-0 items-center gap-2">
          <SlidersHorizontal className="size-4 text-muted-foreground" />
          <label htmlFor="shop-sort" className="sr-only">
            Sort products
          </label>
          <select
            id="shop-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortOption)}
            className="h-9 rounded-full border border-border bg-white px-4 pr-8 text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground focus:border-foreground focus:outline-none"
          >
            {Object.entries(sortLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted-foreground" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "piece" : "pieces"}
        {showCategoryFilter && category !== "all" ? ` in ${categoryInfo[category].label}` : ""}
      </p>

      {visible.length > 0 ? (
        <ProductGrid products={visible} className="mt-8" eagerCount={4} />
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-border p-16 text-center">
          <p className="text-sm font-semibold">Nothing here yet.</p>
          <p className="mt-1 text-sm text-muted-foreground">Try another category or check back soon.</p>
        </div>
      )}
    </div>
  );
}
