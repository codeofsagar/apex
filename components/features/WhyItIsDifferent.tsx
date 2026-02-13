'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ChromeText from '@/components/ui/ChromeText';

gsap.registerPlugin(ScrollTrigger);

const features = [
    "It remembers your goals",
    "It understands how you think",
    "It keeps you from getting distracted",
    "It turns ideas into clear next steps",
    "It grows with you over time"
];

export default function WhyItIsDifferent() {
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!listRef.current) return;

        const ctx = gsap.context(() => {
            // Animate the entire block since it's now a single 3D object
            gsap.fromTo(listRef.current,
                { opacity: 0, y: 50, filter: "blur(10px)" },
                {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: listRef.current,
                        start: "top 70%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }, listRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="section-2" className="relative min-h-screen flex flex-col items-center justify-center py-32 px-6 text-white pointer-events-none">
            <div className="max-w-4xl w-full mx-auto flex flex-col items-center text-center gap-20 pointer-events-auto">
                <div className="space-y-6">
                    <p className="text-sm md:text-base text-apex uppercase tracking-[0.3em] font-bold drop-shadow-md opacity-80">
                        Why It’s Different
                    </p>
                    <div className="w-full h-32 flex items-center justify-center">
                        <ChromeText
                            text="NOT PUBLIC AI"
                            size={1.6}
                            height={0.1}
                            letterSpacing={0.05}
                            envMapIntensity={1}
                            className="w-full h-full"
                        />
                    </div>
                    <div className="w-full flex items-center justify-center -mt-8">
                        <h3 className="text-2xl md:text-4xl text-zinc-300 font-bold uppercase tracking-wide text-center drop-shadow-lg mt-4">
                            BUILT AROUND YOUR WORLD
                        </h3>
                    </div>
                </div>

                <div ref={listRef} className="flex flex-col items-center space-y-6 w-full max-w-2xl">
                    <ul className="flex flex-col items-center gap-4 text-center">
                        {features.map((feature, index) => (
                            <li key={index} className="text-xl md:text-2xl text-zinc-300 font-medium tracking-wide py-2 border-b border-zinc-500/20 w-full">
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
