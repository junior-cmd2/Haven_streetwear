import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { categoryInfo } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Lookbook",
  description:
    "The Haven Streetwear lookbook — relaxed silhouettes, layered neutrals and the pieces that carry a fit.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Lookbook — Haven Streetwear",
    description:
      "A study in relaxed silhouettes, layered neutrals and the pieces that carry a fit.",
    images: [{ url: "/pictures/aigenerated/Gemini_Generated_Image_6355oj6355oj6355.jpg" }],
  },
};

const looks = [
  {
    src: "/pictures/aigenerated/Gemini_Generated_Image_6355oj6355oj6355.jpg",
    alt: "Haven streetwear editorial — full look",
    title: "The opening look",
    copy: "Oversized tee, relaxed denim and a structured cap. Everything in balance.",
    href: "/shop/tshirts",
    className: "sm:col-span-2 aspect-[16/11]",
  },
  {
    src: "/pictures/maleT-shirt/haven_streetwear.jpg",
    alt: "Haven heavyweight graphic tee",
    title: "Heavyweight jersey",
    copy: "Garment-washed cotton with a boxy, broken-in feel.",
    href: "/shop/tshirts",
    className: "aspect-[3/4]",
  },
  {
    src: "/pictures/caps/instagram_ @twobig_co (1).jpg",
    alt: "Haven structured cap",
    title: "Finishing touch",
    copy: "Washed cotton, embroidered mark, adjustable strap.",
    href: "/shop/caps",
    className: "aspect-[3/4]",
  },
  {
    src: "/pictures/trousers/instagram_ @twobig_co.jpg",
    alt: "Haven relaxed denim",
    title: "Relaxed denim",
    copy: "A straight leg built for long days and late nights.",
    href: "/shop/pants",
    className: "aspect-[3/4]",
  },
  {
    src: "/pictures/shoesfolder/SHOESSSSS.jpg",
    alt: "Haven curated footwear",
    title: "Ground up",
    copy: "Court classics and everyday runners, quality checked.",
    href: "/shop/shoes",
    className: "aspect-[3/4]",
  },
  {
    src: "/pictures/aigenerated/Gemini_Generated_Image_thijoythijoythij.jpg",
    alt: "Haven studio editorial",
    title: "Studio study",
    copy: "Neutral layers, clean lines and considered proportions.",
    href: "/shop",
    className: "sm:col-span-2 aspect-[16/11]",
  },
  {
    src: "/pictures/maleT-shirt/Oversized Streetwear Outfits for Men _ Modern Urban Fashion Inspiration.jpg",
    alt: "Oversized streetwear outfit inspiration",
    title: "Layered volumes",
    copy: "Room to move. Silhouettes that hold their shape.",
    href: "/shop/tshirts",
    className: "aspect-[3/4]",
  },
  {
    src: "/pictures/shoesfolder/shoe hub.jpg",
    alt: "Haven footwear selection",
    title: "The rotation",
    copy: "Pairs that work with everything already in your wardrobe.",
    href: "/shop/shoes",
    className: "aspect-[3/4]",
  },
  {
    src: "/pictures/trousers/Sustainable Pants _ Demi High Balloon - Medium Aged _ MUD Jeans.jpg",
    alt: "Haven relaxed pants",
    title: "Everyday pants",
    copy: "Cargos, denim and shorts with honest hardware.",
    href: "/shop/pants",
    className: "aspect-[3/4]",
  },
];

export default function GalleryPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-neutral-950 text-white">
        <Image
          src="/pictures/aigenerated/Gemini_Generated_Image_6355oj6355oj6355.jpg"
          alt=""
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="-z-20 object-cover opacity-55"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-neutral-950 via-neutral-950/70 to-neutral-950/20" />
        <div className="container-page flex min-h-[52vh] flex-col justify-end py-14 sm:min-h-[60vh] sm:py-20">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-white/50">
            Lookbook / SS26
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-[0.92] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
            Lagos, after dark<span className="text-accent">.</span>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
            A study in relaxed silhouettes, layered neutrals and the pieces that carry a fit. Shot
            in the studio, worn on the street.
          </p>
        </div>
      </section>

      <section className="container-page py-12 sm:py-16">
        <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
              The edit / 09 looks
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] sm:text-3xl">
              Worn together, built apart.
            </h2>
          </div>
          <ButtonLink href="/shop" variant="outline" size="sm">
            Shop every piece
            <ArrowRight className="size-3.5" />
          </ButtonLink>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {looks.map((look) => (
            <Link
              key={look.src}
              href={look.href}
              className={`group relative overflow-hidden rounded-2xl bg-neutral-900 ${look.className}`}
            >
              <Image
                src={look.src}
                alt={look.alt}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover opacity-95 transition duration-700 group-hover:scale-[1.04] group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/15 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 text-white sm:inset-x-5 sm:bottom-5">
                <p className="text-base font-black tracking-[-0.02em] sm:text-xl">{look.title}</p>
                <p className="mt-1 max-w-xs text-[11px] leading-relaxed text-white/60 sm:text-xs">
                  {look.copy}
                </p>
              </div>
              <span className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition group-hover:bg-white group-hover:text-neutral-950">
                <ArrowUpRight className="size-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-white">
        <div className="container-page py-12 sm:py-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(["tshirts", "pants", "shoes", "caps"] as const).map((category) => (
              <Link
                key={category}
                href={`/shop/${category}`}
                className="group flex items-center justify-between border-b border-border pb-4"
              >
                <span>
                  <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                    Shop the look
                  </span>
                  <span className="mt-1 block text-lg font-black tracking-tight">
                    {categoryInfo[category].label}
                  </span>
                </span>
                <ArrowUpRight className="size-4 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
