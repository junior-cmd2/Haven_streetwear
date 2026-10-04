'use client'
import React from 'react'
import Link from 'next/link'
import { ArrowBigUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { caps } from "@/public/pictures/caps/caps"

const page = () => {
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
        <div className='bg-[#efeff1] min-h-screen px-4 sm:px-6 md:px-10 py-8 sm:py-12 lg:py-16 relative'>

            {/* Header Title Section */}
            <div className='mt-4 sm:mt-8 text-center'>
                <div className='pt-5 relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-pink-500 p-2 shadow-sm'>
                    <h1 className='font-bold tracking-widest text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-mono relative text-white'>
                        Caps Section
                    </h1>
                </div>

                {/* Product Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-8 mt-6 max-w-7xl mx-auto'>
                    {caps.map((cap) => (
                        <Link
                            className='flex flex-col border border-zinc-200 bg-white p-4 sm:p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group'
                            key={cap.id}
                            href={`/products/caps/${cap.id}`}
                        >
                            <div className='overflow-hidden rounded-xl bg-gray-50 mb-3'>
                                <img
                                    src={cap.image}
                                    alt={cap.name || 'Cap'}
                                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className='flex flex-col items-center justify-center text-center mt-auto'>
                                <p className='font-bold text-zinc-900 text-base sm:text-lg mb-1'>{cap.name}</p>
                                <span className='font-medium text-zinc-600'>
                                    ₦{Math.round(cap.price || 0)}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Scroll to Top Floating Button */}
            {showButton && (
                <div className='fixed bottom-6 right-6 z-50'>
                    <button
                        className='border-4 border-white w-14 h-14 rounded-full flex items-center justify-center bg-pink-500 text-white cursor-pointer shadow-lg hover:bg-pink-600 transition-all active:scale-95'
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        aria-label="Scroll to top"
                    >
                        <ArrowBigUp size={28} />
                    </button>
                </div>
            )}

        </div>
    )
}

export default page