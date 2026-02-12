'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
    "It remembers your goals",
    "It understands how you think",
    "It keeps you from getting distracted",
    "It turns ideas into clear next steps",
    "It grows with you over time"
];

export default function WhyItIsDifferent() {
    const listRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        if (!listRef.current) return;

        const ctx = gsap.context(() => {
            const items = listRef.current?.querySelectorAll('li');

            if (items) {
                gsap.fromTo(items,
                    { opacity: 0, y: 50, filter: "blur(10px)" },
                    {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        duration: 0.8,
                        stagger: 0.2,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: listRef.current,
                            start: "top 70%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }
        }, listRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="section-2" className="relative min-h-screen flex flex-col items-center justify-center py-32 px-6 text-white pointer-events-none">
            <div className="max-w-4xl w-full mx-auto flex flex-col items-center text-center gap-20 pointer-events-auto">
                <div className="space-y-6">
                    <p className="text-sm md:text-base text-apex uppercase tracking-[0.3em] font-bold drop-shadow-md opacity-80">
                        Section 2 — Why It’s Different
                    </p>
                    <h2 className="text-5xl md:text-7xl font-bold leading-none drop-shadow-2xl text-apex">
                        Not Public AI.
                        <span className="block mt-4 text-3xl md:text-5xl opacity-90">Built around your world.</span>
                    </h2>
                </div>

                <ul ref={listRef} className="flex flex-col items-center space-y-12">
                    {features.map((feature, index) => (
                        <li key={index} className="text-2xl md:text-4xl font-light tracking-wide group relative">
                            {/* Mystic Glow behind text */}
                            <div className="absolute inset-0 bg-white/5 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700" />

                            {/* Text Content */}
                            <span className="relative z-10 transition-transform duration-500 group-hover:scale-105 inline-block text-apex">
                                {feature}
                            </span>

                            {/* Subtle separator line (except for last item) */}
                            {index !== features.length - 1 && (
                                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
