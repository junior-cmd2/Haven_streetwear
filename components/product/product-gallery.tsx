"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/data/products";
import { cn } from "@/lib/utils";

export function ProductGallery({ product }: { product: Product }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = product.images.length > 0 ? product.images : [product.image];
  const activeImage = images[activeIndex] ?? images[0];

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-[#eeebe5]">
        <Image
          src={activeImage}
          alt={`${product.name} — view ${activeIndex + 1}`}
          fill
          loading="eager"
          fetchPriority="high"
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-contain p-4 sm:p-8"
        />
        {product.badge ? (
          <span className="absolute left-4 top-4 rounded-full bg-foreground px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-background">
            {product.badge}
          </span>
        ) : null}
      </div>

      {images.length > 1 ? (
        <div className="flex gap-3" role="group" aria-label="Product images">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`View image ${index + 1} of ${product.name}`}
              aria-pressed={activeIndex === index}
              className={cn(
                "relative size-20 overflow-hidden rounded-xl border bg-[#eeebe5] transition sm:size-24",
                activeIndex === index
                  ? "border-foreground"
                  : "border-border opacity-65 hover:border-foreground/40 hover:opacity-100",
              )}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="96px"
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
