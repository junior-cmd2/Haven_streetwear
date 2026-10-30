import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { ProductGrid } from "@/components/product/product-grid";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  allProducts,
  categories,
  categoryInfo,
  featuredProducts,
  getProductsByCategory,
} from "@/lib/data/products";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const marqueeItems = [
  "SS26 — Vol. 01",
  "Limited runs",
  "Heavyweight essentials",
  "Lagos to the world",
  "Nationwide delivery",
  "Secure checkout",
];

const lookbook = [
  {
    src: "/pictures/aigenerated/Gemini_Generated_Image_6355oj6355oj6355.jpg",
    alt: "Haven Streetwear editorial campaign image",
    className: "col-span-2 aspect-[16/11] md:aspect-[16/12]",
  },
  {
    src: "/pictures/maleT-shirt/haven_streetwear.jpg",
    alt: "Haven graphic tee campaign image",
    className: "aspect-[3/4]",
  },
  {
    src: "/pictures/caps/instagram_ @twobig_co (1).jpg",
    alt: "Haven cap editorial image",
    className: "aspect-[3/4]",
  },
  {
    src: "/pictures/shoesfolder/SHOESSSSS.jpg",
    alt: "Haven footwear editorial image",
    className: "col-span-2 aspect-[16/9] md:col-span-4 md:aspect-[21/8]",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-neutral-950 text-white">
        <video
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-70"
          src="/pictures/aigenerated/Man_modeling_streetwear_fashion_…_20261006173116.mp4"
          poster="/pictures/aigenerated/Gemini_Generated_Image_6355oj6355oj6355.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-neutral-950 via-neutral-950/75 to-neutral-950/10" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-neutral-950/80 to-transparent" />

        <div className="container-page flex min-h-[68vh] flex-col justify-center py-20 sm:min-h-[76vh] sm:py-28 lg:py-32">
          <div className="max-w-3xl">
            <Badge className="bg-white/10 text-white shadow-none backdrop-blur">
              <span className="mr-2 inline-block size-1.5 rounded-full bg-accent" />
              New collection — SS26
            </Badge>

            <h1 className="mt-6 text-[3.4rem] font-black leading-[0.88] tracking-[-0.07em] sm:text-7xl lg:text-[6.5rem]">
              WEAR THE
              <br />
              STATEMENT<span className="text-accent">.</span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
              More than a brand — art brought to life. Heavyweight tees, relaxed denim and curated
              footwear, engineered for the everyday.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink
                href="/shop"
                size="lg"
                className="bg-white text-neutral-950 hover:bg-white/90"
              >
                Shop the collection
                <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink
                href="/gallery"
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white hover:text-neutral-950"
              >
                View lookbook
                <ArrowUpRight className="size-4" />
              </ButtonLink>
            </div>
          </div>
        </div>

        <div className="relative border-t border-white/10 bg-neutral-950/40 backdrop-blur-sm">
          <div className="container-page grid gap-4 py-5 text-[9px] font-medium uppercase tracking-[0.18em] text-white/60 sm:grid-cols-3 sm:text-[10px]">
            <span className="flex items-center gap-2">
              <Truck className="size-4 text-accent" />
              Nationwide delivery
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-accent" />
              Secure Paystack checkout
            </span>
            <span className="flex items-center gap-2">
              <RotateCcw className="size-4 text-accent" />
              7-day easy returns
            </span>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-b border-border bg-white py-3">
        <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="flex items-center gap-8 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-neutral-500"
            >
              {item}
              <span className="size-1 rounded-full bg-accent" />
            </span>
          ))}
        </div>
      </div>

      <section className="container-page py-16 sm:py-24">
        <SectionHeading
          eyebrow="Shop by category"
          title="Built for the rotation."
          description="Four categories. One point of view. Start with the pieces that do the most work."
          action={
            <ButtonLink href="/shop" variant="outline" size="sm">
              Shop all pieces
              <ArrowRight className="size-3.5" />
            </ButtonLink>
          }
        />

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {categories.map((category) => {
            const info = categoryInfo[category];
            const count = getProductsByCategory(category).length;
            return (
              <Link
                key={category}
                href={`/shop/${category}`}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-900"
              >
                <Image
                  src={info.image}
                  alt={info.label}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/10 to-transparent" />
                <div className="absolute inset-x-4 bottom-4 text-white sm:inset-x-5 sm:bottom-5">
                  <p className="text-xl font-black tracking-[-0.03em] sm:text-2xl">{info.label}</p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-white/55">
                    {count} pieces
                  </p>
                </div>
                <span className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition group-hover:bg-white group-hover:text-neutral-950 sm:right-5 sm:top-5">
                  <ArrowUpRight className="size-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-y border-border bg-white">
        <div className="container-page py-16 sm:py-24">
          <SectionHeading
            eyebrow="The edit"
            title="Pieces we're wearing now."
            description="A tight selection across tees, denim, caps and footwear — chosen by the studio."
            action={
              <ButtonLink href="/shop" variant="outline" size="sm">
                View everything
                <ArrowRight className="size-3.5" />
              </ButtonLink>
            }
          />
          <ProductGrid products={featuredProducts} className="mt-10" eagerCount={4} />
        </div>
      </section>

      <section className="bg-neutral-950 text-white">
        <div className="container-page grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/pictures/aigenerated/Gemini_Generated_Image_thijoythijoythij.jpg"
              alt="Haven Streetwear studio editorial"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 to-transparent" />
          </div>

          <div>
            <p className="flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-white/45">
              <span className="inline-block size-1.5 rounded-full bg-accent" />
              The Haven standard
            </p>
            <h2 className="mt-4 max-w-lg text-3xl font-black leading-[1.02] tracking-[-0.04em] sm:text-4xl lg:text-5xl">
              More than a brand.
              <br />A point of view.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/60 sm:text-base">
              Haven began with a simple idea: make the pieces you reach for every day feel
              considered. We work with heavyweight cotton, honest hardware and silhouettes that
              hold up long after the drop.
            </p>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/60 sm:text-base">
              Limited runs. Quality checked in Lagos. No noise, no filler — just the pieces worth
              keeping.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
              <div>
                <p className="text-2xl font-black tracking-tight sm:text-3xl">{allProducts.length}</p>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">
                  Pieces in rotation
                </p>
              </div>
              <div>
                <p className="text-2xl font-black tracking-tight sm:text-3xl">100%</p>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">
                  Quality checked
                </p>
              </div>
              <div>
                <p className="text-2xl font-black tracking-tight sm:text-3xl">7</p>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">
                  Day returns
                </p>
              </div>
            </div>

            <ButtonLink
              href="/shop"
              size="lg"
              className="mt-8 bg-white text-neutral-950 hover:bg-white/90"
            >
              Shop the studio edit
              <ArrowRight className="size-4" />
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-24">
        <SectionHeading
          eyebrow="Lookbook"
          title="Lagos, after dark."
          description="A study in relaxed silhouettes, layered neutrals and the pieces that carry a fit."
          action={
            <ButtonLink href="/gallery" variant="outline" size="sm">
              Open lookbook
              <ArrowUpRight className="size-3.5" />
            </ButtonLink>
          }
        />

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {lookbook.map((image) => (
            <Link
              key={image.src}
              href="/gallery"
              className={`group relative overflow-hidden rounded-2xl bg-secondary ${image.className}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 to-transparent opacity-0 transition group-hover:opacity-100" />
              <span className="absolute bottom-3 right-3 flex size-8 translate-y-1 items-center justify-center rounded-full bg-white text-neutral-950 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                <ArrowUpRight className="size-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page pb-4 sm:pb-8">
        <div className="surface-grid flex flex-col items-start justify-between gap-8 rounded-3xl border border-border bg-white p-8 sm:p-12 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <p className="flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
              <span className="inline-block size-1.5 rounded-full bg-accent" />
              The next drop
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
              Get first access.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Join the list for early access, restock alerts and the occasional studio note. No spam.
            </p>
          </div>
          <ButtonLink href="/shop" size="lg" className="shrink-0">
            Shop the collection
            <ArrowRight className="size-4" />
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
