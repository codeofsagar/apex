'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function IntroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const text1Ref = useRef<HTMLDivElement>(null);
    const text2Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !text1Ref.current || !text2Ref.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top", // When section hits top
                    end: "+=2000", // Pin for 2000px
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                }
            });

            // 1. Text 1 is initially visible.
            // Scroll -> Text 1 moves up and fades out.
            tl.to(text1Ref.current, {
                y: -100,
                opacity: 0,
                duration: 1,
                ease: "power2.inOut"
            })
                // 2. Text 2 moves in from bottom
                .to(text2Ref.current, {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out"
                }, "-=0.5"); // Overlap slightly or start after? "then next scroll it will go away to top and then Apex... will apear" -> Sounds sequenced.
            // Let's make it almost sequenced but smooth.

            // Hold Text 2 for a bit
            tl.to({}, { duration: 0.5 });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen flex items-center justify-center py-24 px-6 text-white overflow-hidden">
            <div className="relative w-full max-w-4xl mx-auto text-center h-[50vh] flex items-center justify-center">

                {/* Text 1: Most AI tools... */}
                <div ref={text1Ref} className="absolute inset-0 flex flex-col items-center justify-center space-y-6">
                    <p className="text-sm md:text-base text-gray-200 uppercase tracking-[0.2em] mix-blend-difference">
                        Section 1 — What This Is
                    </p>
                    <h2 className="text-3xl md:text-5xl font-light leading-tight text-white drop-shadow-md">
                        Most AI tools answer questions and <span className="font-bold">forget you five minutes later.</span>
                    </h2>
                </div>

                {/* Text 2: Apex Companion AI... */}
                <div ref={text2Ref} className="absolute inset-0 flex flex-col items-center justify-center space-y-8 opacity-0 translate-y-20">
                    <h3 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-linear-to-b from-white to-gray-300 drop-shadow-lg">
                        Apex Companion AI is different.
                    </h3>
                    <div className="space-y-4 text-xl md:text-2xl text-white font-medium max-w-2xl mx-auto drop-shadow-md">
                        <p>It stays with you.</p>
                        <p>It remembers what you’re building.</p>
                        <p>It helps you stay focused and move forward every day.</p>
                    </div>
                </div>

            </div>
        </section>
    );
}
