'use client';

import CinematicLayout from '@/components/CinematicLayout';

const tiers = [
    "Founding Access",
    "Pro Operator",
    "Enterprise Command"
];

export default function PricingPage() {
    return (
        <CinematicLayout>
            <div className="max-w-5xl mx-auto text-center space-y-16 animate-fade-in-up">
                <h1 className="text-5xl md:text-7xl font-bold text-apex drop-shadow-2xl">
                    Choose Your Access Level
                </h1>

                <div className="grid md:grid-cols-3 gap-8">
                    {tiers.map((tier, idx) => (
                        <div key={idx} className={`relative p-10 rounded-2xl border transition-all duration-500 backdrop-blur-sm flex flex-col items-center justify-center aspect-[3/4]
                            ${idx === 0 ? 'bg-amber-900/10 border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.1)] scale-105 z-10' : 'bg-black/40 border-white/10 hover:border-white/30'}
                        `}>
                            <h3 className="text-3xl font-bold text-apex mb-4">{tier}</h3>
                            <div className="w-12 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mb-8" />
                            <ul className="space-y-4 text-sm text-gray-400 font-light mb-auto">
                                <li>Priority Computation</li>
                                <li>Expanded Memory</li>
                                <li>{idx === 2 ? 'Dedicated Infrastructure' : 'Standard Response Time'}</li>
                            </ul>
                            <button className="mystic-button mt-8 w-full">
                                {idx === 0 ? 'Secure Spot' : 'Join Waitlist'}
                            </button>
                        </div>
                    ))}
                </div>

                <div className="pt-8">
                    <button className="text-sm text-apex uppercase tracking-widest hover:text-white transition-colors">
                        Apply for Early Access
                    </button>
                </div>
            </div>
        </CinematicLayout>
    );
}
