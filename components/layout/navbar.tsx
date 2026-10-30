"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Menu, Search, ShoppingBag, X } from "lucide-react";
import { categoryInfo, productHref, searchProducts } from "@/lib/data/products";
import { formatPrice } from "@/lib/format";
import { navLinks, siteConfig } from "@/lib/site";
import { useHasMounted } from "@/lib/use-has-mounted";
import { selectCartCount, useCartStore } from "@/store/cartStore";
import { cn } from "@/lib/utils";

const popularSearches = ["Tees", "Caps", "Shox", "Denim"];

export default function Navbar() {
  const pathname = usePathname();
  const mounted = useHasMounted();
  const cartCount = useCartStore(selectCartCount);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => searchProducts(query), [query]);

  useEffect(() => {
    document.body.style.overflow = searchOpen || menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen, menuOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const frame = requestAnimationFrame(() => searchInputRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [searchOpen]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const isActive = (href: string) =>
    href === "/shop" ? pathname === "/shop" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className="sticky top-0 z-50">
        <div className="bg-neutral-950 px-4 py-2 text-center text-[9px] font-medium uppercase tracking-[0.2em] text-white/75 sm:text-[10px]">
          Complimentary nationwide delivery on orders over {formatPrice(200_000)}
        </div>

        <div className="border-b border-border/80 bg-background/90 backdrop-blur-xl">
          <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-20">
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className="flex size-10 items-center justify-center rounded-full transition hover:bg-foreground/5"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>

            <Link
              href="/"
              onClick={() => {
                setSearchOpen(false);
                setMenuOpen(false);
                setQuery("");
              }}
              className="flex shrink-0 items-baseline gap-1"
              aria-label="Haven Streetwear home"
            >
              <span className="text-[22px] font-black leading-none tracking-[-0.08em] sm:text-2xl">
                HAVEN
              </span>
              <span className="text-[8px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Streetwear
              </span>
            </Link>

            <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
              {navLinks.slice(0, 6).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/70 transition hover:text-foreground",
                    isActive(link.href) && "text-foreground",
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute inset-x-0 -bottom-0.5 h-px scale-x-0 bg-foreground transition-transform duration-300",
                      isActive(link.href) && "scale-x-100",
                    )}
                  />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="flex size-10 items-center justify-center rounded-full transition hover:bg-foreground/5"
                aria-label="Search products"
              >
                <Search className="size-[19px]" />
              </button>

              <Link
                href="/cart"
                className="relative flex size-10 items-center justify-center rounded-full transition hover:bg-foreground/5"
                aria-label={mounted ? `Shopping bag, ${cartCount} items` : "Shopping bag"}
              >
                <ShoppingBag className="size-[19px]" />
                {mounted && cartCount > 0 ? (
                  <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-white">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                ) : null}
              </Link>

              <Link
                href="/contact"
                className="hidden items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] transition hover:border-foreground/40 sm:flex"
              >
                Need help?
              </Link>
            </div>
          </div>
        </div>
      </header>

      {searchOpen ? (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Search products">
          <button
            type="button"
            className="absolute inset-0 bg-neutral-950/40 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
            aria-label="Close search"
          />
          <div className="relative mx-auto max-h-[90dvh] w-full max-w-5xl overflow-y-auto bg-background shadow-2xl sm:mt-8 sm:rounded-b-3xl">
            <div className="container-page py-6 sm:py-8">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                  Search the collection
                </p>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="flex size-9 items-center justify-center rounded-full border border-border transition hover:bg-foreground hover:text-background"
                  aria-label="Close search"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="mt-6 flex items-center gap-4 border-b border-foreground/20 pb-4">
                <Search className="size-5 shrink-0 text-muted-foreground" />
                <input
                  ref={searchInputRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search tees, caps, shoes…"
                  className="w-full bg-transparent text-xl font-medium tracking-tight placeholder:text-muted-foreground/70 focus:outline-none sm:text-2xl"
                  aria-label="Search products"
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground"
                  >
                    Clear
                  </button>
                ) : null}
              </div>

              <div className="mt-6 pb-2">
                {!query.trim() ? (
                  <div>
                    <p className="text-sm text-muted-foreground">Popular right now</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {popularSearches.map((term) => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => setQuery(term)}
                          className="rounded-full border border-border bg-white px-4 py-2 text-xs font-medium transition hover:border-foreground"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : results.length > 0 ? (
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {results.map((product) => (
                      <li key={`${product.category}-${product.id}`}>
                        <Link
                          href={productHref(product)}
                          onClick={() => setSearchOpen(false)}
                          className="group flex items-center gap-4 rounded-2xl border border-border bg-white p-3 transition hover:border-foreground/40"
                        >
                          <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-secondary">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              sizes="64px"
                              className="object-cover transition duration-500 group-hover:scale-105"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                              {categoryInfo[product.category].label}
                            </p>
                            <p className="truncate text-sm font-semibold">{product.name}</p>
                            <p className="mt-0.5 text-xs text-muted-foreground">{formatPrice(product.price)}</p>
                          </div>
                          <ArrowRight className="size-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="rounded-2xl border border-dashed border-border p-10 text-center">
                    <p className="text-sm font-semibold">No matches for “{query}”</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Try a different name, category or colour.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {menuOpen ? (
        <div className="fixed inset-0 z-40 overflow-y-auto bg-neutral-950 text-white lg:hidden">
          <div className="container-page pb-12 pt-28 sm:pt-32">
            <nav className="flex flex-col" aria-label="Mobile navigation">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-center justify-between border-b border-white/10 py-4"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] text-white/40">0{index + 1}</span>
                    <span className="text-3xl font-black tracking-[-0.04em] sm:text-4xl">{link.label}</span>
                  </span>
                  <ArrowRight className="size-5 -translate-x-1 text-white/40 transition group-hover:translate-x-0 group-hover:text-white" />
                </Link>
              ))}
            </nav>

            <div className="mt-10 grid gap-6 text-sm text-white/60 sm:grid-cols-2">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">Customer care</p>
                <a href={`mailto:${siteConfig.email}`} className="mt-2 block hover:text-white">
                  {siteConfig.email}
                </a>
                <p className="mt-1">{siteConfig.location}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">Follow</p>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
                  {siteConfig.socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/shop"
              onClick={() => setMenuOpen(false)}
              className="mt-10 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-8 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-950"
            >
              Shop the collection
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}
