'use client';

import CinematicLayout from '@/components/CinematicLayout';

const principles = [
    { title: "What Companion AI Does", desc: "It processes your project data to provide contextual assistance and execution support." },
    { title: "Data Handling Principles", desc: "We prioritize minimization, encryption, and user consent in all data operations." },
    { title: "User Ownership", desc: "You retain full ownership of your data and intellectual property." },
    { title: "No Selling Personal Data", desc: "We do not sell your personal data to third parties. Ever." }
];

export default function DataPolicyPage() {
    return (
        <CinematicLayout>
            <div className="max-w-4xl mx-auto text-center space-y-16 animate-fade-in-up">
                <h1 className="text-5xl md:text-7xl font-bold text-apex drop-shadow-2xl">
                    AI & Data Policy
                </h1>

                <div className="grid md:grid-cols-2 gap-8">
                    {principles.map((item, idx) => (
                        <div key={idx} className="p-8 rounded-2xl bg-black/40 border border-white/10 hover:border-amber-500/30 transition-all text-left group">
                            <h3 className="text-2xl text-apex font-bold mb-4 group-hover:text-amber-500 transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-gray-300 font-light leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </CinematicLayout>
    );
}
