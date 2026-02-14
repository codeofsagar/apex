'use client';

import CinematicLayout from '@/components/CinematicLayout';
import ChromeText from '@/components/ui/ChromeText';
import FadeIn from '@/components/ui/FadeIn';

const tiers = [
    { name: "STARTER", price: "Free", features: ["Core memory tracking", "Basic mode selection", "Limited history depth"], highlight: false },
    { name: "OPERATOR", price: "$49", features: ["Full memory depth", "All character modes", "Behavioral pattern detection", "Integrity scoring"], highlight: true },
    { name: "APEX", price: "$99", features: ["Advanced pattern prediction", "Full archetype mapping", "Priority crisis guard", "Deep behavioral analytics"], highlight: false }
];

export default function PricingPage() {
    return (
        <CinematicLayout
            desktopImage="/pri.png"
            mobileImage="/primob.png"
        >
            <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col items-center">
                <div className="w-full h-32 md:h-48 flex items-center justify-center mb-6">
                    <div className="flex flex-col items-center">
                        <ChromeText
                            text="Choose"
                            size={6}
                            mobileSize={2}
                            height={0.8}
                            autoFit={true}
                            letterSpacing={0.05}
                            envMapIntensity={1}
                            className="w-full h-full relative z-10  top-24 md:top-16"
                        />
                        <ChromeText
                            text="Your Level"
                            size={5.7}
                            mobileSize={2}
                            height={0.8}
                            autoFit={true}
                            letterSpacing={0.05}
                            envMapIntensity={1}
                            className="w-full h-full relative z-10"
                        />
                        <ChromeText
                            text="of Accountability"
                            size={3}
                            mobileSize={2}
                            height={0.8}
                            autoFit={true}
                            letterSpacing={0.05}
                            envMapIntensity={1}
                            className="w-full h-full relative z-10 bottom-24 md:bottom-20"
                        />
                    </div>
                </div>

                {/* Desktop Table Layout */}
                <div className="hidden md:block w-full max-w-6xl mx-auto border border-white/10 rounded-lg bg-black/40 backdrop-blur-md overflow-hidden">
                    {/* Header Row */}
                    <div className="grid grid-cols-4 bg-white/5 border-b border-white/10 p-4 font-mono text-xs tracking-widest text-zinc-500 uppercase">
                        <div className="col-span-1">Metric</div>
                        {tiers.map((tier, idx) => (
                            <div key={idx} className={`col-span-1 text-center ${tier.highlight ? 'text-amber-500' : ''}`}>
                                {tier.name}
                            </div>
                        ))}
                    </div>

                    {/* Price Row */}
                    <div className="grid grid-cols-4 border-b border-white/10 p-6 md:p-8 hover:bg-white/5 transition-colors">
                        <div className="col-span-1 flex items-center font-bold text-white uppercase tracking-wider">Commitment</div>
                        {tiers.map((tier, idx) => (
                            <div key={idx} className="col-span-1 flex items-center justify-center">
                                <div className={`text-2xl md:text-4xl font-black ${tier.highlight ? 'text-amber-500' : 'text-zinc-600'} font-mono`}>
                                    {tier.price}
                                    <span className="text-xs opacity-50 ml-1">/MO</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Features as Data Rows */}
                    <div className="divide-y divide-white/5">
                        <div className="grid grid-cols-4 p-4 hover:bg-white/5 transition-colors">
                            <div className="col-span-1 text-sm text-zinc-400 font-mono flex items-center">Memory Depth</div>
                            <div className="col-span-1 text-center text-zinc-600 text-sm flex items-center justify-center">Limited</div>
                            <div className="col-span-1 text-center text-white text-sm flex items-center justify-center">Full Access</div>
                            <div className="col-span-1 text-center text-amber-500 text-sm flex items-center justify-center">Unlimited</div>
                        </div>

                        <div className="grid grid-cols-4 p-4 hover:bg-white/5 transition-colors">
                            <div className="col-span-1 text-sm text-zinc-400 font-mono flex items-center">Character Modes</div>
                            <div className="col-span-1 text-center text-zinc-600 text-sm flex items-center justify-center">Standard Only</div>
                            <div className="col-span-1 text-center text-white text-sm flex items-center justify-center">All Modes</div>
                            <div className="col-span-1 text-center text-amber-500 text-sm flex items-center justify-center">Custom + All</div>
                        </div>

                        <div className="grid grid-cols-4 p-4 hover:bg-white/5 transition-colors">
                            <div className="col-span-1 text-sm text-zinc-400 font-mono flex items-center">Crisis Protocol</div>
                            <div className="col-span-1 text-center text-zinc-800 flex items-center justify-center">-</div>
                            <div className="col-span-1 text-center text-white flex items-center justify-center">Standard</div>
                            <div className="col-span-1 text-center text-amber-500 flex items-center justify-center font-bold">Priority</div>
                        </div>

                        <div className="grid grid-cols-4 p-4 hover:bg-white/5 transition-colors">
                            <div className="col-span-1 text-sm text-zinc-400 font-mono flex items-center">Integrity Analytics</div>
                            <div className="col-span-1 text-center text-zinc-800 flex items-center justify-center">-</div>
                            <div className="col-span-1 text-center text-white flex items-center justify-center">✔</div>
                            <div className="col-span-1 text-center text-amber-500 flex items-center justify-center font-bold">AI Predictive</div>
                        </div>
                    </div>

                    {/* CTA Row */}
                    <div className="grid grid-cols-4 p-6 md:p-8 bg-white/5 border-t border-white/10">
                        <div className="col-span-1" />
                        {tiers.map((tier, idx) => (
                            <div key={idx} className="col-span-1 px-2 md:px-6">
                                <button className={`w-full py-3 text-[10px] md:text-xs font-bold uppercase tracking-widest border transition-all duration-300
                                    ${tier.highlight
                                        ? 'bg-amber-500 text-black border-amber-500 hover:bg-amber-400'
                                        : 'bg-transparent text-zinc-500 border-zinc-700 hover:border-white hover:text-white'}
                                `}>
                                    {tier.highlight ? 'Initialize' : 'Select'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile Cards Layout */}
                <div className="md:hidden w-full flex flex-col gap-6">
                    {tiers.map((tier, idx) => (
                        <div key={idx} className={`relative p-6 rounded-xl border ${tier.highlight ? 'border-amber-500/50 bg-amber-950/10' : 'border-white/10 bg-black/40'} backdrop-blur-md`}>
                            <h3 className={`text-xl font-bold mb-2 ${tier.highlight ? 'text-amber-500' : 'text-white'}`}>{tier.name}</h3>
                            <div className="text-3xl font-mono font-black text-white mb-6">
                                {tier.price}<span className="text-sm text-zinc-500 font-normal">/MO</span>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {tier.features.map((feature, fIdx) => (
                                    <li key={fIdx} className="flex items-start gap-3 text-sm text-zinc-300">
                                        <span className="text-amber-500 text-xs mt-1">▶</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-3 text-xs font-bold uppercase tracking-widest border transition-all duration-300
                                ${tier.highlight
                                    ? 'bg-amber-500 text-black border-amber-500 hover:bg-amber-400'
                                    : 'bg-transparent text-zinc-500 border-zinc-700 hover:border-white hover:text-white'}
                            `}>
                                {tier.highlight ? 'Initialize' : 'Select'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </CinematicLayout>
    );
}
