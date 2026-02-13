'use client';

import CinematicLayout from '@/components/CinematicLayout';
import ChromeText from '@/components/ui/ChromeText';
import FadeIn from '@/components/ui/FadeIn';

const features = [
    { title: "Contextual Memory", desc: "It doesn't just store data; it remembers your life. Goals, constraints, and history.", size: "large" },
    { title: "Focus Engine", desc: "Filters the noise. Only presents what matters now.", size: "small" },
    { title: "Momentum Driver", desc: "Psychological triggers to keep you moving forward.", size: "small" },
    { title: "Action Translator", desc: "Turns abstract ideas into concrete execution steps instantly.", size: "tall" }, // Vertical
    { title: "Adaptive Growth", desc: "The system learns your velocity and adjusts to your pace.", size: "large" },
    { title: "Blindspot Detection", desc: "Identifies what you are ignoring before it becomes a problem.", size: "small" },
];

export default function FeaturesPage() {
    return (
        <CinematicLayout
            desktopImage="/op.png" // CHANGE THIS: "/features-bg.png"
            mobileImage="/mobop.png" // CHANGE THIS: "/features-mobile.png"
        >
            <div className="max-w-7xl mx-auto px-4 pb-24">
                <div className="mb-24 text-center md:text-left border-b border-white/10 pb-8">
                    <div className="w-full h-32 md:h-48 flex items-center justify-start mb-8">
                        <ChromeText
                            text="System Capabilities"
                            size={3}
                            mobileSize={1.5}
                            height={0.5}
                            autoFit={true}
                            letterSpacing={0.05}
                            envMapIntensity={1}
                            className="w-full h-full"
                        />
                    </div>
                    <FadeIn delay={0.2}>
                        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                            <p className="text-xl text-apex font-light max-w-xl text-left">
                                Beyond simple automation. A cognitive architecture designed for high-performance operators.
                            </p>
                            <div className="font-mono text-xs text-amber-500 uppercase tracking-widest">
                                /// ACCESSING MODULES...
                            </div>
                        </div>
                    </FadeIn>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[300px] gap-6">
                    {features.map((feature, idx) => (
                        <FadeIn
                            key={idx}
                            delay={idx * 0.1}
                            className={`
                                h-full
                                ${feature.size === 'large' ? 'md:col-span-2' : ''}
                                ${feature.size === 'tall' ? 'md:row-span-2' : ''}
                            `}
                        >
                            <div
                                className="h-full rounded-3xl overflow-hidden relative group transition-all duration-500 hover:scale-[1.02]"
                                style={{
                                    color: 'rgba(0, 0, 0, 0.72)',
                                    textDecoration: 'none',
                                    fontWeight: 'bold',
                                    textShadow: '1px 1px 0 #ffffff',
                                    boxShadow: '2px 2px 0.5em rgba(122, 122, 122, 0.55), inset 1px 1px 0 rgba(255, 255, 255, 0.9), inset -1px -1px 0 rgba(0, 0, 0, 0.5)',
                                    border: '1px solid #cacade',
                                    background: 'linear-gradient(-72deg, #dedeff, #ffffff 16%, #dedeff 21%, #ffffff 24%, #555564 27%, #dedeff 36%, #ffffff 45%, #ffffff 60%, #dedeff 72%, #ffffff 80%, #dedeff 84%, #555564)'
                                }}
                            >
                                {/* Chrome Shine Overlay Removed for Platinum Style */}

                                {/* Connector Lines - Adapted for light platinum background */}
                                <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-neutral-400 shadow-inner border border-white/50 group-hover:bg-amber-500 transition-colors duration-300" />
                                <div className="absolute top-4 right-10 text-[10px] font-mono opacity-60 font-bold group-hover:text-amber-600">SYS.0{idx + 1}</div>

                                <div className="p-8 h-full flex flex-col justify-end relative z-10">
                                    <h3 className="text-3xl md:text-4xl font-black uppercase leading-none mb-4 group-hover:translate-x-2 transition-transform duration-300 tracking-tighter" style={{ textShadow: '1px 1px 0 #ffffff' }}>
                                        {feature.title}
                                    </h3>
                                    <div className="h-1 w-12 bg-amber-500/80 mb-4 group-hover:w-full transition-all duration-700 mix-blend-multiply" />
                                    <p className="font-bold text-lg leading-relaxed" style={{ textShadow: '1px 1px 0 #ffffff' }}>
                                        {feature.desc}
                                    </p>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                <FadeIn delay={0.6} className="mt-16 text-center border-t border-white/10 pt-12">
                    <button className="mystic-button">
                        Full Spec Sheet
                    </button>
                </FadeIn>
            </div>
        </CinematicLayout>
    );
}
