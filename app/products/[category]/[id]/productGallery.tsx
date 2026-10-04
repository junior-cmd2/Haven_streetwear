"use client";

import { Select } from "@base-ui/react";
import { useState } from "react";
import Link from "next/link";
import { ClipboardPen, ChevronDown, ArrowLeft, ArrowRight } from 'lucide-react'
import { usecartStore } from '@/store/cartStore'


export default function ProductGallery({ product }: any) {
    const images = [
        product?.image,
        product?.image1,
        product?.image2,
        product?.image3,
    ].filter(Boolean);

    const [mainImage, setMainImage] = useState(images[0]);

    return (
        <div className='flex flex-col w-full gap-4 sm:gap-6'>

            {/* Main Image View */}
            <div className='w-full bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm flex items-center justify-center p-4'>
                <img
                    src={mainImage || product?.image}
                    alt={product?.name || 'Product Image'}
                    className='w-full h-[300px] sm:h-[400px] lg:h-[480px] object-contain transition-all duration-300'
                />
            </div>

            {/* Small Thumbnail Images */}
            {images && images.length > 0 && (
                <div className='flex flex-wrap gap-3 sm:gap-4 items-center justify-center'>
                    {images.map((image, index) => {
                        const isSelected = mainImage === image;
                        return (
                            <button
                                key={index}
                                onClick={() => setMainImage(image)}
                                className={`rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer bg-white ${isSelected
                                        ? 'border-zinc-900 scale-105 shadow-sm'
                                        : 'border-zinc-200 opacity-70 hover:opacity-100'
                                    }`}
                            >
                                <img
                                    src={image}
                                    alt={`${product?.name || 'Product'} thumbnail ${index + 1}`}
                                    className='w-16 h-16 sm:w-20 sm:h-20 object-cover'
                                />
                            </button>
                        );
                    })}
                </div>
            )}

        </div>
    );
}

export function ButtonChange() {
    const [clicked, setClicked] = useState("X")


    return (
        <div className="md:flex md:gap-10 mt-5 max-w-2xl space-x-2 ">
            <button onClick={() => setClicked("M")} className={`border p-7 ${clicked === "M" ? 'bg-pink-400 text-white' : 'bg-white text-black'}`}>M</button>
            <button onClick={() => setClicked("X")} className={`border p-7 ${clicked === "X" ? 'bg-pink-400 text-white' : 'bg-white text-black'}`}>X</button>
            <button onClick={() => setClicked("XL")} className={`border p-7 ${clicked === "XL" ? 'bg-pink-400 text-white' : 'bg-white text-black'}`}>XL</button>
        </div>
    )
}



type props = {
    productId: number,
    quantity: number
}


export function Dropdownlist({ product }: any) {
    const [toggle, setToggle] = useState(false)
    const [toggle1, setToggle1] = useState(false)

    function openToogle() {
        setToggle(!toggle)
    }
    function openToogle2() {
        setToggle1(!toggle1)
    }

    const description = [
        product?.description
    ]
    return (
        <div className="">
            <div className="flex items-center justify-between cursor-pointer">
                <div className="flex gap-5 items-center mt-10">
                    <ClipboardPen size={30} />
                    <p className="text-[18px] font-mono">DESCRIPTION</p>
                </div>
                <button onClick={openToogle} className={`${toggle ? 'rotate-180' : ''}`}><ChevronDown /></button>
            </div>

            <div className={`border text-start p-5 ${toggle ? 'block' : 'hidden'}`}>
                <p className="font-mono text-[15px] tracking-widest">{description}</p>
            </div>

            <hr className="mt-5" />


            <div className="flex items-center justify-between mt-10">
                <div className="flex gap-5 items-center">
                    <ClipboardPen size={30} />
                    <p className="text-[18px] font-mono">SHIPPING</p>
                </div>
                <button onClick={openToogle2} className={`${toggle1 ? 'rotate-180' : ''}`}><ChevronDown /></button>
            </div>
            <div className={`border text-start p-5 ${toggle1 ? 'block' : 'hidden'}`}>
                <p className="font-mono text-[15px] tracking-widest">Domestic Orders Will Ship Within 1-2 Days of being placed.
                    International Orders Will Ship 1-7 Days of being placed.</p>
            </div>
        </div>
    )
}

export function IncreaseAnddecrease({ quantity, setQuantity }: any) {
    return (
        <div className="mt-5">
            <span className="font-light text-[17px] text-gray-600">Quantity</span>
            <div className="flex gap-2 justify-between bg-white items-center border p-5 mt-5 max-w-[50%]">
                <button onClick={() => setQuantity(quantity - 1)} disabled={quantity === 1} className="cursor-pointer text-2xl">-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="cursor-pointer text-2xl">+</button>
            </div>
        </div>
    )
}

export function AddToCart({ product, quantity }: any) {
    const addToCart = usecartStore((state) => state.addToCart)
    const [loading, setLoading] = useState(false)

    function handleToCart() {
        addToCart({
            ...product,
            quantity: quantity,
        })

        setLoading(true)
        addToCart(product)
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }

    return (
        <div className="flex border">
            {product && (
                <button className="p-5 px-20 border bg-white cursor-pointer hover:bg-pink-400 hover:text-white w-full flex items-center  justify-center gap-2" onClick={handleToCart} disabled={loading}>
                    {
                        loading ? (
                            <svg className="h-7 w-7 animate-spin" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="7" />
                                <path className="opacity-95" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                            </svg>
                        ) : (
                            "Add to Cart"
                        )
                    }
                </button>
            )}
        </div>
    )
}

export function ProductAction({ product }: any) {
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="flex flex-col gap-10">
            <IncreaseAnddecrease quantity={quantity} setQuantity={setQuantity} />
            <AddToCart product={product} quantity={quantity} />
        </div>
    )
}

export function NextPrevBtn() {

    function nextBtn() {

    }
    return (
        <div className="flex gap-19">
            <button className="cursor-pointer">
                <ArrowLeft size={50} />
            </button>
            <button className="cursor-pointer">
                <ArrowRight size={50} />
            </button>
        </div>
    )
}