'use client';

import CinematicLayout from '@/components/CinematicLayout';

const features = [
    "Remembers your goals",
    "Helps you stay focused",
    "Keeps you moving forward",
    "Turns ideas into steps",
    "Built around your life and business",
    "Grows with you over time"
];

export default function FeaturesPage() {
    return (
        <CinematicLayout>
            <div className="max-w-6xl mx-auto text-center space-y-16 animate-fade-in-up">
                <h1 className="text-5xl md:text-7xl font-bold text-apex drop-shadow-2xl">
                    Core Features
                </h1>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <div key={idx} className="group relative p-8 rounded-2xl bg-black/40 border border-white/10 hover:border-amber-500/50 transition-all duration-500 backdrop-blur-sm">
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                            <h3 className="relative z-10 text-2xl text-apex font-light group-hover:drop-shadow-[0_0_10px_rgba(245,158,11,0.5)] transition-all">
                                {feature}
                            </h3>
                        </div>
                    ))}
                </div>

                <div className="pt-8">
                    <button className="mystic-button">
                        Activate Access
                    </button>
                </div>
            </div>
        </CinematicLayout>
    );
}
