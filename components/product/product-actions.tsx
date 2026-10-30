"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { ArrowRight, ShieldCheck, Truck } from "lucide-react";
import type { Product } from "@/lib/data/products";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { QuantityStepper } from "./quantity-stepper";

export function ProductActions({ product }: { product: Product }) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const [size, setSize] = useState(product.sizes[0] ?? "One size");
  const [quantity, setQuantity] = useState(1);

  function addAndGo(goToCheckout: boolean) {
    addItem(product, size, quantity);
    toast.success(`${product.name} added to your bag`);

    if (goToCheckout) {
      router.push("/checkout");
    }
  }

  return (
    <div className="mt-7 space-y-7">
      <div>
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Select size
          </p>
          <p className="text-[10px] text-muted-foreground">Fits true to size</p>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {product.sizes.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setSize(option)}
              aria-pressed={size === option}
              className={cn(
                "min-w-12 rounded-full border px-4 py-2.5 text-xs font-semibold transition",
                size === option
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-white text-foreground hover:border-foreground/40",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <QuantityStepper value={quantity} onChange={setQuantity} />
        <p className="text-sm font-semibold text-foreground">{formatPrice(product.price)}</p>
      </div>

      <div className="flex flex-col gap-3">
        <Button size="lg" onClick={() => addAndGo(false)} className="w-full">
          Add to bag
          <ArrowRight className="size-4" />
        </Button>
        <Button size="lg" variant="outline" onClick={() => addAndGo(true)} className="w-full">
          Buy it now
        </Button>
      </div>

      <div className="grid gap-3 border-t border-border pt-5 text-xs text-muted-foreground sm:grid-cols-2">
        <p className="flex items-center gap-2">
          <Truck className="size-4 text-foreground" />
          Delivery in 1–5 working days
        </p>
        <p className="flex items-center gap-2">
          <ShieldCheck className="size-4 text-foreground" />
          Secure Paystack checkout
        </p>
      </div>
    </div>
  );
}
