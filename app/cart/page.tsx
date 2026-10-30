"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Lock,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";
import { QuantityStepper } from "@/components/product/quantity-stepper";
import { ButtonLink } from "@/components/ui/button";
import { getOrderTotal, getShippingFee, FREE_SHIPPING_THRESHOLD } from "@/lib/checkout";
import { formatPrice } from "@/lib/format";
import { useHasMounted } from "@/lib/use-has-mounted";
import {
  getCartItemPrice,
  selectCartCount,
  selectSubtotal,
  useCartStore,
} from "@/store/cartStore";

export default function CartPage() {
  const mounted = useHasMounted();
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const cartCount = useCartStore(selectCartCount);
  const subtotal = useCartStore(selectSubtotal);

  if (!mounted) {
    return (
      <div className="container-page py-12 sm:py-16">
        <div className="h-10 w-48 animate-pulse rounded-full bg-secondary" />
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_0.8fr]">
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-32 animate-pulse rounded-2xl bg-secondary" />
            ))}
          </div>
          <div className="h-80 animate-pulse rounded-2xl bg-secondary" />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
        <div className="relative flex size-20 items-center justify-center rounded-full bg-white shadow-sm">
          <ShoppingBag className="size-8" />
          <span className="absolute -right-1 -top-1 flex size-7 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-white">
            0
          </span>
        </div>
        <h1 className="mt-6 text-3xl font-black tracking-[-0.04em] sm:text-4xl">Your bag is empty.</h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          Nothing in the bag yet. Start with the pieces everyone is reaching for.
        </p>
        <ButtonLink href="/shop" size="lg" className="mt-7">
          Shop the collection
          <ArrowRight className="size-4" />
        </ButtonLink>
      </div>
    );
  }

  const shipping = getShippingFee(subtotal);
  const total = getOrderTotal(subtotal);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="flex flex-col gap-5 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
            Shopping bag
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
            Your bag<span className="text-accent">.</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {cartCount} {cartCount === 1 ? "item" : "items"} ready for checkout.
          </p>
        </div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Continue shopping
        </Link>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_0.85fr] lg:gap-10">
        <div>
          <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-white">
            {items.map((item) => (
              <li key={item.key} className="p-4 sm:p-5">
                <div className="flex gap-4">
                  <Link
                    href={`/products/${item.category}/${item.id}`}
                    className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-[#eeebe5] sm:size-28"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="112px"
                      className="object-contain p-2"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link
                          href={`/products/${item.category}/${item.id}`}
                          className="line-clamp-2 text-sm font-semibold transition hover:text-accent sm:text-base"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-1 text-xs text-muted-foreground">Size: {item.size}</p>
                        <p className="mt-1.5 text-sm font-semibold sm:hidden">
                          {formatPrice(getCartItemPrice(item))}
                        </p>
                      </div>
                      <p className="hidden shrink-0 text-sm font-semibold sm:block">
                        {formatPrice(getCartItemPrice(item))}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <QuantityStepper
                        value={item.quantity}
                        onChange={(quantity) => updateQuantity(item.key, quantity)}
                      />
                      <div className="flex items-center gap-3">
                        <p className="text-xs text-muted-foreground">
                          {formatPrice(getCartItemPrice(item) * item.quantity)}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeItem(item.key)}
                          className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition hover:bg-red-50 hover:text-red-600"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={clearCart}
              className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground underline underline-offset-4 transition hover:text-red-600"
            >
              Clear bag
            </button>
            <p className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              <Lock className="size-3.5" />
              Secure checkout
            </p>
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-white p-5 sm:p-6 lg:sticky lg:top-28">
          <h2 className="text-lg font-black tracking-tight">Order summary</h2>

          <div className="mt-5 rounded-xl bg-secondary/60 p-4">
            {remainingForFreeShipping > 0 ? (
              <p className="text-xs text-muted-foreground">
                You&apos;re <span className="font-semibold text-foreground">{formatPrice(remainingForFreeShipping)}</span>{" "}
                away from free delivery.
              </p>
            ) : (
              <p className="text-xs font-semibold text-emerald-700">
                You&apos;ve unlocked free delivery.
              </p>
            )}
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white">
              <div
                className="h-full rounded-full bg-foreground transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="font-semibold">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Delivery</dt>
              <dd className="font-semibold">
                {shipping === 0 ? (
                  <span className="text-emerald-700">Free</span>
                ) : (
                  formatPrice(shipping)
                )}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-3 text-base">
              <dt className="font-semibold">Total</dt>
              <dd className="font-black">{formatPrice(total)}</dd>
            </div>
          </dl>

          <ButtonLink href="/checkout" size="lg" className="mt-6 w-full">
            Checkout
            <ArrowRight className="size-4" />
          </ButtonLink>

          <div className="mt-4 space-y-2 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
            <p className="flex items-center gap-2">
              <Truck className="size-3.5" />
              Nationwide delivery in 1–5 working days
            </p>
            <p className="flex items-center gap-2">
              <ShieldCheck className="size-3.5" />
              Paystack secured payment
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
