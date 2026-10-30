import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Your bag",
  description: "Review the pieces in your Haven Streetwear bag before checkout.",
  alternates: { canonical: "/cart" },
  robots: { index: false, follow: true },
};

export default function CartLayout({ children }: { children: ReactNode }) {
  return children;
}
