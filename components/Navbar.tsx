'use client';

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "Features", path: "/features" },
        { name: "How It Works", path: "/how-it-works" },
        { name: "Modes", path: "/modes" },
        { name: "Journal", path: "/journal" },
        { name: "Archetype", path: "/archetype" },
        { name: "Crisis Control", path: "/crisis-control" },
        { name: "Pricing", path: "/pricing" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-[100] flex items-center justify-between px-6 py-6 md:px-12 bg-transparent text-white mix-blend-difference pointer-events-auto">
                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-4 group relative z-[101]" onClick={() => setIsOpen(false)}>
                    {/* Stylized 'A' Logo */}
                    <div className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
                        <svg
                            viewBox="0 0 100 100"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            className="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                        >
                            <path d="M50 10 L90 90 L10 90 Z" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-serif text-2xl md:text-3xl tracking-tighter text-gray-200">A</span>
                        </div>
                    </div>

                    {/* Text Logo */}
                    <span className="font-serif text-lg md:text-xl tracking-[0.2em] text-apex uppercase font-bold">
                        APEX COMPANION AI
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-6 text-[10px] tracking-[0.15em] font-medium text-apex opacity-80">
                    {navLinks.map((item) => (
                        <Link
                            key={item.name}
                            href={item.path}
                            className="hover:text-white hover:scale-105 hover:[text-shadow:0_0_5px_rgba(255,255,255,1)] transition-all duration-300 uppercase"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden text-xs uppercase tracking-widest relative z-[101] p-2"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? 'Close' : 'Menu'}
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-[90] flex flex-col items-center justify-center transition-all duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className="flex flex-col items-center gap-8">
                    {navLinks.map((item, idx) => (
                        <Link
                            key={item.name}
                            href={item.path}
                            onClick={() => setIsOpen(false)}
                            className="text-2xl text-apex font-light uppercase tracking-widest hover:text-white hover:scale-110 hover:[text-shadow:0_0_5px_rgba(255,255,255,1)] transition-all duration-300"
                            style={{ transitionDelay: `${idx * 50}ms` }}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
