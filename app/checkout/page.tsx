'use client'

import React from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import PaystackPop from "@paystack/inline-js";
import "react-toastify/dist/ReactToastify.css";
import { usecartStore } from '@/store/cartStore'

const page = () => {
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [amount, setAmount] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [streetAddress, setStreetAddress] = useState('');
    const [country, setCountry] = useState('');
    const [stateProvince, setStateProvince] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const { cartItem, cartTotal, cartCount } = usecartStore()
    const publickey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
    const total = cartTotal()

    const handleSubmit = () => {
        if (!publickey) {
            toast.error("paystack public key not set");
            return;
        }
        const paystack = new PaystackPop();
        paystack.newTransaction({
            email,
            amount: total * 100,
            key: publickey,
            metadata: {
                custom_fields: [
                    {
                        display_name: "First Name",
                        variable_name: "first_name",
                        value: firstName,
                    },
                    {
                        display_name: "Phone Number",
                        variable_name: "phone_number",
                        value: phoneNumber,
                    },
                ],
            },
            onSuccess: (transaction) => {
                toast.success("Payment confirmed ✅");
                console.log(transaction);
            },
            onCancel: () => {
                toast.error("payment cancelled ")
            },
            onError: (error) => {
                toast.error("Something went wrong with the payment ❌");
                console.log(error);
            },
        })
    }

    

    return (
        <div>
            <div className='mt-10 p-10 flex flex-1 mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-2'>

                    <div className='border-r p-10 text-[20px] text-zinc-500 md:pl-50'>
                        <div className='flex w-full'>
                            <form action="">
                                <div className='relative flex flex-col'>
                                    <input type="email" placeholder='' className='peer w-full border border-zinc-300 rounded p-3 pt-5 text-sm focus:border-black focus:outline-none transition-all' required value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <label htmlFor='Email' className='absolute left-3 top-3 text-xs text-zinc-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-black pointer-events-none' >Email Address</label>
                                </div>
                                <p className='text-red-300 mt-2'>We would send you order confirmation here.</p>
                            </form>
                        </div>
                        <hr className='mt-5' />
                        <div className='mt-5'>
                            <div className='w-full'>
                                <h1 className='font-serif font-bold text-[20px] text-black underline underline-offset-8 flex'>Shipping Address</h1>
                            </div>

                            <div className='mt-3'>
                                <div className='flex flex-col gap-5'>
                                    <form className='flex flex-col w-full max-w-lg mx-auto gap-4 p-4'>

                                        {/* First Name */}
                                        <div className='relative flex flex-col'>
                                            <input
                                                id='firstName'
                                                type='text'
                                                required
                                                placeholder=' '
                                                className='peer w-full border border-zinc-300 rounded p-3 pt-5 text-sm focus:border-black focus:outline-none transition-all'
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                            <label
                                                htmlFor='firstName'
                                                className='absolute left-3 top-3 text-xs text-zinc-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-black pointer-events-none'
                                            >
                                                First Name
                                            </label>
                                        </div>

                                        {/* Last Name */}
                                        <div className='relative flex flex-col'>
                                            <input
                                                id='lastName'
                                                type='text'
                                                required
                                                placeholder=' '
                                                className='peer w-full border border-zinc-300 rounded p-3 pt-5 text-sm focus:border-black focus:outline-none transition-all'
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                            <label
                                                htmlFor='lastName'
                                                className='absolute left-3 top-3 text-xs text-zinc-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-black pointer-events-none'
                                            >
                                                Last Name
                                            </label>
                                        </div>

                                        <h1 className='text-zinc-500 font-medium mt-2'>
                                            Street Address <span className='text-red-400 font-bold'>*</span>
                                        </h1>

                                        {/* Street Address Line 1 */}
                                        <div className='relative flex flex-col'>
                                            <input
                                                id='streetAddress'
                                                type='text'
                                                required
                                                placeholder=' '
                                                className='peer w-full border border-zinc-300 rounded p-3 pt-5 text-sm focus:border-black focus:outline-none transition-all'
                                                value={streetAddress}
                                                onChange={(e) => setStreetAddress(e.target.value)}
                                            />
                                            <label
                                                htmlFor='streetAddress'
                                                className='absolute left-3 top-3 text-xs text-zinc-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-black pointer-events-none'
                                            >
                                                Street Address: Line 1 <span className='text-red-400'>*</span>
                                            </label>
                                        </div>

                                        {/* Country */}
                                        <div className='relative flex flex-col'>
                                            <input
                                                id='country'
                                                type='text'
                                                required
                                                placeholder=' '
                                                className='peer w-full border border-zinc-300 rounded p-3 pt-5 text-sm focus:border-black focus:outline-none transition-all'
                                                value={country}
                                                onChange={(e) => setCountry(e.target.value)}
                                            />
                                            <label
                                                htmlFor='country'
                                                className='absolute left-3 top-3 text-xs text-zinc-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-black pointer-events-none'
                                            >
                                                Country <span className='text-red-400'>*</span>
                                            </label>
                                        </div>

                                        {/* State/Province */}
                                        <div className='relative flex flex-col'>
                                            <input
                                                id='stateProvince'
                                                type='text'
                                                required
                                                placeholder=' '
                                                className='peer w-full border border-zinc-300 rounded p-3 pt-5 text-sm focus:border-black focus:outline-none transition-all'
                                                value={stateProvince}
                                                onChange={(e) => setStateProvince(e.target.value)}
                                            />
                                            <label
                                                htmlFor='stateProvince'
                                                className='absolute left-3 top-3 text-xs text-zinc-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-black pointer-events-none'
                                            >
                                                State/Province <span className='text-red-400'>*</span>
                                            </label>
                                        </div>

                                        {/* City */}
                                        <div className='relative flex flex-col'>
                                            <input
                                                id='city'
                                                type='text'
                                                required
                                                placeholder=' '
                                                className='peer w-full border border-zinc-300 rounded p-3 pt-5 text-sm focus:border-black focus:outline-none transition-all'
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                            />
                                            <label
                                                htmlFor='city'
                                                className='absolute left-3 top-3 text-xs text-zinc-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-black pointer-events-none'
                                            >
                                                City <span className='text-red-400'>*</span>
                                            </label>
                                        </div>

                                        {/* Zip/Postal Code */}
                                        <div className='relative flex flex-col'>
                                            <input id='zipCode' type='number' required readOnly placeholder=' ' className='peer w-full border border-zinc-300 rounded p-3 pt-5 text-sm focus:border-black focus:outline-none transition-all' value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                                            <label
                                                htmlFor='zipCode'
                                                className='absolute left-3 top-3 text-xs text-zinc-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-black pointer-events-none'
                                            >
                                                Zip/Postal Code <span className='text-red-400'>*</span>
                                            </label>
                                        </div>

                                        {/* Phone Number */}
                                        <div className='relative flex flex-col'>
                                            <input
                                                id='phoneNumber'
                                                type='number'
                                                required
                                                readOnly
                                                placeholder=' '
                                                className='peer w-full border border-zinc-300 rounded p-3 pt-5 text-sm focus:border-black focus:outline-none transition-all'
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                            />
                                            <label
                                                htmlFor='phoneNumber'
                                                className='absolute left-3 top-3 text-xs text-zinc-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-black pointer-events-none'
                                            >
                                                Phone Number <span className='text-red-400'>*</span>
                                            </label>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <hr className='mt-10 w-full' />

                            <div className='mt-10'>
                                <h1 className='font-bold font-serif flex'>Payment method</h1>
                                <p className='font-light flex items-start'>All transaction are secure and encrypted.</p>


                                <div className="border rounded-2xl bg-white overflow-hidden font-sans shadow-sm mt-5">

                                    {/* <!-- Top Row: Gateway Name and Accepted Payment Icons --> */}
                                    <div className="flex items-center justify-between px-5 py-4 border-2 border-blue-600 ">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input type="radio" name="payment_gateway" value="paystack" checked className="w-4 h-4 text-blue-600 focus:ring-blue-500" />
                                            <span className="font-semibold text-gray-900">Paystack</span>
                                        </label>

                                        {/* <!-- Icons & Counter Badge --> */}
                                        <div className="flex items-center gap-2">
                                            {/* <!-- Mastercard Icon Example --> */}
                                            <img src="/mastercard.svg" alt="Mastercard" className="h-6 object-contain" />
                                            {/* <!-- Visa Icon Example --> */}
                                            <img src="/visa.svg" alt="Visa" className="h-6 object-contain" />
                                            {/* <!-- Local Card / Alternative Icon Example (e.g., paypal/Mtn) --> */}
                                            <img src="/paypal.svg" alt="Verve" className="h-6 object-contain" />
                                            {/* <!-- "+5" More Badge --> */}
                                            <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-1.5 py-1 rounded border border-gray-200">+5</span>
                                        </div>
                                    </div>

                                    {/* <!-- Bottom Row: Redirect Information Box --> */}
                                    <div className="bg-gray-50 border-t border-gray-200 px-5 py-3.5 text-center">
                                        <p className="text-sm text-gray-800 m-0">You'll be redirected to Paystack to complete your purchase</p>
                                    </div>
                                </div>
                                <div className='flex w-full mt-10 border'>
                                    <button className='p-4 px-4 font-bold bg-gray-500 text-white cursor-pointer flex w-full text-center items-center justify-center' onClick={handleSubmit} type='button'>Place Order</button>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className='md:pl-20w-full max-w-md mx-auto lg:max-w-none p-4 sm:p-6 lg:p-8 border border-zinc-200 rounded-xl bg-gray-50 space-y-6 h-fit sticky top-24 shadow-sm'>

                        {/* Title */}
                        <h2 className='text-lg font-semibold text-zinc-800 border-b border-zinc-200 pb-4'>
                            Order Summary
                        </h2>

                        {/* Cart Items List */}
                        <div className='space-y-4 max-h-72 overflow-y-auto pr-1'>
                            {cartItem.map((product) => (
                                <div key={product.id} className='flex items-center justify-between gap-4'>
                                    <div className='flex items-center gap-3 min-w-0'>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className='w-12 h-12 object-contain rounded-lg border border-zinc-200 bg-white flex-shrink-0 p-1'
                                        />
                                        <div className='min-w-0'>
                                            <p className='font-mono font-light text-sm text-zinc-800 truncate'>{product.name}</p>
                                            <p className='text-gray-500 text-xs'>Quantity: {product.quantity}</p>
                                        </div>
                                    </div>
                                    <div className='font-medium text-sm text-zinc-900 whitespace-nowrap'>
                                        ₦{Math.round(product.price)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Subtotal & Shipping Breakdown */}
                        <div className='border-t border-zinc-200 pt-4 space-y-3 text-sm text-zinc-600'>
                            <div className='flex justify-between items-center'>
                                <p>Subtotal ({cartCount} items)</p>
                                <p className='font-medium text-zinc-900'>₦{total}</p>
                            </div>

                            <div className='flex justify-between items-center'>
                                <p>Shipping fee</p>
                                <p className='text-xs text-zinc-500 italic'>Depends on the location</p>
                            </div>
                        </div>

                        {/* Final Total */}
                        <div className='border-t border-zinc-200 pt-4 flex justify-between items-center'>
                            <p className='font-bold text-lg sm:text-xl text-zinc-900'>Total</p>


                            <p className='font-bold text-lg sm:text-xl text-zinc-900 flex items-baseline gap-1'>
                                <span className='text-gray-400 font-light text-xs'>NGN</span>
                                <span>₦{total}</span>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default page