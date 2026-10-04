'use client'
import React from 'react'
import Link from 'next/link'
import { ShoppingBag, ArrowLeft, Minus, Plus, Trash } from 'lucide-react'
import { usecartStore } from '@/store/cartStore'


const page = () => {
    const { cartItem, updateQuantity, removeFromCart, clearCart, cartTotal, cartCount } = usecartStore()

    const total = cartTotal()
    if (cartItem.length === 0) {
        return (
            <div className='flex flex-col flex-1 justify-center items-center min-h-[100vh]'>
                <div className=' relative border rounded-full p-10 bg-gray-700 text-white'>
                    <ShoppingBag size={42} />
                    <span className="absolute -right-2 -top-2 w-7 h-7 items-center justify-center flex rounded-full bg-orange-500 text-xs font-bold text-white">0</span>
                </div>
                <div className='text-center flex flex-col justify-center items-center mt-2'>
                    <h1>Your cart is Empty</h1>
                    <span className='mt-3'>Go explore our amazing products !</span>
                    <Link href={"/"} className='flex gap-3 mt-3 px-5 p-2 border rounded-full hover:cursor-pointer hover:bg-pink-400 hover:text-white'>
                        <ArrowLeft />
                        <button className='hover:cursor-pointer'>Browse Products </button>
                    </Link>
                </div>
            </div>
        )
    } else {
        return (
            <div className='flex-1 p-5 md:p-10 mt-3'>
                {/* Header  */}
                <div className='flex items-center justify-between mb-8'>
                    <div className='mt-10'>
                        <h1 className='text-3xl font-bold text-zinc-900 mb-8'>Your Cart</h1>
                        <span className='mt-10'>{cartCount} items</span>
                    </div>
                    <div className='flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-orange-500 transition-colors duration-200 cursor-pointer'>
                        <ArrowLeft size={20} />
                        <Link href={"/"}>Browse Products</Link>
                    </div>
                </div>
                {/* Products and the checkout section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* products */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        {
                            cartItem.map((item) => (
                                <div key={item.id} className='bg-white rounded-2xl border border-zinc-100 p-4 flex items-center justify-between '>
                                    <div className='flex gap-8'>
                                        <div className="border w-12 h-12">
                                            <img src={item.image} alt={item.name} width={80} height={80} className='w-full h-full object-contain' />
                                        </div>
                                        <div className='flex flex-col text-start items-start gap-2'>
                                            <span className='font-semibold text-zinc-800 text-sm line-clamp-2'>{item.name}</span>
                                            <span className='text-red-400'>{item.price}</span>
                                        </div>
                                    </div>
                                    <div className='flex gap-5 items-center'>
                                        <div className='border flex px-5 justify-between gap-5 rounded-2xl p-2 bg-zinc-100'>
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className=' cursor-pointer'>
                                                <Minus className="w-3.5 h-3.5"/>
                                            </button>
                                            <span>
                                                {item.quantity}
                                            </span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className='cursor-pointer font-extrabold'>
                                                <Plus className="w-3.5 h-3.5 font-extrabold"/>
                                            </button>
                                        </div>
                                        <button onClick={() => {removeFromCart(item.id, item.category); console.log("item-id:",item.id,"item.category:", item.category) }} className="w-9 h-9 flex items-center justify-center hover:text-red-500 hover:bg-red-50 rounded-full text-zinc-400 transition-all cursor-pointer">
                                            <Trash className="w-5 h-5" size={20}/>
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                        <div>
                            <button className='underline hover:text-red-500 text-sm font-light cursor-pointer' onClick={clearCart}>Clear entire cart</button>
                        </div>
                    </div>
                    {/* order summary */}
                    <div className='bg-white rounded-2xl border border-zinc-100 p-6 h-fit sticky top-24 flex flex-col gap-8'>
                        <h2 className='font-extrabold text-[25px]'>Order Summary</h2>
                        <div className='flex justify-between items-center'>
                            <p>SubTotal :</p>
                            <p>{total.toFixed(2)}</p>
                        </div>
                        <Link href={"/checkout"} className='flex items-center justify-center text-center bg-pink-400 text-white font-bold cursor-pointer mt-2 rounded-2xl p-3'>
                            Checkout
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default page