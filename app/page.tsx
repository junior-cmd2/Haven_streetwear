'use client'
import Image from "next/image";
import { useState } from 'react'
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/Shadcomponents/ui/carousel";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay"
import React from "react";
import Main from "./main";

export default function Home() {
  const picture1 = "@/public/pictures/aigenerated/Gemini_Generated_Image_6355oj6355oj6355.jpg"
  return (
    <div>
      <div className="flex-1 w-full bg-[#252b39] text-white">
        <div>
          <Carousel plugins={[Autoplay({ delay: 4000, }),]} opts={{ loop: true, }} className="w-full h-full">
            <CarouselContent className="w-full h-full">
              <CarouselItem className="basis-full h-full relative">
                <video src="/pictures/aigenerated/gettyimages-2221449150-640_adpp.mp4" className="w-600 h-160 object-fill" autoPlay muted loop playsInline/>
                <div className="absolute inset-0 bg-black/70"></div>
                <div className="absolute top-20 text-white p-4 text-start flex flex-col items-start gap-3 ">
                  <h3 className="font-bold text-7xl max-w-4xl break-all">HAVENS_STREETWEAR</h3>
                  <p className="font-extralight text-2xl max-w-2xl">This is more than just a brand, this is art come to life, we make more than wears that are worn.</p>
                  <p className="text-red-500 text-2xl">Simplicity at its peak.....</p>
                  <Link href={"/"}>
                    <button className="border p-3 rounded-3xl bg-white px-5 cursor-pointer text-black">Shop Now</button>
                  </Link>
                </div>
              </CarouselItem>
              <CarouselItem className="basis-full h-full relative">
                <img src="/pictures/caps/beanies beanie outfit_.jpg" alt="hat" className="w-500 h-160 object-fill" />
                <div className="absolute inset-0 bg-black/70"></div>
                <div className="absolute bottom-10 text-white p-4 text-start flex flex-col items-start gap-3 ">
                  <h3 className="font-extrabold text-5xl max-w-[300px] tracking-tighter">WEAR YOUR ALLEGIANCE</h3>
                  <p className="font-extralight text-2xl max-w-2xl">Crop the all new run-way beanies, caps and headwarmer.. you don't need to say who is with you, they would be right behind you</p>
                  <Link href={"/"}>
                    <button className="border p-3 rounded-3xl bg-white px-5 cursor-pointer text-black">Shop Now</button>
                  </Link>
                </div>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>
      </div>
      <Main />
    </div>
  );
}
