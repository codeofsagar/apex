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

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center overflow-hidden">
            {/* Background Orb/Video */}
            <div className="absolute inset-0 z-0">
                {/* Desktop Video - Muted removed for sound */}
                <video
                    autoPlay
                    loop
                    playsInline
                    className="hidden md:block w-full h-full object-cover opacity-60 mix-blend-screen scale-110"
                >
                    <source src="/intro.mp4" type="video/mp4" />
                </video>

                {/* Mobile Video */}
                <video
                    autoPlay
                    loop
                    playsInline
                    className="block md:hidden w-full h-full object-cover opacity-60 mix-blend-screen scale-110"
                >
                    <source src="/mobintro.mp4" type="video/mp4" />
                </video>

                {/* Fallback/Overlay */}
                <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-6 text-center space-y-16">

                <div className="flex flex-col items-center gap-2 md:gap-4">
                    {sequence.map((line, index) => (
                        <h2 key={index} className="intro-line text-xl md:text-3xl lg:text-5xl font-bold text-apex tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] opacity-0">
                            {line}
                        </h2>
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
