'use client'
import Image from "next/image";
import { useState } from 'react'
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/Shadcomponents/ui/carousel";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay"
import React from "react";
import Main from "./main";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const picture1 = "@/public/pictures/aigenerated/Gemini_Generated_Image_6355oj6355oj6355.jpg"
  return (
    <div>
      <section className="relative w-full h-[85vh] min-h-[550px] overflow-hidden bg-neutral-950 ">
        {/* Background Video */}
        <video
          src="/pictures/aigenerated/Man_modeling_streetwear_fashion_…_20261006173116.mp4"
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Cinematic Gradient Overlay for Contrast over Light Video Tones */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/60 to-neutral-950/20" />

        {/* Main Content Container (Professional Left-Aligned Layout with Proper Spacing) */}
        <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col justify-center items-start">
          <div className="max-w-2xl space-y-6">

            {/* Subtle Category Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-zinc-200 text-xs tracking-widest uppercase font-medium">
              <span>New Collection</span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            </div>

            {/* Brand Heading */}
            <h1 className="font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-[1.1]">
              HAVENS<span className="text-red-500">_</span>STREETWEAR
            </h1>

            {/* Description */}
            <p className="font-light text-base sm:text-lg lg:text-xl text-zinc-300 leading-relaxed max-w-xl">
              More than a brand—art brought to life. We engineer statements, not just garments.
            </p>

            {/* Tagline */}
            <p className="text-red-400 font-medium text-sm sm:text-base tracking-wide uppercase">
              Simplicity at its peak
            </p>

            {/* CTA Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link href="/sub-pages/tshirt" className="group">
                <button className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-neutral-950 font-semibold text-sm sm:text-base hover:bg-red-600 hover:text-white transition-all duration-300 shadow-xl cursor-pointer">
                  <span>Shop Collection</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </Link>

              <Link href="/sub-pages/tshirt">
                <button className="inline-flex items-center px-8 py-4 rounded-full bg-transparent border border-white/30 text-white font-medium text-sm sm:text-base hover:bg-white/10 transition-all duration-300 cursor-pointer">
                  View Lookbook
                </button>
              </Link>
            </div>

          </div>
        </div>
      </section>
      <Main />
    </div>
  );
}
