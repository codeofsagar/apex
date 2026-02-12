'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface DemoSectionProps {
    children: React.ReactNode;
}

export default function DemoSection({ children }: DemoSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax/Zoom effect for the background image
            // "before section 2 comes the bg should zoomed in"
            gsap.to(imageRef.current, {
                scale: 1.25,
                ease: "none",
                scrollTrigger: {
                    trigger: "#section-2",
                    start: "top bottom", // When Section 2 starts entering
                    end: "center center", // When Section 2 is centered
                    scrub: 1.5, // Smooth scrubbing
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full">
            {/* Sticky Image Container */}
            <div ref={imageRef} className="sticky top-0 h-screen w-full overflow-hidden z-0">
                <div className="absolute inset-0 z-10" /> {/* Overlay for text readability */}

                {/* Desktop Demo */}
                <Image
                    src="/demo.png"
                    alt="Apex Companion Demo Desktop"
                    fill
                    className="hidden md:block object-cover"
                />

                {/* Mobile Demo */}
                <Image
                    src="/mobdemo.png"
                    alt="Apex Companion Demo Mobile"
                    fill
                    className="block md:hidden object-cover"
                />
            </div>

            {/* Scrolling Content - z-10 to be above image */}
            <div className="relative z-10 -mt-[100vh]">
                {/* 
                    We pull the content up to overlay the sticky image.
                    The container logic in page.tsx will handle the spacing/flow.
                 */}
                <div className="min-h-screen" /> {/* Spacer to let image arrive/settle if needed */}
                {children}
            </div>
        </section>
    );
}
