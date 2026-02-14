'use client';

import CinematicLayout from '@/components/CinematicLayout';
import ChromeText from '@/components/ui/ChromeText';
import FadeIn from '@/components/ui/FadeIn';

export default function ArchetypePage() {
    const features = [
        "Archetype Identification",
        "Shadow Trait Detection",
        "Strength Mapping",
        "Blind Spot Awareness",
        "Identity Shift Tracking"
    ];

    return (
        <CinematicLayout
            desktopImage="/arc.png"
            mobileImage="/arcmob.png"
        >
            <div className="max-w-4xl mx-auto px-4 pb-24 text-center">
                <div className="mb-20 border-b border-white/10 pb-12">
                    <div className="w-full h-32 md:h-48 flex items-center justify-center mb-8 flex-col">
                        <ChromeText
                            text="Decode Your "
                            size={2.5}
                            mobileSize={1.9}
                            height={0.5}
                            autoFit={true}
                            letterSpacing={0.02}
                            envMapIntensity={1}
                            className="w-full h-full"
                        />
                        <ChromeText
                            text="Operating Pattern"
                            size={2.5}
                            mobileSize={1.9}
                            height={0.5}
                            autoFit={true}
                            letterSpacing={0.02}
                            envMapIntensity={1}
                            className="w-full h-full relative bottom-20 md:bottom-20"
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 relative">

                    {/* Background Tech Rings (Absolute Centered) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full opacity-20 animate-[spin_10s_linear_infinite]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-amber-500/10 rounded-full opacity-20 animate-[spin_15s_linear_infinite_reverse]" />

                    {/* Left Data Column */}
                    <div className="w-full md:w-1/3 space-y-8 text-right hidden md:block">
                        <FadeIn delay={0.2} className="space-y-2">
                            <h4 className="text-amber-500 font-mono text-xs tracking-widest uppercase">Analysis Protocol</h4>
                            <p className="text-zinc-400 text-sm">Deep scanning behavioral patterns.</p>
                            <div className="h-px w-full bg-gradient-to-l from-amber-500/50 to-transparent" />
                        </FadeIn>
                        <FadeIn delay={0.3} className="space-y-2">
                            <h4 className="text-amber-500 font-mono text-xs tracking-widest uppercase">Shadow Work</h4>
                            <p className="text-zinc-400 text-sm">Identifying hidden resistance.</p>
                            <div className="h-px w-full bg-gradient-to-l from-amber-500/50 to-transparent" />
                        </FadeIn>
                    </div>

                    {/* Central Hologram Core */}
                    <FadeIn delay={0.4} className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center shrink-0">
                        {/* Core Sphere */}
                        <div className="absolute inset-0 rounded-full border-2 border-amber-500/30 shadow-[0_0_50px_rgba(245,158,11,0.2)] animate-pulse" />
                        <div className="absolute inset-4 rounded-full border border-white/10 animate-[spin_4s_linear_infinite]" />
                        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-blue-500/10 rounded-full blur-xl" />

                        {/* Placeholder Icon / Avatar */}
                        <div className="relative z-10 text-center">
                            <div className="text-4xl font-black text-white mb-1">UNK</div>
                            <div className="text-[10px] font-mono text-amber-500 tracking-widest uppercase">Unidentified</div>
                        </div>

                        {/* Orbiting Nodes */}
                        <div className="absolute w-full h-full animate-[spin_8s_linear_infinite]">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-3 h-3 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
                        </div>
                    </FadeIn>

                    {/* Right Data Column */}
                    <div className="w-full md:w-1/3 space-y-6">
                        {features.map((feature, idx) => (
                            <FadeIn key={idx} delay={0.4 + (idx * 0.1)} className="group flex items-center gap-4 p-4 rounded-xl bg-black/40 border border-white/5 hover:border-amber-500/30 transition-all cursor-crosshair">
                                <div className="text-xs font-mono text-zinc-500 group-hover:text-amber-500 transition-colors">
                                    0{idx + 1}
                                </div>
                                <div className="text-zinc-300 font-light group-hover:text-white transition-colors">
                                    {feature}
                                </div>
                            </FadeIn>
                        ))}
                    </div>

                </div>
            </div>
        </CinematicLayout>
    );
}
