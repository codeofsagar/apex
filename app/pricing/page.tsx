'use client';

import CinematicLayout from '@/components/CinematicLayout';
import ChromeText from '@/components/ui/ChromeText';
import FadeIn from '@/components/ui/FadeIn';

const tiers = [
    { name: "INITIATE", price: "Free", features: ["Basic Memory", "Standard Response", "Community Access"], highlight: false },
    { name: "OPERATOR", price: "$49", features: ["Deep Context", "Priority Computation", "Flow Integration", "Voice Mode"], highlight: true },
    { name: "ARCHITECT", price: "Custom", features: ["Dedicated Server", "Full API Access", "Custom Modules", "24/7 Uplink"], highlight: false }
];

export default function PricingPage() {
    return (
        <CinematicLayout
            desktopImage="/op.png"
            mobileImage="/mobop.png"
        >
            <div className="max-w-7xl mx-auto px-4 py-24 flex flex-col items-center">
                <div className="w-full h-32 md:h-48 flex items-center justify-center mb-16">
                    <ChromeText
                        text="Clearance Level"
                        size={3}
                        mobileSize={1.5}
                        height={0.5}
                        autoFit={true}
                        letterSpacing={0.05}
                        envMapIntensity={1}
                        className="w-full h-full"
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-center md:items-stretch justify-center w-full">
                    {tiers.map((tier, idx) => (
                        <FadeIn key={idx} delay={idx * 0.2} className={`w-full md:w-1/3 flex ${tier.highlight ? 'z-10' : 'z-0'}`}>
                            <div className={`relative w-full p-8 md:p-12 flex flex-col justify-between border transition-all duration-500 backdrop-blur-xl group
                                ${tier.highlight
                                    ? 'bg-amber-900/10 border-amber-500/50 shadow-[0_0_50px_rgba(245,158,11,0.2)] md:scale-110 md:-translate-y-4'
                                    : 'bg-black/40 border-white/10 hover:border-white/30 md:scale-95 opacity-80 hover:opacity-100'}
                            `}>
                                <div>
                                    <div className="text-xs font-mono text-white/30 mb-2">TIER 0{idx + 1}</div>
                                    <h3 className={`text-4xl font-black italic mb-2 ${tier.highlight ? 'text-amber-500' : 'text-apex'}`}>{tier.name}</h3>
                                    <div className="text-2xl font-light text-white mb-8">{tier.price}<span className="text-sm opacity-50">/mo</span></div>

                                    <div className="w-full h-px bg-white/10 mb-8" />

                                    <ul className="space-y-4 text-sm font-mono text-apex opacity-80">
                                        {tier.features.map((f, i) => (
                                            <li key={i} className="flex items-center gap-3">
                                                <div className={`w-1 h-1 rounded-full ${tier.highlight ? 'bg-amber-500' : 'bg-white'}`} />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <button className={`mt-12 w-full py-4 text-xs font-bold uppercase tracking-[0.2em] border transition-all duration-300
                                    ${tier.highlight
                                        ? 'bg-amber-500 text-black border-amber-500 hover:bg-amber-400'
                                        : 'bg-transparent text-white border-white/20 hover:border-white hover:bg-white/5'}
                                `}>
                                    {tier.highlight ? 'Initialize' : 'Select'}
                                </button>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </CinematicLayout>
    );
}
