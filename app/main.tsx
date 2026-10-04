'use client'
import React from 'react'
import Link from 'next/link'
import { ArrowBigUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { maleTshirt } from "@/public/pictures/maleT-shirt/maleT-shirt"
import { shoes } from '@/public/pictures/page'
import { caps } from '@/public/pictures/page'

const main = () => {

    const [showButton, setShowButton] = useState(false)

    useEffect(() => {
        const handleScrollToTop = () => {
            // console.log("Scroll position:", window.scrollY);
            if (window.scrollY > window.innerHeight / 2) {
                setShowButton(true)
            } else {
                setShowButton(false)
            }
        }
        window.addEventListener("scroll", handleScrollToTop);

        return () => {
            window.removeEventListener("scroll", handleScrollToTop)
        }
    }, [])
    return (
        <div className='bg-[#efeff1] p-10'>
            {/* T-shirt section */}
            <div className='mt-20 text-center items-center mx-auto'>
                <span className='relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-pink-500 p-2'>
                    <span className='relative text-white text-2xl dark:text-gray-950'>SHOP NOW</span>
                </span>
                <div className='flex flex-col justify-center items-center md:flex-row gap-10 mt-10 p-5 mx-auto'>
                    <Link href={`/products/maleTshirt/${maleTshirt[11].id}`} className='group inline-block'>
                        <img src="/pictures/maleT-shirt/download (9).jpg" alt="" className='w-90 h-90' />
                        <div className='text-start mt-5'>
                            <span className='font-mono tracking-tighter group-hover:underline'>4 star T-shirt</span>
                            <p className='font-bold tracking-tighter mt-3'>₦ 30.000</p>
                        </div>
                    </Link>
                    <Link href={`/products/maleTshirt/${maleTshirt[9].id}`} className='group inline-block'>
                        <img src="/pictures/maleT-shirt/download (7).jpg" alt="" className='w-90 h-90' />
                        <div className='text-start mt-5'>
                            <span className='font-mono tracking-tighter group-hover:underline'>Plain T-shirt</span>
                            <p className='font-bold tracking-tighter mt-3'>₦ 26.000</p>
                        </div>
                    </Link>
                    <Link href={`/products/maleTshirt/${maleTshirt[13].id}`} className='group inline-block'>
                        <img src="/pictures/maleT-shirt/PADOLA Men's T Shirt Cotton Short Sleeve Vintage Washed Oversized Streetwear.jpg" alt="" className='w-90 h-90' />
                        <div className='text-start mt-5'>
                            <span className='font-mono tracking-tighter group-hover:underline'>Plain T-shirt</span>
                            <p className='font-bold tracking-tighter mt-3'>₦ 26.000</p>
                        </div>
                    </Link>
                    <Link href={`/products/maleTshirt/${maleTshirt[15].id}`} className='group inline-block'>
                        <img src="/pictures/maleT-shirt/Manfinity EMRG Men's Summer Slogan Print Distressed Crew Neck Short Sleeve Casual T-Shirt Green Graphic Tees Distressed TshirtI discovered amazing products on SHEIN_com, come check them out!.jpg" alt="" className='w-90 h-90' />
                        <div className='text-start mt-5'>
                            <span className='font-mono tracking-tighter group-hover:underline'>Dare to be different T-shirt</span>
                            <p className='font-bold tracking-tighter mt-3'>₦ 30.000</p>
                        </div>
                    </Link>
                </div>
                <div className='mt-10'>
                    <Link href={"/sub-pages/tshirt"} className='border-3 p-3 px-5'>
                        LOAD MORE
                    </Link>
                </div>
            </div>
            {/* Pants section */}
            <div className='w-full max-w-7xl mx-auto mt-16 sm:mt-24 lg:mt-32 px-4 sm:px-6 lg:px-8'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center'>

                    {/* Image Column */}
                    <div className='w-full'>
                        <img
                            src="/pictures/trousers/Sustainable Pants _ Demi High Balloon - Medium Aged _ MUD Jeans.jpg"
                            alt="Denim Pants"
                            className='w-full h-[350px] sm:h-[450px] lg:h-[550px] object-cover rounded-2xl shadow-md'
                        />
                    </div>

                    {/* Content Column */}
                    <div className='flex flex-col justify-center text-center lg:text-left items-center lg:items-start gap-6 p-4 sm:p-6 lg:p-0'>

                        <h2 className='text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight underline decoration-zinc-300 underline-offset-8'>
                            DENIM PANTS.
                        </h2>

                        <p className='text-gray-500 text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl'>
                            <span className="inline-block first-letter:float-left first-letter:mr-2 first-letter:text-5xl sm:first-letter:text-6xl first-letter:font-bold first-letter:text-zinc-900">
                                Meet your new everyday favorite — Denim Jeans. Relaxed, comfortable, and effortlessly stylish, they're made to keep you moving while looking your best.{' '}
                                <span className="text-gray-700 italic block mt-3 font-medium">
                                    Haven Streetwears — comfort meets confidence.
                                </span>
                            </span>
                        </p>

                        <Link href={"/sub-pages/pants"} className='mt-2'>
                            <button className='border-2 border-zinc-900 bg-white text-zinc-900 rounded-xl py-3 px-6 font-semibold cursor-pointer transition-all duration-300 hover:bg-zinc-900 hover:text-white shadow-sm'>
                                ORDER NOW !
                            </button>
                        </Link>

                    </div>

                </div>
            </div>
            {/* Shoe section */}
            <div className='mt-30'>
                <div className='flex flex-col items-center justify-center text-center'>
                    <h3 className='text-5xl font-extrabold tracking-tighter'>NIKE HUB</h3>
                    <img src="../pictures/trousers/Firefly.png" alt="" className='w-50 mt-10 object-fill bg-white' />
                </div>
                <div className='flex flex-col md:flex-row p-10 items-center justify-center'>
                    <Link href={`/products/shoe/${shoes[2].id}`} className='text-center'>
                        <img src="/pictures/shoesfolder/Nike-CD7782-005-GS-002_clipped_rev_2.webp" alt="" className='w-100' />
                        <p className='font-mono font-bold text-[20px]'>Nike Court Borough Mid 2</p>
                    </Link>
                    <Link href={`/products/shoe/${shoes[8].id}`} className='text-center'>
                        <img src="/pictures/shoesfolder/tenis-nike-shox-tl-rosa-ar3566-603-6506196.webp" alt="" className='w-100' />
                        <p className='font-mono font-bold text-[20px]'>Nike Shox TL</p>
                    </Link>
                    <Link href={`/products/shoe/${shoes[7].id}`} className='text-center'>
                        <img src="/pictures/shoesfolder/tenis-nike-shox-nz-preto-9647881.webp" alt="" className='w-100' />
                        <p className='font-mono font-bold text-[20px]'>Nike Shox TL</p>
                    </Link>
                    <Link href={`/products/shoe/${shoes[6].id}`} className='text-center'>
                        <img src="/pictures/shoesfolder/tenis-nike-air-zoom-vomero-feminino-rosa-corrida-e-caminhada-hm5973-600-9674354.webp" alt="" className='w-100' />
                        <p className='font-mono font-bold text-[20px]'>Nike Air Max Scorpion</p>
                    </Link>
                </div>
                <div className='mt-10 flex justify-center items-center'>
                    <Link href={"/sub-pages/shoes"} className='border-3 p-3 px-5'>
                        LOAD MORE
                    </Link>
                </div>
            </div>
            {/* Cap section */}
            <div className='w-full max-w-7xl mx-auto mt-16 sm:mt-24 lg:mt-32 px-4 sm:px-6 lg:px-8'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center'>

                    {/* Content Column */}
                    <div className='border border-zinc-200 rounded-2xl bg-white flex flex-col justify-center text-center items-center gap-6 p-6 sm:p-8 lg:p-12 shadow-sm'>

                        <h2 className='text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight'>
                            A Decade of Style. <br /> A Legacy Worn on Your Head.
                        </h2>

                        <p className='text-gray-500 text-base sm:text-lg italic font-light max-w-md'>
                            the journey continues — one cap, one statement, one legacy at a time.
                        </p>

                        <Link href={"/sub-pages/caps"}>
                            <button className='border-2 border-zinc-900 bg-white text-zinc-900 rounded-xl py-3 px-6 font-semibold cursor-pointer transition-all duration-300 hover:bg-pink-500 hover:border-pink-500 hover:text-white shadow-sm'>
                                GET YOURS NOW !
                            </button>
                        </Link>

                    </div>

                    {/* Image Column */}
                    <div className='w-full'>
                        <img
                            src="/pictures/caps/instagram_ @twobig_co (1).jpg"
                            alt="Legacy Caps"
                            className='w-full h-[350px] sm:h-[450px] lg:h-[550px] object-cover rounded-2xl shadow-md'
                        />
                    </div>

                </div>
            </div>
            <div className='mt-30 mx-auto p-10'>
                <div className='text-center'>
                    <span className='relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-pink-500 p-2'>
                        <span className='relative text-white dark:text-gray-950 text-2xl'>FEATURED PRODUCTS</span>
                    </span>
                </div>
                <div className='flex flex-col md:flex-row p-10 items-center justify-center gap-10'>
                    <Link href={`/products/caps/${caps[5].id}`}>
                        <img src="/pictures/caps/download (3).jpg" alt="" />
                    </Link>
                    <Link href={`/products/caps/${caps[8].id}`}>
                        <img src="/pictures/caps/Shein code - CSZ8P9K.jpg" alt="" />
                    </Link>
                    <Link href={`/products/caps/${caps[9].id}`}>
                        <img src="/pictures/caps/Street Letter Embroidered Baseball Cap.jpg" alt="" />
                    </Link>
                </div>
            </div>
            {
                showButton && (
                    <div className='fixed bottom-5 right-5 z-50'>
                        <button className='border-4 w-15 h-15  rounded-full flex items-center justify-center bg-pink-500 text-white cursor-pointer' onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                            <ArrowBigUp size={40} />
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default main