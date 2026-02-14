'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ChromeText from '@/components/ui/ChromeText';
import FadeIn from '@/components/ui/FadeIn';

gsap.registerPlugin(ScrollTrigger);

export default function IdentityLayer() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from([".identity-title", ".identity-feature"], {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out"
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const features = [
        {
            title: "Palm Reading Mode",
            description: "Upload your palm to receive a personality archetype breakdown and behavioral blind spot analysis.",
            icon: "✋"
        },
        {
            title: "Astrology Profile",
            description: "Enter birth date, time, and location for personality tendencies, emotional triggers, and decision timing insights.",
            icon: "✨"
        },
        {
            title: "Archetype Mapping",
            description: "Identifies whether you operate as Warrior, Builder, Visionary, Strategist, Performer, or Self-Saboteur — and adjusts accountability style.",
            icon: "🧬"
        },
        {
            title: "Identity Evolution",
            description: "Tracks how your behavioral identity shifts over time.",
            icon: "📈"
        }
    ];

    return (
        <section ref={sectionRef} className="py-24 px-4  relative overflow-hidden">
            <div className="w-full h-px bg-linear-to-r from-transparent via-amber-900/50 to-transparent my-8" />

            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-center justify-center mb-24">
                    <FadeIn className="w-full h-24 md:h-40 mb-6 relative">
                        <ChromeText
                            text="KNOW YOUR PATTERN"
                            className="w-full h-full relative z-10"
                            size={2.7}
                            mobileSize={1.8}
                            height={0.5}
                            bevelSize={0.02}
                            bevelThickness={0.05}
                            letterSpacing={0.05}
                            envMapIntensity={1.2}
                        />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <div className="flex items-center gap-4 px-6 py-2 border-y border-white/10 bg-black/70 backdrop-blur-sm">
                            <span className="text-zinc-500 text-xs font-mono uppercase tracking-[0.3em]">Identity Analysis Protocol</span>
                        </div>
                    </FadeIn>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <FadeIn
                            key={index}
                            delay={0.2 + (index * 0.1)}
                            className="group relative bg-black/70 border border-white/10 p-8 rounded-xl hover:bg-black/40 hover:border-amber-500/30 transition-all duration-500"
                        >
                            <div className="absolute top-4 right-4 text-xs font-mono text-zinc-600 group-hover:text-amber-500 transition-colors">0{index + 1}</div>

                            <div className="text-4xl mb-6 bg-black/30 w-16 h-16 flex items-center justify-center rounded-lg border border-white/5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                {feature.icon}
                            </div>

                            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-amber-100 transition-colors">{feature.title}</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed border-l-2 border-transparent group-hover:border-amber-500 pl-0 group-hover:pl-4 transition-all duration-300">
                                {feature.description}
                            </p>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
