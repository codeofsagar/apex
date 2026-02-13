'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register standard GSAP plugins just in case, though mainly using core gsap here
gsap.registerPlugin(ScrollTrigger);

export default function CinematicIntro({ onComplete }: { onComplete: () => void }) {
    const [showButton, setShowButton] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const sequence = [
        "Most AI forgets you.",
        "This one remembers.",
        "It keeps you focused.",
        "It helps you move.",
        "Apex Companion AI."
    ];

    const handleEnter = () => {
        // Fade out
        gsap.to(containerRef.current, {
            opacity: 0,
            duration: 1.5,
            onComplete: onComplete
        });
    };

    useEffect(() => {
        // Safety timeout: Ensure button appears even if animation hangs
        const timer = setTimeout(() => setShowButton(true), 8000);

        // Animate text staggering in
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => setShowButton(true)
            });

            tl.fromTo(".intro-line",
                { opacity: 0, y: 20, filter: "blur(10px)" },
                {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: 1,
                    // Stagger removed so they appear together
                    ease: "power2.out"
                }
            );
        }, containerRef);

        return () => {
            ctx.revert();
            clearTimeout(timer);
        };
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center overflow-hidden">
            {/* Background Orb/Video */}
            <div className="absolute inset-0 z-0">
                {/* Desktop Video - Muted added for autoplay reliability */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="hidden md:block w-full h-full object-cover opacity-90 mix-blend-screen scale-110"
                >
                    <source src="/in.mp4" type="video/mp4" />
                </video>

                {/* Mobile Video */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="block md:hidden w-full h-full object-cover opacity-60 mix-blend-screen scale-110"
                >
                    <source src="/in.mp4" type="video/mp4" />
                </video>

                {/* Fallback/Overlay */}

            </div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-6 text-center space-y-8">

                <div className="flex flex-col items-center gap-4 w-full max-w-4xl mx-auto">
                    {sequence.map((line, index) => (
                        <div key={index} className="intro-line opacity-0 w-full flex items-center justify-center">
                            <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-zinc-300 uppercase tracking-tight drop-shadow-lg text-center">
                                {line}
                            </h2>
                        </div>
                    ))}
                </div>

                <div className={`transition-all duration-1000 ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <button
                        onClick={handleEnter}
                        className="mystic-button text-xl px-12 py-4"
                    >
                        [ ENTER ]
                    </button>
                </div>
            </div>
        </div>
    );
}
