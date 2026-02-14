'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import ChromeText from '@/components/ui/ChromeText';
import FadeIn from '@/components/ui/FadeIn';

gsap.registerPlugin(ScrollTrigger);

export default function CrisisGuard() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Pulse effect for the "Red Button" vibe
            gsap.to(".crisis-bg", {
                boxShadow: "0 0 50px rgba(220, 38, 38, 0.2)",
                repeat: -1,
                yoyo: true,
                duration: 2
            });

            gsap.from(".crisis-text", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                },
                y: 30,
                opacity: 0,
                stagger: 0.1,
            });

        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-32 px-4  relative overflow-hidden">
            {/* Red ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-5xl mx-auto text-center crisis-bg p-8 md:p-16 rounded-3xl border border-red-900/30 bg-black/60 backdrop-blur-xl">
                {/* Protocol Header */}
                <div className="mb-12 flex items-center justify-center gap-4">
                    <div className="h-px w-16 bg-red-500/30" />
                    <span className="text-red-500 font-mono text-xs uppercase tracking-[0.3em] animate-pulse">Critical Protocol</span>
                    <div className="h-px w-16 bg-red-500/30" />
                </div>

                <div className="w-full h-32 md:h-48 mb-12 relative flex flex-col gap-0">
                    <ChromeText
                        text="WHEN YOU SPIRAL"
                        className="w-full h-full relative z-10"
                        size={1.9}
                        mobileSize={1.9}
                        height={0.6}
                        bevelSize={0.02}
                        bevelThickness={0.05}
                        letterSpacing={0.02}
                        envMapIntensity={1.0}
                        autoFit={true}
                    />
                    <ChromeText
                        text="IT STABILIZES"
                        className="w-full h-full relative z-10 bottom-20"
                        size={1.9}
                        mobileSize={1.5}
                        height={0.6}
                        bevelSize={0.02}
                        bevelThickness={0.05}
                        letterSpacing={0.02}
                        envMapIntensity={1.0}
                        autoFit={true}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 text-left max-w-3xl mx-auto">
                    {[
                        "Shrinks your focus to 1–3 immediate actions.",
                        "Interrupts emotional escalation in real-time.",
                        "Reframes catastrophic thinking instantly.",
                        "Restores logical execution under pressure."
                    ].map((text, idx) => (
                        <FadeIn key={idx} delay={0.2 + (idx * 0.1)} className="flex items-start gap-4 p-4 rounded-lg bg-red-500/5 border border-red-500/10 hover:bg-red-500/10 transition-colors">
                            <span className="text-red-500 text-xl">⚠</span>
                            <span className="text-zinc-300 font-light">{text}</span>
                        </FadeIn>
                    ))}
                </div>

                <div className="flex flex-col items-center gap-8 mt-8">
                    <FadeIn delay={0.6}>
                        <h3 className="text-2xl md:text-3xl text-white font-bold uppercase tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                            Stop Starting Over.
                        </h3>
                    </FadeIn>

                    <FadeIn delay={0.8}>
                        <Link href="/request-access">
                            <button className="mystic-button text-lg px-12 py-5 bg-red-900/20 border-red-500/50 hover:bg-red-900/40 hover:border-red-500 hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all duration-300">
                                ENTER APEX COMPANION AI
                            </button>
                        </Link>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
