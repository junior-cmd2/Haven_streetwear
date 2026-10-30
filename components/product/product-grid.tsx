import type { Product } from "@/lib/data/products";
import { cn } from "@/lib/utils";
import { ProductCard } from "./product-card";

export function ProductGrid({
  products,
  className,
  eagerCount = 0,
}: {
  products: Product[];
  className?: string;
  eagerCount?: number;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4",
        className,
      )}
    >
      {products.map((product, index) => (
        <ProductCard
          key={`${product.category}-${product.id}`}
          product={product}
          eager={index < eagerCount}
        />
      ))}
    </div>
  );
}
