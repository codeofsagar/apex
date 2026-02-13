'use client';

import CinematicLayout from '@/components/CinematicLayout';
import ChromeText from '@/components/ui/ChromeText';
import FadeIn from '@/components/ui/FadeIn';

const useCases = [
    { title: "THE FOUNDER", subtitle: "Running at Redline" },
    { title: "THE CREATOR", subtitle: "Building Content Engines" },
    { title: "THE OPERATOR", subtitle: "Scaling Systems" },
    { title: "THE BUILDER", subtitle: "Launching New Verticals" },
    { title: "THE LONE WOLF", subtitle: "Doing Everything Alone" }
];

export default function UseCasesPage() {
    return (
        <CinematicLayout
            desktopImage="/op.png"
            mobileImage="/mobop.png"
        >
            <div className="w-full h-full flex flex-col justify-between pt-24 pb-12 px-4 md:px-12">
                <div className="mb-12 border-b border-white/20 pb-4 flex justify-between items-end">
                    <div className="w-full h-24 md:h-32 flex items-center justify-start max-w-2xl">
                        <ChromeText
                            text="Target Profiles"
                            size={2}
                            mobileSize={1}
                            height={0.5}
                            autoFit={true}
                            letterSpacing={0.05}
                            envMapIntensity={1}
                            className="w-full h-full"
                        />
                    </div>
                    <div className="text-xs text-white/50 font-mono">ID: TARGET_AUDIENCE</div>
                </div>

                <div className="flex-1 flex flex-col justify-center space-y-4">
                    {useCases.map((useCase, idx) => (
                        <FadeIn key={idx} delay={idx * 0.1} fullWidth>
                            <div className="group relative border-b border-white/10 pb-4 md:pb-8 transition-all duration-500 hover:border-amber-500/50 hover:pl-8 cursor-pointer">
                                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8">
                                    <span className="font-mono text-xs md:text-sm text-white/30 group-hover:text-amber-500 transition-colors">0{idx + 1}</span>
                                    <h2 className="text-4xl md:text-7xl lg:text-8xl font-black text-apex uppercase tracking-tighter opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                                        {useCase.title}
                                    </h2>
                                    <span className="text-lg md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-white opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 font-light italic">
                                        // {useCase.subtitle}
                                    </span>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                <FadeIn delay={0.8} className="pt-12 text-center md:text-right">
                    <button className="mystic-button">
                        Init Profile Scan
                    </button>
                </FadeIn>
            </div>
        </CinematicLayout>
    );
}
