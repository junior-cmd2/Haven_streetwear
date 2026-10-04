
import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { caps, maleTshirt, shoes, trouser } from "@/public/pictures/page"
import ProductGallery, { ButtonChange, Dropdownlist, IncreaseAnddecrease, AddToCart, NextPrevBtn, ProductAction } from "./productGallery";

export default async function ProductPage({ params }: { params: Promise<{ category: string, id: string }>; }) {

    const { category, id } = await params

    console.log(category)
    console.log(id)

    let products;

    if (category === "caps") {
        products = caps;
    }
    if (category === "maleTshirt") {
        products = maleTshirt;
    }
    if (category === "shoe") {
        products = shoes;
    }
    if (category === "trouser") {
        products = trouser;
    }
    const product = products?.find((product) => product.id === Number(id))

    if (!product) {
        return (<div>Product sold Out</div>)
    }

    const productByCategory = {
        caps,
        maleTshirt,
        shoe: shoes,
        trouser
    }

    console.log("Current category:", category);
    console.log("Available categories:", Object.keys(productByCategory));

    const categoryProducts = productByCategory[category as keyof typeof productByCategory];
    console.log('category products', categoryProducts)

    const currentIndex = categoryProducts.findIndex((product) => product.id === Number(id))

    const nextProduct = categoryProducts[currentIndex + 1]
    const prevProduct = categoryProducts[currentIndex - 1]
    // console.log("previous-product:", prevProduct.id)


    return (
        <div className='bg-[#efeff1] min-h-screen p-4 sm:p-6 md:p-10 lg:p-16'>

            {/* Navigation Arrows */}
            <div className='flex gap-3 items-center justify-end max-w-7xl mx-auto mb-6'>
                {prevProduct && (
                    <Link
                        className='p-2 rounded-xl bg-white border border-zinc-200 shadow-sm hover:bg-zinc-50 transition-all cursor-pointer'
                        href={`/products/${category}/${prevProduct.id}`}
                        aria-label="Previous Product"
                    >
                        <ArrowLeft size={22} className="text-zinc-700" />
                    </Link>
                )}
                {nextProduct && (
                    <Link
                        className='p-2 rounded-xl bg-white border border-zinc-200 shadow-sm hover:bg-zinc-50 transition-all cursor-pointer'
                        href={`/products/${category}/${nextProduct.id}`}
                        aria-label="Next Product"
                    >
                        <ArrowRight size={22} className="text-zinc-700" />
                    </Link>
                )}
            </div>

            {/* Main Product Container */}
            <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden p-6 sm:p-8 md:p-10'>

                {/* Product Gallery Column */}
                <div className='flex flex-col justify-center items-center w-full bg-gray-50 rounded-xl p-4'>
                    <div className='w-full'>
                        <ProductGallery product={product} />
                    </div>
                </div>

                {/* Product Details Column */}
                <div className='flex flex-col justify-start text-start space-y-6 lg:sticky lg:top-24 h-fit'>

                    <div>
                        <h1 className='text-3xl sm:text-4xl lg:text-5xl font-serif text-zinc-900 leading-tight'>
                            {product?.name}
                        </h1>
                        <p className='font-serif text-xl sm:text-2xl underline mt-3 text-zinc-800'>
                            ₦{product?.price ? Math.round(product.price) : 0}
                        </p>
                    </div>

                    <div>
                        <p className='font-light text-sm sm:text-base text-zinc-500 mb-2'>Size</p>
                        <ButtonChange />
                    </div>

                    <div className='flex flex-col gap-4'>
                        <ProductAction product={product} />

                        <Link
                            href={"/"}
                            className='w-full text-center py-4 px-6 border border-zinc-900 bg-zinc-900 text-white rounded-xl font-medium cursor-pointer transition-all duration-300 hover:bg-zinc-800 shadow-sm'
                        >
                            Buy Now
                        </Link>
                    </div>

                    <div className='pt-4 border-t border-zinc-100'>
                        <Dropdownlist product={product} />
                    </div>

                </div>

            </div>
        </div>
    )
}