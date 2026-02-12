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
                    { opacity: 0, x: -50 },
                    {
                        opacity: 1,
                        x: 0,
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
        <section id="section-2" className="relative min-h-screen flex flex-col items-center justify-center py-24 px-6 text-white pointer-events-none">
            <div className="max-w-5xl w-full mx-auto grid md:grid-cols-2 gap-16 items-center pointer-events-auto">
                <div className="space-y-8">
                    <p className="text-sm md:text-base text-amber-400 uppercase tracking-[0.2em] font-bold drop-shadow-md">
                        Section 2 — Why It’s Different
                    </p>
                    <h2 className="text-5xl md:text-7xl font-bold leading-none drop-shadow-xl">
                        Not Public AI.<br />
                        <span className="text-gray-200 text-3xl md:text-5xl block mt-4">Built around your world.</span>
                    </h2>
                </div>

                <ul ref={listRef} className="space-y-8 bg-black/40 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-6 text-xl md:text-2xl text-white font-light group">
                            <span className="w-2 h-2 rounded-full bg-amber-500 group-hover:scale-150 transition-transform duration-300 shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
