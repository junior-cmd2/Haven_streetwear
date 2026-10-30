import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { ShopCatalog } from "@/components/shop/shop-catalog";
import {
  categories,
  categoryInfo,
  getProductsByCategory,
  isCategory,
} from "@/lib/data/products";

type Params = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return categories.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category } = await params;
  if (!isCategory(category)) return { title: "Collection not found" };

  const info = categoryInfo[category];
  return {
    title: info.label,
    description: info.blurb,
    alternates: { canonical: `/shop/${category}` },
    openGraph: {
      title: `${info.label} — Haven Streetwear`,
      description: info.blurb,
      images: [{ url: info.image, alt: info.label }],
    },
  };
}

export default async function CategoryPage({ params }: Params) {
  const { category } = await params;
  if (!isCategory(category)) notFound();
  const info = categoryInfo[category];
  const products = getProductsByCategory(category);

  return (
    <>
      <section className="border-b border-border bg-white">
        <div className="container-page py-10 sm:py-14">
          <nav className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            <Link href="/" className="transition hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="size-3" />
            <Link href="/shop" className="transition hover:text-foreground">
              Shop
            </Link>
            <ChevronRight className="size-3" />
            <span className="text-foreground">{info.label}</span>
          </nav>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div>
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                Collection / {String(categories.indexOf(category) + 1).padStart(2, "0")}
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                {info.label}
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {info.blurb}
              </p>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                {products.length} pieces available
              </p>
            </div>

            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-secondary lg:aspect-[16/11]">
              <Image
                src={info.image}
                alt={info.label}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-8 sm:py-12">
        <ShopCatalog products={products} initialCategory={category} showCategoryFilter={false} />
      </section>
    </>
  );
}
