'use client';

import CinematicLayout from '@/components/CinematicLayout';
import ChromeText from '@/components/ui/ChromeText';
import FadeIn from '@/components/ui/FadeIn';

const features = [
    { title: "Persistent Memory Architecture", desc: "Long-term behavioral storage. Promise recall. Goal tracking. Context-aware responses.", size: "large" },
    { title: "Accountability Escalation", desc: "Detects repeated avoidance. References prior commitments. Adjusts tone if drift continues. Prevents silent quitting.", size: "tall" },
    { title: "Pattern Detection Engine", desc: "Identifies quitting cycles. Detects overcommitment behavior. Recognizes emotional spikes. Predicts sabotage points.", size: "large" },
    { title: "Emotional Calibration", desc: "Reads tone shifts. Adjusts delivery intensity. Reduces overwhelm. Stabilizes reaction patterns.", size: "small" },
    { title: "Behavioral Heat Mapping", desc: "Tracks consistency over time. Highlights weak zones. Surfaces growth streaks. Displays integrity trends.", size: "small" },
    { title: "Crisis Guard System", desc: "Shrinks decision scope. Eliminates cognitive overload. Stabilizes nervous system responses. Guides back to execution.", size: "small" },
];

export default function FeaturesPage() {
    return (
        <CinematicLayout
            desktopImage="/featuresdesktop.png"
            mobileImage="/featuremob.png"
        >
            <div className="max-w-7xl mx-auto px-4 pb-24">
                <div className="mb-24 text-center md:text-left border-b border-white/10 pb-8">
                    <div className="w-full h-32 md:h-48 flex items-center justify-start mb-8 flex-col">
                        <ChromeText
                            text="The Behavioral"
                            size={2.3}
                            mobileSize={1.6}
                            height={0.5}
                            autoFit={false}
                            letterSpacing={0.02}
                            envMapIntensity={1}
                            className="w-full h-full"
                        />
                        <ChromeText
                            text="Operating System"
                            size={2.3}
                            mobileSize={1.6}
                            height={0.5}
                            autoFit={false}
                            letterSpacing={0.02}
                            envMapIntensity={1}
                            className="w-full h-full bottom-20 relative"
                        />
                    </div>
                    <FadeIn delay={0.2}>
                        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                            <p className="text-xl text-apex font-light max-w-xl text-left">
                                This is evolving intelligence — not session-based chat.
                            </p>
                            <div className="font-mono text-xs text-amber-500 uppercase tracking-widest">
                                /// ACCESSING MODULES...
                            </div>
                        </div>
                    </FadeIn>
                </div>

                {/* Cinematic Data Stream Layout */}
                <div className="w-full flex flex-col">
                    <div className="w-full h-px bg-white/20 mb-12" />

                    {features.map((feature, idx) => (
                        <FadeIn key={idx} delay={idx * 0.1} className="group relative border-b border-white/10 transition-colors duration-500 hover:border-amber-500/50 hover:bg-white/5">
                            <div className="py-12 md:py-16 px-4 md:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

                                {/* Index & ID */}
                                <div className="hidden md:flex flex-col items-start gap-2 w-32 shrink-0 opacity-50 group-hover:opacity-100 transition-opacity">
                                    <span className="font-mono text-xs text-amber-500">SYS.0{idx + 1}</span>
                                    <span className="font-mono text-[10px] text-zinc-500 uppercase">ID: {feature.title.split(' ')[0]}_{idx}</span>
                                </div>

                                {/* Main Title */}
                                <h3 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter transition-all duration-500 group-hover:translate-x-4">
                                    {feature.title}
                                </h3>

                                {/* Mobile Interaction Hint */}
                                <div className="md:hidden text-amber-500 text-sm font-mono">+ DETAILS</div>

                                {/* Hover Reveal Content (Desktop) */}
                                <div className="hidden md:block w-[400px] opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-8 group-hover:translate-x-0">
                                    <p className="text-zinc-300 text-lg leading-relaxed border-l-2 border-amber-500 pl-6">
                                        {feature.desc}
                                    </p>
                                    <div className="mt-4 flex gap-4 pl-6">
                                        <div className="px-2 py-1 bg-amber-500/10 border border-amber-500/20 rounded text-[10px] font-mono text-amber-500 uppercase">
                                            Status: Active
                                        </div>
                                        <div className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-mono text-zinc-400 uppercase">
                                            Priority: High
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Expanded Overlay */}
                            <div className="md:hidden h-0 overflow-hidden group-hover:h-auto group-active:h-auto transition-all">
                                <div className="pb-8 px-4">
                                    <p className="text-zinc-400 text-base leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </div>
                            </div>
                        </FadeIn>
                    ))}

                    <div className="w-full h-px bg-white/20 mt-12" />
                </div>

                <FadeIn delay={0.6} className="mt-16 text-center border-t border-white/10 pt-12">
                    <button className="mystic-button">
                        Initialize System
                    </button>
                </FadeIn>
            </div>
        </CinematicLayout>
    );
}
