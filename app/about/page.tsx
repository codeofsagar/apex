'use client';

import CinematicLayout from '@/components/CinematicLayout';
import ChromeText from '@/components/ui/ChromeText';
import FadeIn from '@/components/ui/FadeIn';

export default function AboutPage() {
    return (
        <CinematicLayout
            desktopImage="/about.png"
            mobileImage="/mobabout.png"
        >
            <div className="max-w-4xl mx-auto px-4 text-center space-y-12">
                <div className="w-full h-32 md:h-48 flex items-center justify-center mb-8 border-b border-white/10 pb-8">
                    <ChromeText
                        text="Why This Exists"
                        size={3}
                        mobileSize={1.5}
                        height={0.5}
                        autoFit={true}
                        letterSpacing={0.05}
                        envMapIntensity={1}
                        className="w-full h-full"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 text-left relative">
                    {/* Vertical Line Decoration */}
                    <div className="hidden md:block col-span-1 border-r border-white/10 h-full mx-auto" />

                    <div className="col-span-1 md:col-span-11 space-y-16">
                        <FadeIn delay={0.2}>
                            <h2 className="text-4xl md:text-6xl font-serif italic text-zinc-500 leading-tight">
                                <span className="text-white not-italic font-black uppercas block mb-2">The Problem</span>
                                "Most people fail because they drift."
                            </h2>
                        </FadeIn>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <FadeIn delay={0.4} className="space-y-6 text-lg text-zinc-300 leading-relaxed border-l-2 border-amber-500 pl-6">
                                <p>It starts small. A missed workout. A delayed launch. A compromise on your standard.</p>
                                <p>Then it compounds.</p>
                                <p>You forget the promises you made in the dark.</p>
                            </FadeIn>

                            <FadeIn delay={0.5} className="md:pt-12">
                                <p className="text-2xl font-bold text-white mb-4">You need a system that doesn't forget.</p>
                                <p className="text-zinc-400">Apex Companion AI was built to eliminate drift through memory, pattern detection, and adaptive accountability. It is not just a chatbot. It is a mirror.</p>
                            </FadeIn>
                        </div>
                    </div>
                </div>

                <FadeIn delay={0.6} className="pt-12">
                    <button className="mystic-button">
                        Request Access
                    </button>
                </FadeIn>
            </div>
        </CinematicLayout>
    );
}
