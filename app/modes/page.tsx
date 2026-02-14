'use client';

import CinematicLayout from '@/components/CinematicLayout';
import ChromeText from '@/components/ui/ChromeText';
import FadeIn from '@/components/ui/FadeIn';

export default function ModesPage() {
    const modes = [
        {
            title: "R-Rated Comedic Operator",
            tags: ["Savage Humor", "Zero Fluff"],
            desc: "Cuts through excuses with precision and comedy. It doesn't just tell you what to do; it mocks your hesitation until you do it.",
            color: "text-red-400",
            borderColor: "border-red-500/30"
        },
        {
            title: "Military Savage",
            tags: ["Structured", "Tactical", "Direct"],
            desc: "Built for discipline and execution. No emotion, just mission parameters and success metrics. For when you need to be a weapon.",
            color: "text-green-400",
            borderColor: "border-green-500/30"
        },
        {
            title: "Chill Strategic",
            tags: ["Calm", "Visionary", "Grounded"],
            desc: "Stabilizes the chaos. Helps you map out the long game with a clear head. The voice of reason in the storm.",
            color: "text-blue-400",
            borderColor: "border-blue-500/30"
        }
    ];

    return (
        <CinematicLayout
            desktopImage="/moddesktop.png"
            mobileImage="/modmobile.png"
        >
            <div className="max-w-7xl mx-auto px-4 pb-24">
                <div className="w-full h-40 md:h-56 flex items-center justify-center mb-16 border-b border-white/10 pb-8">
                    <ChromeText
                        text="Three Personalities. One Intelligence."
                        size={2.5}
                        mobileSize={1.2}
                        height={0.5}
                        autoFit={true}
                        letterSpacing={0.02}
                        envMapIntensity={1.2}
                        className="w-full h-full"
                    />
                </div>

                <div className="flex flex-col md:flex-row items-stretch justify-center h-[1200px] md:h-[600px] gap-4 md:gap-0">
                    {modes.map((mode, idx) => (
                        <FadeIn key={idx} delay={idx * 0.2} className="h-full flex-1 min-w-[300px] transition-all duration-700 ease-out hover:flex-[1.5] group relative">
                            <div className={`
                                h-full p-8 md:p-12 relative overflow-hidden rounded-3xl md:rounded-none
                                bg-black/40 backdrop-blur-md border border-white/5 
                                hover:bg-black/80 transition-all duration-500 flex flex-col justify-between
                                ${idx === 0 ? 'md:rounded-l-3xl' : ''}
                                ${idx === modes.length - 1 ? 'md:rounded-r-3xl' : ''}
                                ${mode.borderColor} hover:border-opacity-100 border-opacity-20
                            `}>
                                {/* Background Glow */}
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-gradient-to-b from-transparent via-${mode.color.split('-')[1]}-500/10 to-transparent`} />

                                {/* Header Content */}
                                <div className="space-y-6 relative z-10">
                                    <h3 className={`text-4xl md:text-5xl font-black uppercase leading-none tracking-tighter ${mode.color} transition-transform duration-500 group-hover:scale-110 origin-left`}>
                                        {mode.title}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {mode.tags.map((tag, i) => (
                                            <span key={i} className="text-[10px] md:text-xs uppercase tracking-widest px-3 py-1 border border-white/10 rounded-full text-zinc-400 group-hover:text-white group-hover:border-white/40 transition-colors">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Divider Line */}
                                <div className="w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-auto my-8 group-hover:via-white/50 transition-all duration-500" />

                                {/* Description */}
                                <div className="relative z-10">
                                    <p className="text-zinc-400 font-medium leading-relaxed group-hover:text-zinc-100 transition-colors duration-500">
                                        {mode.desc}
                                    </p>
                                </div>

                                {/* Hover Button/Call to Action */}
                                <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 transform translate-y-4 group-hover:translate-y-0">
                                    <div className={`w-12 h-12 rounded-full border border-white/20 flex items-center justify-center ${mode.color}`}>
                                        <div className="w-2 h-2 bg-current rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                <FadeIn delay={0.8} className="mt-24 text-center">
                    <p className="text-zinc-500 mb-8 max-w-2xl mx-auto">
                        Apex adapts to your psychological state. You don't just choose a mode; the system learns which one triggers your best performance.
                    </p>
                    <button className="mystic-button">
                        Initialize Pattern Analysis
                    </button>
                </FadeIn>
            </div>
        </CinematicLayout>
    );
}
