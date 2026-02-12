'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

interface CinematicLayoutProps {
    children: React.ReactNode;
}

export default function CinematicLayout({ children }: CinematicLayoutProps) {
    const bgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Slow cinematic zoom effect
        // Scale from 1.0 to 1.1 over 20 seconds, creating a subtle breathing motion
        const ctx = gsap.context(() => {
            gsap.to(bgRef.current, {
                scale: 1.1,
                duration: 20,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
            });
        }, bgRef);

        return () => ctx.revert();
    }, []);

    return (
        <main className="relative min-h-screen w-full overflow-hidden bg-black text-white selection:bg-amber-500/30">
            {/* Background Layer with Zoom */}
            <div ref={bgRef} className="absolute inset-0 z-0 will-change-transform">
                <Image
                    src="/hero.png"
                    alt="Background"
                    fill
                    className="object-cover opacity-40"
                    priority
                />
            </div>

            {/* Static Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-black/20 to-black/90 pointer-events-none" />

            {/* Orb Light Overlay - Centered and ethereal */}
            <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] opacity-30 pointer-events-none z-0 mix-blend-screen">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover blur-xl"
                >
                    <source src="/orb.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Content Container */}
            <div className="relative z-20 w-full min-h-screen flex flex-col items-center pt-32 pb-24 px-6 md:px-12">
                {children}
            </div>
        </main>
    );
}
