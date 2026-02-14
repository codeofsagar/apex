'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ChromeText from '@/components/ui/ChromeText';
import FadeIn from '@/components/ui/FadeIn';

gsap.registerPlugin(ScrollTrigger);

export default function ChooseYourMode() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to([".mode-title", ".mode-card"], {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out"
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const modes = [
        {
            title: "R-Rated Comedic Operator",
            description: "Brutally funny accountability. Calls out excuses with humor. Makes growth entertaining while still holding the line.",
            borderColor: "border-red-500/50",
            textColor: "text-red-400"
        },
        {
            title: "Military Savage",
            description: "Direct. Tactical. Structured. Clear expectations. No emotional padding. Execution-focused communication.",
            borderColor: "border-green-500/50",
            textColor: "text-green-400"
        },
        {
            title: "Chill Strategic",
            description: "Calm. Grounded. Intelligent. Stabilizes emotional spikes. Breaks complexity into clean next steps.",
            borderColor: "border-blue-500/50",
            textColor: "text-blue-400"
        }
    ];

    return (
        <section ref={sectionRef} className="py-24 px-4 relative z-30 ">
            <div className="max-w-6xl mx-auto">
                <div className="mode-title opacity-0 translate-y-12 flex flex-col items-center justify-center mb-16 relative h-32 md:h-40 w-full">
                    <ChromeText
                        text="CHOOSE YOUR MODE"
                        className="w-full h-full relative z-10"
                        size={2.6}
                        mobileSize={1.5}
                        height={0.5}
                        bevelSize={0.02}
                        bevelThickness={0.05}
                        letterSpacing={0.05}
                        envMapIntensity={1.2}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {modes.map((mode, index) => (
                        <FadeIn
                            key={index}
                            delay={index * 0.1}
                            className={`relative p-8 border ${mode.borderColor} bg-black/40 backdrop-blur-md hover:bg-zinc-900/60 transition-all duration-300 group`}
                        >
                            {/* Tech Header */}
                            <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                                <span className={`font-mono text-xs ${mode.textColor} uppercase tracking-widest opacity-70`}>MODE_0{index + 1}</span>
                                <div className={`w-2 h-2 rounded-full ${mode.textColor.replace('text-', 'bg-')}`} />
                            </div>

                            <h3 className={`text-2xl font-black mb-4 uppercase ${mode.textColor} tracking-tight`}>
                                {mode.title}
                            </h3>
                            <p className="text-zinc-400 font-light leading-relaxed min-h-[100px] whitespace-pre-line border-l-2 border-white/5 pl-4 group-hover:border-white/20 transition-colors">
                                {mode.description.replace(/\. /g, '.\n')}
                            </p>

                            <div className={`absolute bottom-0 left-0 w-full h-0.5 ${mode.textColor.replace('text-', 'bg-')} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
