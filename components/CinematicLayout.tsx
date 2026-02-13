'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ThreeClouds from '@/sections/ThreeClouds';
import LightningOverlay from '@/sections/LightningOverlay';

interface CinematicLayoutProps {
    children: React.ReactNode;
    desktopImage?: string;
    mobileImage?: string;
}

export default function CinematicLayout({
    children,
    desktopImage = "/op.png", // Default to Hero image if not provided
    mobileImage = "/mobop.png"
}: CinematicLayoutProps) {
    const bgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Slow cinematic zoom loop
        // Scale from 1.0 to 1.15 over 20 seconds, endlessly loop with yoyo
        const ctx = gsap.context(() => {
            gsap.to(bgRef.current, {
                scale: 1.15,
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
            {/* Orb Video - Fixed Top Center (Same as Hero) */}
            <div className="orb-container fixed md:ml-6 ml-3 top-70 md:top-40 left-1/2 -translate-x-1/2 z-[0] pointer-events-none mix-blend-screen opacity-60">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="orb-video md:w-[500px] w-[800px] scale-250 md:scale-100 h-auto object-cover blur-md contrast-125"
                >
                    <source src="/orb.mp4" type="video/mp4" />
                </video>
            </div>

            {/* 3D Cloud Animation Layer - z-0 */}
            <div id="cloud-layer" className="fixed inset-0 z-0 scale-150 pointer-events-none">
                <ThreeClouds />
                <LightningOverlay />
            </div>

            {/* Background Image Layer with Zoom */}
            <div className="fixed inset-0 z-10 pointer-events-none w-full h-full">
                <div ref={bgRef} className="relative w-full h-full will-change-transform">
                    {/* Desktop Background */}
                    <Image
                        src={desktopImage}
                        alt="Background"
                        fill
                        className="hidden md:block object-cover opacity-60"
                        priority
                    />
                    {/* Mobile Background */}
                    <Image
                        src={mobileImage}
                        alt="Background"
                        fill
                        className="block md:hidden object-cover opacity-60"
                        priority
                    />
                </div>
            </div>

            {/* Static Gradient Overlay for Text Readability - z-15 */}
            <div className="fixed inset-0 z-15 bg-gradient-to-b from-black/60 via-black/20 to-black/90 pointer-events-none" />

            {/* Content Container - z-20 */}
            <div className="relative z-20 w-full min-h-screen flex flex-col items-center pt-32 pb-24 px-6 md:px-12">
                {children}
            </div>
        </main>
    );
}
