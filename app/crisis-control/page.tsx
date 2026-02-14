'use client';

import CinematicLayout from '@/components/CinematicLayout';
import ChromeText from '@/components/ui/ChromeText';
import FadeIn from '@/components/ui/FadeIn';

export default function CrisisControlPage() {
    const features = [
        "Interrupts emotional escalation.",
        "Simplifies decisions instantly.",
        "Restores cognitive clarity.",
        "Provides immediate execution steps."
    ];

    return (
        <CinematicLayout
            desktopImage="/conn.png"
            mobileImage="/conmob.png"
        >
            <div className="max-w-4xl mx-auto px-4 pb-24 text-center">
                <div className="w-full h-32 md:h-48 flex items-center justify-center mb-16 border-b border-red-900/30 pb-8">
                    <ChromeText
                        text="Stability Under Pressure"
                        size={2.5}
                        mobileSize={1.2}
                        height={0.5}
                        autoFit={true}
                        letterSpacing={0.02}
                        envMapIntensity={1}
                        className="w-full h-full"
                    />
                </div>

                <div className="relative flex flex-col items-center justify-center min-h-[600px]">
                    {/* Background Alert Pulse */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-[80vw] h-[80vw] md:w-[600px] md:h-[600px] bg-red-900/20 rounded-full blur-[120px] animate-pulse" />
                        <div className="absolute w-full h-px bg-red-500/30" />
                        <div className="absolute h-full w-px bg-red-500/30" />
                    </div>

                    <FadeIn delay={0.2} className="relative z-10 text-center space-y-12 max-w-2xl mx-auto">
                        <div className="inline-block border border-red-500/50 bg-red-900/20 px-4 py-1 rounded-full text-red-500 font-mono text-xs tracking-[0.3em] uppercase animate-pulse">
                            Warning: Drift Detected
                        </div>

                        <h2 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-black uppercase tracking-tighter leading-none">
                            Do Not<br />Hesitate
                        </h2>

                        <div className="grid grid-cols-2 gap-px bg-red-900/30 border border-red-500/20">
                            {features.map((feature, idx) => (
                                <div key={idx} className="p-6 text-center hover:bg-red-900/40 transition-colors">
                                    <p className="text-red-200 font-mono text-xs md:text-sm uppercase tracking-wide">
                                        {feature.replace('.', '')}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="pt-8">
                            <button className="relative group px-12 py-6 bg-red-600 hover:bg-red-500 text-black font-black uppercase tracking-widest text-lg transition-all clip-path-polygon-[10%_0,100%_0,100%_70%,90%_100%,0_100%,0_30%]">
                                <span className="relative z-10">Initiate Protocol</span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            </button>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </CinematicLayout>
    );
}
