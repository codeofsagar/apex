'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ChromeText from '@/components/ui/ChromeText';

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
            {/* ADD 'w-full' and 'flex-col items-center' here */}
            <div ref={contentRef} className="pointer-events-auto w-full flex flex-col items-center">

                <div className="w-full h-32 md:h-48 flex items-center justify-center mb-8">
                    <ChromeText
                        text="Ready to stop building alone?"
                        size={3}
                        mobileSize={1.5}
                        height={0.5}
                        // Ensure autoFit is true so it scales within the new full width
                        autoFit={true}
                        letterSpacing={0.05}
                        envMapIntensity={1}
                        className="w-full h-full"
                    />
                </div>

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
