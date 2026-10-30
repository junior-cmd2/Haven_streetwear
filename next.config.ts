import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Legacy marketing pages
      { source: "/sub-pages", destination: "/shop", permanent: true },
      { source: "/sub-pages/tshirt", destination: "/shop/tshirts", permanent: true },
      { source: "/sub-pages/pants", destination: "/shop/pants", permanent: true },
      { source: "/sub-pages/shoes", destination: "/shop/shoes", permanent: true },
      { source: "/sub-pages/caps", destination: "/shop/caps", permanent: true },

      // Legacy product URLs
      { source: "/products/maleTshirt/:id", destination: "/products/tshirts/:id", permanent: true },
      { source: "/products/shoe/:id", destination: "/products/shoes/:id", permanent: true },
      { source: "/products/trouser/:id", destination: "/products/pants/:id", permanent: true },
    ];
  },
};

export default nextConfig;
