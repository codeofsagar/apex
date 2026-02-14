'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ChromeText from '@/components/ui/ChromeText';
import FadeIn from '@/components/ui/FadeIn';

gsap.registerPlugin(ScrollTrigger);

export default function MemoryEngine() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".memory-content", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                },
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power2.out"
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-32 px-4 relative z-20  text-white overflow-hidden">
            {/* Background effect - maybe a subtle grid or neural network eventually */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
                <FadeIn className="w-full h-32 md:h-48 mb-8 relative">
                    <ChromeText
                        text="IT DOESN'T RESET"
                        className="w-full h-full relative z-10"
                        size={2.3}
                        mobileSize={1.6}
                        height={0.6}
                        bevelSize={0.03}
                        bevelThickness={0.08}
                        letterSpacing={0.05}
                        envMapIntensity={1.5}
                    />
                </FadeIn>

                <div className="space-y-12 max-w-4xl w-full">
                    <FadeIn delay={0.2}>
                        <p className="text-xl md:text-3xl text-zinc-200 font-light leading-relaxed">
                            Apex Companion AI remembers your goals, your commitments, your excuses, and your patterns.
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.4} className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                        {[
                            { title: "Behavioral Linking", desc: "Connects yesterday’s behavior to today’s decisions." },
                            { title: "Consistency Tracking", desc: "Tracks consistency over time, not just in the moment." },
                            { title: "Adaptive Response", desc: "Adapts tone and pressure based on your history." }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-black/55 border border-white/10 p-6 rounded-lg hover:bg-black/50 transition-colors duration-300">
                                <div className="text-amber-500 font-mono text-xs mb-3 tracking-widest uppercase">LOG_0{idx + 1}</div>
                                <h4 className="text-white font-bold text-lg mb-2">{item.title}</h4>
                                <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </FadeIn>

                    <FadeIn delay={0.6}>
                        <div className="inline-flex items-center gap-4 px-6 py-3 border border-zinc-800 rounded-full bg-black/40 backdrop-blur-md">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-zinc-300 font-mono text-sm uppercase tracking-wider">Memory Core Active</span>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
