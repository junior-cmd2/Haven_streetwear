"use client";

import React, { useState } from "react";

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    const handleform = async (e: React.FormEvent) => {

        const response = await fetch("/api/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email, name, message
            }),
        });
        const data = await response.json();
        if (response.ok) {
            setName("");
            setEmail("");
            setMessage("");
        }
        console.log(data);

    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const target = e.currentTarget as any;

        const name = e.target.fullName.value;
        const email = e.target.email.value;
        const message = e.target.message.value;

        if (name && email && message) {
            setSubmitted(true);
            target.reset();
        }

        await handleform(e)
    };


    return (
        <div className="mx-auto max-w-4xl px-4 py-16 flex flex-col justify-center w-full min-h-[80vh]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                    <div>
                        <span className="text-2xl font-bold uppercase tracking-wider text-gray-700 bg-indigo-50 px-3 py-1 rounded-full">
                            Get in Touch
                        </span>
                        <h1 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-950">
                            We'd love to hear from you
                        </h1>
                        <p className="mt-3 text-zinc-500 text-2xl leading-relaxed">
                            Have questions about sizing, fabric weight, or returns? Our client experience team is ready to help.
                        </p>
                    </div>

                    <div className="space-y-4 border-t border-zinc-100 pt-6">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Email Us</p>
                            <p className="text-zinc-900 text-sm mt-0.5">support@haven_streetware.com</p>
                        </div>

                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Headquarters</p>
                            <p className="text-zinc-900 text-sm mt-0.5">85 Grand St, New York, NY 10013</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm">
                    {submitted ? (
                        <div className="text-center py-10 space-y-3">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 text-xl font-bold">
                                ✓
                            </div>
                            <h3 className="text-lg font-bold text-zinc-950">Message Sent!</h3>
                            <p className="text-zinc-500 text-xs max-w-xs mx-auto">
                                Thank you for reaching out. We will get back to you within 24 hours.
                            </p>
                            <button onClick={() => setSubmitted(false)} className="mt-2 rounded-xl border border-zinc-200 px-4 py-2 text-xs font-bold text-zinc-600 hover:bg-zinc-50 transition">
                                Send Another Message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <h3 className="text-2xl font-bold text-zinc-950 mb-2">Send a Message</h3>

                            <div>
                                <label className="block text-[15px] font-bold uppercase tracking-wider text-zinc-400">Your Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    required
                                    placeholder="Your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1.5 block w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-[15px] text-zinc-900 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-[15px] font-bold uppercase tracking-wider text-zinc-400">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="example@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1.5 block w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-[15px] text-zinc-900 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-[15px] font-bold uppercase tracking-wider text-zinc-400">Message</label>
                                <textarea
                                    name="message"
                                    rows={4}
                                    required
                                    placeholder="How can we help you?"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="mt-1.5 block w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-[15px] text-zinc-900 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none transition resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full text-center rounded-xl bg-zinc-950 py-3 px-4 text-sm font-bold text-white hover:bg-zinc-700 transition mt-4"
                            >
                                Send Message
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}