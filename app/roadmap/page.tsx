'use client';

import CinematicLayout from '@/components/CinematicLayout';

const phases = [
    { name: "Phase 1: Core Companion", status: "Active" },
    { name: "Phase 2: Automation + Execution Expansion", status: "In Development" },
    { name: "Phase 3: Full Apex Ecosystem Integration", status: "Future" }
];

export default function RoadmapPage() {
    return (
        <CinematicLayout>
            <div className="max-w-4xl mx-auto text-center space-y-16 animate-fade-in-up">
                <h1 className="text-5xl md:text-7xl font-bold text-apex drop-shadow-2xl">
                    The Expansion Path
                </h1>

                <div className="space-y-0 relative">
                    {/* Vertical Line */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-500/50 to-transparent" />

                    {phases.map((phase, idx) => (
                        <div key={idx} className={`relative flex items-center gap-8 py-12 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:text-right pl-12 md:pl-0`}>
                            {/* Dot */}
                            <div className="absolute left-[21px] md:left-1/2 -translate-x-1/2 w-3 h-3 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.8)] z-10" />

                            <div className={`flex-1 ${idx % 2 === 0 ? 'md:pr-12' : 'md:pl-12 text-left'}`}>
                                <h3 className="text-2xl md:text-3xl text-apex font-bold mb-2">{phase.name}</h3>
                                <span className={`inline-block px-3 py-1 rounded-full text-xs uppercase tracking-widest border border-white/10 ${phase.status === 'Active' ? 'bg-amber-500/20 text-amber-500' : 'text-gray-400'}`}>
                                    {phase.status}
                                </span>
                            </div>
                            <div className="flex-1 hidden md:block" />
                        </div>
                    ))}
                </div>

                <div className="pt-12">
                    <button className="mystic-button">
                        Join Early Access
                    </button>
                </div>
            </div>
        </CinematicLayout>
    );
}
