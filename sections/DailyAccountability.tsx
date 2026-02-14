'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ChromeText from '@/components/ui/ChromeText';
import FadeIn from '@/components/ui/FadeIn';

gsap.registerPlugin(ScrollTrigger);

export default function DailyAccountability() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    end: "bottom 80%",
                    scrub: 1,
                }
            });

            tl.from(".accountability-title", {
                opacity: 0,
                y: 30,
                duration: 0.8,
            });

            tl.from(".accountability-text", {
                opacity: 0,
                x: -50,
                stagger: 0.1,
            }, "-=0.4");

            tl.from(".integrity-point", {
                opacity: 0,
                x: 50,
                stagger: 0.1,
            }, "-=0.5");

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 px-4  relative overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                <div className="order-2 md:order-1 space-y-12">
                    <FadeIn className="w-full h-32 md:h-40 mb-8 relative">
                        <ChromeText
                            text="DAILY CHECK-IN LOOP"
                            className="w-full h-full relative z-10"
                            size={1.7}
                            mobileSize={1.4}
                            height={0.5}
                            bevelSize={0.02}
                            bevelThickness={0.05}
                            letterSpacing={0.02}
                            envMapIntensity={1.2}
                        />
                    </FadeIn>

                    <FadeIn delay={0.2} className="space-y-2">
                      
                        <div className="space-y-4">
                            {[
                                "What did you say you would do?",
                                "What actually happened?",
                                "Where did you drift?",
                                "What is tomorrow’s move?"
                            ].map((text, idx) => (
                                <div key={idx} className="group flex items-center gap-6 p-4 border-l-2 border-white/10 hover:border-amber-500 bg-black/55 hover:bg-black/10 transition-all duration-300">
                                    <span className="font-mono text-white/30 text-lg group-hover:text-amber-500">0{idx + 1}</span>
                                    <span className="text-xl md:text-2xl text-zinc-300 group-hover:text-white font-light">{text}</span>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>

                <FadeIn delay={0.4} className="order-1 md:order-2">
                    <div className="relative bg-black/40 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/10 overflow-hidden">
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />

                        <h3 className="text-sm font-mono text-zinc-500 mb-8 uppercase tracking-widest border-b border-white/10 pb-4 flex justify-between">
                            <span>System Analysis</span>
                            <span className="text-green-500">ACTIVE</span>
                        </h3>

                        <ul className="space-y-6">
                            {[
                                { text: "Calculates integrity score", color: "bg-green-500" },
                                { text: "Detects emotional trends", color: "bg-blue-500" },
                                { text: "Identifies avoidance patterns", color: "bg-purple-500" },
                                { text: "Builds behavioral map", color: "bg-red-500" }
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-center gap-4 text-zinc-300">
                                    <div className={`w-1.5 h-1.5 rounded-full ${item.color} shadow-[0_0_10px_currentColor]`} />
                                    <span className="font-light tracking-wide">{item.text}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Tech Footer */}
                        <div className="mt-8 pt-6 border-t border-white/5 flex gap-2">
                            <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full w-2/3 bg-amber-500/50 rounded-full" />
                            </div>
                            <div className="w-12 h-1 bg-white/10 rounded-full" />
                        </div>
                    </div>
                </FadeIn>

            </div>
        </section>
    );
}
