'use client'
import React from 'react'
import Link from 'next/link'
import { ShoppingBag, Search, X } from 'lucide-react'
import { allProducts } from '@/public/pictures/page'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { usecartStore } from '@/store/cartStore'


const Navbar = () => {

    const [search, setSearch] = useState(false)
    const [menu, setMenu] = useState(false)
    const [searchFind, setSearchFind] = useState("")
    const pathname = usePathname()
    const {cartCount} = usecartStore()
    const isZero = cartCount == 0 ? false : true

    function openSearch() {
        setSearch(!search);
        setSearchFind("");
    }
    function openMenu() {
        setMenu(!menu)
    }

    function searchMaterial(e: any) {
        e.preventDefault()
        let value = searchFind.trim()
        if (value = "") {
            setSearchFind("");
            return
        }
        setSearchFind(value)
    }

    useEffect(() => {
        if (search) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [search]);

    useEffect(() => {
        setSearch(false);
        setSearchFind("");
    }, [pathname])


    const filterProducts = allProducts.filter((product) => product.name.toLowerCase().includes(searchFind.toLowerCase()))
    console.log("ALL PRODUCTS:", allProducts);
    console.log("FILTERED PRODUCTS:", filterProducts);

    return (
        <header className='fixed top-0 left-0 w-full z-50'>
            <div className='bg-[#252b39] px-4 py-5 sm:px-6 md:p-10 flex justify-between text-white items-center'>

                {/* logo name */}
                <div>
                    <Link href={"/"} className='text-white font-bold text-sm sm:text-base md:text-lg'>
                        <span>HAVEN_STREETWEAR</span>
                    </Link>
                </div>

                {/* links */}
                <div className='hidden items-center gap-20 font-bold md:flex'>
                    <Link href={"/"} className={`hover:underline hover:underline-offset-6 hover:decoration-3 ${pathname === "/" ? 'underline underline-offset-8 decoration-2': ''}`}>HOME</Link>
                    <Link href={""} className={`hover:underline hover:underline-offset-6 hover:decoration-3 ${pathname === "/gallery" ? 'underline underline-offset-8 decoration-2': ''}`}>GALLERY</Link>
                    <Link href={"/contact"} className={`hover:underline hover:underline-offset-6 hover:decoration-3 ${pathname === "/contact" ? 'underline underline-offset-8 decoration-2': ''}`}>CONTACT US</Link>
                </div>

                {/* Search, shopping bag, hambuger toggle */}
                <div className='flex items-center gap-4 sm:gap-6'>
                    <button className='cursor-pointer'><Search size={25} onClick={openSearch} /></button>
                    <Link href={'/cart'} className='relative flex items-center justify-center rounded-full border border-zinc-200 bg-white p-1' >
                        <ShoppingBag size={25} color='black' className='h-5 w-5 sm:h-6 sm:w-6'/>
                        {
                            isZero && <span className='absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white  ring-1 ring-white text-[9px] text-black sm:h-5 sm:w-5 sm:text-[10px]'>{cartCount}</span>
                        }
                    </Link>
                    {/* Mobile Menu Hamburger Button */}
                    <button onClick={openMenu} className="flex flex-col justify-between w-6 h-5 md:hidden cursor-pointer group ml-2">
                        {/* Top Line */}
                        <span className={`w-full h-0.5 bg-white rounded-lg transition-all duration-300 origin-left ${menu ? 'rotate-54 translate-x-1' : ''}`} />
                        {/* Middle Line */}
                        <span className={`w-full h-0.5 bg-white rounded-lg transition-all duration-300 ${menu ? 'opacity-0 scale-0' : ''}`} />
                        {/* Bottom Line */}
                        <span className={`w-full h-0.5 bg-white rounded-lg transition-all duration-300 origin-left ${menu ? '-rotate-54 translate-x-1' : ''}`} />
                    </button>
                </div>

                {search && (
                    <div className="fixed inset-0 z-90 bg-black/30 backdrop-blur-xs" onClick={openSearch} />
                )}


                {/* For the search bottom */}
                <div className={`bg-white p-5 z-100 fixed w-full  left-0 right-0 mx-auto text-black transition-all duration-700 ease-in-out flex items-center justify-center ${search ? "top-[1px]" : "top-[-100%]"}`}>
                    <form action="submit" className='flex items-start border border-zinc-400 p-5 rounded-2xl text-black max-w-7xl w-full focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 transition' onSubmit={searchMaterial}>
                        <input
                            type="text"
                            placeholder='What are you looking for ?'
                            className='text-base w-full focus:outline-none md:text-[20px] '
                            value={searchFind}
                            onChange={(e) => { setSearchFind(e.target.value) }}
                        />
                        <div className="flex gap-10">
                            <button className=" cursor-pointer" type="submit">
                                <Search />
                            </button>
                        </div>
                    </form>
                    <button type="button" className=" cursor-pointer ml-5" onClick={openSearch}>
                        <X size={30} />
                    </button>
                </div>
            </div>
            {
                searchFind !== "" && (
                    <div className='fixed top-[100px] left-0 right-0 z-[100] bg-white text-black p-5 max-h-[60vh] overflow-y-auto'>
                        {filterProducts.length > 0 ? (
                            <div className='grid grid-cols-2 gap-5 max-w-7xl mx-auto'>
                                {filterProducts.map((products: any) => (
                                    <Link href={`/products/${products.category}/${products.id}`} key={`${products.category}-${products.id}`} className='flex flex-col md:flex-row items-center justify-center bg-white' onClick={openSearch}>
                                        <img src={products.image} alt={products.name} className="w-32 h-32 object-cover" />
                                        <p className='font-serif'>{products.name}</p>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className='text-center text-2xl'>No product found</div>
                        )}
                    </div>
                )
            }

            {/* Hambuger contexts */}
            <div className={`w-full h-screen bg-white text-black top-[65px] fixed z-[60] transition-transform duration-400 ease-in-out ${menu ? "translate-x-0" : "translate-x-full"}`}>
                <div className='flex flex-col gap-5 pt-5 px-3'>
                    <Link href={"/"} className={`p-3 ${pathname === "/" ? 'bg-gray-100 ' : ''}`}>HOME</Link>
                    <Link href={"/gallery"} className={`p-3 ${pathname === "/gallery" ? 'bg-gray-100' : ''}`}>GALLERY</Link>
                    <Link href={"/contact"} className={`p-3 ${pathname === "/contact" ? 'bg-gray-100' : ''}`}>CONTACT US</Link>
                </div>
            </div>
        </header>
    )
}
export default Navbar
