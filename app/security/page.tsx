'use client';

import CinematicLayout from '@/components/CinematicLayout';

const points = [
    "Your data stays yours",
    "No resale",
    "Built for privacy",
    "Designed for serious operators"
];

export default function SecurityPage() {
    return (
        <CinematicLayout>
            <div className="max-w-4xl mx-auto text-center space-y-16 animate-fade-in-up">
                <h1 className="text-5xl md:text-7xl font-bold text-apex drop-shadow-2xl">
                    Built for Control
                </h1>

                <div className="grid md:grid-cols-2 gap-8">
                    {points.map((point, idx) => (
                        <div key={idx} className="p-8 border-l border-amber-500/30 bg-gradient-to-r from-amber-500/5 to-transparent text-left">
                            <h3 className="text-2xl text-apex font-light tracking-wide">
                                {point}
                            </h3>
                        </div>
                    ))}
                </div>

                <div className="pt-12">
                    <button className="mystic-button">
                        Request Access
                    </button>
                </div>
            </div>
        </CinematicLayout>
    );
}
