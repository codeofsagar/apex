'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface DemoSectionProps {
    children: React.ReactNode;
}

export default function DemoSection({ children }: DemoSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null); // New ref for the scaled content

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax/Zoom effect for the background image
            // Phase 1 Zoom
            gsap.to(bgRef.current, { // Target inner content
                scale: 1.25,
                ease: "none",
                force3D: true,
                scrollTrigger: {
                    trigger: "#section-2",
                    start: "top bottom",
                    end: "center center",
                    scrub: 0.5,
                }
            });

            // Phase 2 Zoom (Deep Dive for Final CTA)
            gsap.to(bgRef.current, { // Target inner content
                scale: 2.0,
                ease: "none",
                force3D: true,
                immediateRender: false, // Prevent recording start value at scale: 1
                scrollTrigger: {
                    trigger: "#final-cta",
                    start: "top bottom",
                    end: "bottom bottom",
                    scrub: 0.5,
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full">
            {/* Sticky Image Container - This acts as the Mask/Viewport */}
            <div ref={imageRef} className="sticky top-0 h-screen w-full overflow-hidden z-0 will-change-transform">
                <div className="absolute inset-0 z-10" /> {/* Overlay for text readability */}

                {/* Scalable Inner Wrapper */}
                <div ref={bgRef} className="relative w-full h-full will-change-transform" />

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
