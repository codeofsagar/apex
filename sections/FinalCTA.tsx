'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(contentRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 60%", // Start animating when section is 60% up the viewport
                        end: "center center",
                        toggleActions: "play none none reverse",
                        scrub: 1, // Smooth scrub like IntroSection
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="final-cta" ref={containerRef} className="relative min-h-screen w-full flex flex-col items-center justify-center bg-transparent text-center px-6 pointer-events-none">
            <div ref={contentRef} className="pointer-events-auto">
                <h2 className="text-4xl md:text-6xl font-bold mb-8 text-apex drop-shadow-lg">
                    Ready to stop building alone?
                </h2>
                <button className="mystic-button">
                    Request Access
                </button>
                <p className="mt-8 text-sm text-apex uppercase tracking-widest drop-shadow-md">
                    Join the Apex Ecosystem
                </p>
            </div>
        </section>
    );
}
