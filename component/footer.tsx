'use client'
import React from 'react'
import { ArrowBigRight } from 'lucide-react'
import { useState } from 'react'
import { FaceSlightlySmiling } from 'lucide-react'

const Footer = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      setSubmitted(true);
    }
    console.log(data);

  };
  return (
    <div className="p-5 sm:p-8 md:p-10 bg-[#252b39] text-white">
      <div className="p-5 sm:p-8 md:p-10 lg:p-20">

        <span className="block text-sm sm:text-base md:text-lg font-bold tracking-widest">
          SUBSCRIBERS GET EARLY ACCESS 1 HOUR BEFORE EVERY RELEASE
        </span>

        <div className="mt-8 sm:mt-10">
          <form
            action=""
            className="flex w-full max-w-xl justify-between text-start border rounded-2xl overflow-hidden"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Email"
              className="min-w-0 flex-1 p-3 sm:p-4 md:p-5 outline-none text-base sm:text-lg md:text-2xl text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              className="shrink-0 px-4 sm:px-5 cursor-pointer"
              type="submit"
            >
              <ArrowBigRight />
            </button>
          </form>

          {submitted && (
            <div className="mt-5 flex flex-wrap gap-2 items-center">
              <p className="text-base sm:text-lg md:text-[20px] font-bold tracking-tighter text-pink-500 drop-shadow-[0_0_8px_#ffffff]">
                Thank you for subscribing
              </p>

              <FaceSlightlySmiling className="text-blue-500 shrink-0" />
            </div>
          )}
        </div>

        <hr className="mt-8 sm:mt-10" />

        <div className="mt-8 sm:mt-10 flex flex-wrap gap-x-4 gap-y-3 text-sm sm:text-base md:text-lg font-serif">
          <p>Haven</p>
          <p>.</p>
          <p>Privacy policy</p>
          <p>.</p>
          <p>Refund Policy</p>
          <p>.</p>
          <p>Terms of services</p>
          <p>.</p>
          <p>Shipping policies</p>
          <p>.</p>
          <p>Contact information</p>
        </div>

      </div>
    </div>
  )
}

export default Footer