"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ArrowRight, Home, RotateCcw } from "lucide-react";
import { siteConfig } from "@/lib/site";

export default function Error({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-page flex min-h-[70vh] flex-col items-center justify-center py-16 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-red-50 text-red-600">
        <span className="text-2xl font-black">!</span>
      </div>
      <p className="mt-6 font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
        Something went wrong
      </p>
      <h1 className="mt-3 max-w-2xl text-3xl font-black tracking-[-0.04em] sm:text-4xl">
        We hit a snag<span className="text-accent">.</span>
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
        The page couldn&apos;t load. This is usually temporary — try again, or head back to the shop.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => retry()}
          className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-foreground px-8 text-xs font-semibold uppercase tracking-[0.16em] text-background transition hover:bg-foreground/85"
        >
          <RotateCcw className="size-4" />
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-foreground/25 px-8 text-xs font-semibold uppercase tracking-[0.16em] transition hover:bg-foreground hover:text-background"
        >
          <Home className="size-4" />
          Back home
        </Link>
        <Link
          href="/shop"
          className="inline-flex h-13 items-center justify-center gap-2 rounded-full px-6 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground transition hover:text-foreground"
        >
          Shop the collection
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <p className="mt-10 text-[10px] text-muted-foreground">
        If this keeps happening, email{" "}
        <a href={`mailto:${siteConfig.email}`} className="underline underline-offset-2">
          {siteConfig.email}
        </a>
        .
      </p>
    </div>
  );
}
