'use client';

import { useRef, useEffect } from 'react';
import ChromeText from '@/components/ui/ChromeText';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function IntroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const text1Ref = useRef<HTMLDivElement>(null);
    const text2Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // ... existing useEffect code ...
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen flex items-center justify-center py-24 px-6 text-white overflow-hidden">
            <div className="relative w-full max-w-4xl mx-auto text-center h-[50vh] flex items-center justify-center">

                {/* Text 1: Most AI tools... */}
                <div ref={text1Ref} className="absolute inset-0 flex flex-col items-center justify-center space-y-6">
                    <div className="w-full flex items-center justify-center">
                        <p className="text-sm md:text-base text-apex uppercase tracking-[0.3em] font-bold drop-shadow-md opacity-80">
                            SECTION 1 — WHAT THIS IS
                        </p>
                    </div>
                    <div className="w-full flex flex-col items-center justify-center space-y-2">
                        <h2 className="text-3xl md:text-5xl text-zinc-300 font-bold uppercase tracking-wide text-center drop-shadow-lg">
                            Most AI tools answer questions
                        </h2>
                        <h2 className="text-3xl md:text-5xl text-zinc-300 font-bold uppercase tracking-wide text-center drop-shadow-lg">
                            and forget you 5 mins later
                        </h2>
                    </div>
                </div>

                {/* Text 2: Apex Companion AI... */}
                <div ref={text2Ref} className="absolute inset-0 flex flex-col items-center justify-center space-y-8 opacity-0 translate-y-20">
                    <div className="w-full h-48 flex items-center justify-center">
                        <ChromeText
                            text="APEX IS DIFFERENT"
                            size={0.8}
                            height={0.2}
                            mobileSize={0.4}
                            letterSpacing={0.05}
                            envMapIntensity={1}
                            className="w-full h-full"
                        />
                    </div>
                    {/* Keep body text as standard HTML for readability/layout reasons */}
                    <div className="space-y-4 text-xl md:text-2xl text-zinc-300 font-medium max-w-3xl mx-auto drop-shadow-md flex flex-col items-center text-center leading-relaxed">
                        <p>IT STAYS WITH YOU.</p>
                        <p>IT REMEMBERS WHAT YOU'RE BUILDING.</p>
                        <p>IT HELPS YOU STAY FOCUSED AND MOVE FORWARD EVERY DAY.</p>
                    </div>
                </div>

            </div>
        </section>
    );
}
