'use client';

import CinematicLayout from '@/components/CinematicLayout';
import ChromeText from '@/components/ui/ChromeText';
import FadeIn from '@/components/ui/FadeIn';

export default function HowItWorksPage() {
    return (
        <CinematicLayout
            desktopImage="/howdesktop.png"
            mobileImage="/howmobile.png"
        >
            {/* Hero Section */}
            <div className="max-w-5xl mx-auto px-4 pb-24">
                <div className="w-full h-32 md:h-48 flex items-center justify-center mb-16 border-b border-white/10 pb-8">
                    <ChromeText
                        text="Five Layers of Behavioral Evolution"
                        size={3}
                        mobileSize={1.5}
                        height={0.5}
                        autoFit={true}
                        letterSpacing={0.02}
                        envMapIntensity={1}
                        className="w-full h-full"
                    />
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Central Timeline Line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-500/50 to-transparent" />

                    <div className="space-y-24">
                        {[
                            { step: "01", title: "Define Your Standard", desc: "You set the goal and the rule." },
                            { step: "02", title: "Build Behavioral Profile", desc: "The system analyzes tone, commitments, and patterns." },
                            { step: "03", title: "Daily Enforcement Loop", desc: "Check-ins activate. Accountability begins." },
                            { step: "04", title: "Pattern Recognition", desc: "Repeated behaviors are identified and mapped." },
                            { step: "05", title: "Evolutionary Shift", desc: "You stop drifting. You start operating." }
                        ].map((item, idx) => (
                            <FadeIn key={idx} delay={idx * 0.15} className="relative w-full flex items-center justify-between group">

                                {/* Timeline Node (Absolute Center) */}
                                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-black border-2 border-zinc-700 rounded-full z-10 group-hover:border-amber-500 group-hover:scale-125 transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                                    <div className="w-full h-full rounded-full bg-amber-500/0 group-hover:bg-amber-500 transition-colors duration-300" />
                                </div>

                                {/* Content Container */}
                                <div className={`flex flex-col md:flex-row w-full ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                                    {/* Text Content Side */}
                                    <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${idx % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'} space-y-2`}>
                                        <span className="text-amber-500 font-mono text-sm tracking-widest block mb-1">
                                            STEP {item.step}
                                        </span>
                                        <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-amber-500 transition-colors duration-300">
                                            {item.title}
                                        </h3>
                                        <p className="text-lg text-zinc-400 font-light">
                                            {item.desc}
                                        </p>
                                    </div>

                                    {/* Empty Spacer Side (for alternating effect) */}
                                    <div className="hidden md:block w-1/2" />
                                </div>
                            </FadeIn>
                        ))}
                    </div>

                    <FadeIn delay={1.2} className="mt-24 text-center">
                        <button className="mystic-button">
                            Initialize Protocol
                        </button>
                    </FadeIn>
                </div>
            </div>
        </CinematicLayout>
    );
}
