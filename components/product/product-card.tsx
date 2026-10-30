import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categoryInfo, productHref, type Product } from "@/lib/data/products";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  eager = false,
  className,
}: {
  product: Product;
  eager?: boolean;
  className?: string;
}) {
  const hoverImage = product.images[1] ?? product.image;

  return (
    <article className={cn("group relative flex flex-col", className)}>
      <Link
        href={productHref(product)}
        className="relative block aspect-[4/5] overflow-hidden rounded-2xl bg-secondary"
        aria-label={`View ${product.name}`}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
        />
        {hoverImage !== product.image ? (
          <Image
            src={hoverImage}
            alt=""
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover opacity-0 transition duration-500 group-hover:opacity-100"
          />
        ) : null}

        {product.badge ? (
          <span className="absolute left-3 top-3 rounded-full bg-foreground px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-background">
            {product.badge}
          </span>
        ) : null}

        <span className="absolute inset-x-3 bottom-3 flex translate-y-2 items-center justify-center gap-2 rounded-full bg-white/95 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground opacity-0 shadow-lg backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          View product
          <ArrowUpRight className="size-3.5" />
        </span>
      </Link>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {categoryInfo[product.category].label}
          </p>
          <h3 className="mt-1 truncate text-sm font-semibold tracking-tight text-foreground sm:text-[15px]">
            <Link href={productHref(product)} className="link-underline">
              {product.name}
            </Link>
          </h3>
        </div>
        <p className="shrink-0 text-sm font-semibold text-foreground">{formatPrice(product.price)}</p>
      </div>
    </article>
  );
}
