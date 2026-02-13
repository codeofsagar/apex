'use client';

import CinematicLayout from '@/components/CinematicLayout';
import ChromeText from '@/components/ui/ChromeText';
import FadeIn from '@/components/ui/FadeIn';

const phases = [
    { id: "V.1.0", name: "Core Companion", status: "ONLINE", desc: "Memory architecture and basic conversation protocols online." },
    { id: "V.2.0", name: "Execution Layer", status: "UPLOADING...", desc: "Direct integration with external tools. Automated task execution." },
    { id: "V.3.0", name: "The Ecosystem", status: "PENDING", desc: "Full autonomy. Multi-agent swarms. Self-correcting workflows." }
];

export default function RoadmapPage() {
    return (
        <CinematicLayout
            desktopImage="/op.png"
            mobileImage="/mobop.png"
        >
            <div className="max-w-4xl mx-auto px-6 py-24">
                <div className="mb-16 text-center">
                    <div className="w-full h-32 md:h-48 flex items-center justify-center mb-4">
                        <ChromeText
                            text="Trajectory"
                            size={3}
                            mobileSize={1.5}
                            height={0.5}
                            autoFit={true}
                            letterSpacing={0.05}
                            envMapIntensity={1}
                            className="w-full h-full"
                        />
                    </div>
                </div>

                <div className="relative">
                    {/* Data Line */}
                    <div className="absolute left-8 top-0 bottom-0 w-px bg-white/10" />

                    {phases.map((phase, idx) => (
                        <FadeIn key={idx} delay={idx * 0.2}>
                            <div className="relative pl-24 py-12 group">
                                {/* Connector */}
                                <div className="absolute left-[31px] top-1/2 -translate-y-1/2 w-16 h-px bg-white/10 group-hover:bg-amber-500 transition-colors duration-500" />
                                {/* Node */}
                                <div className={`absolute left-[27px] top-1/2 -translate-y-1/2 w-3 h-3 border border-white/50 bg-black rotate-45 group-hover:bg-amber-500 group-hover:border-amber-500 transition-colors duration-500 ${phase.status === 'ONLINE' ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]' : ''}`} />

                                <div className="border border-white/10 p-8 bg-black/40 backdrop-blur-md rounded-br-3xl rounded-tl-3xl hover:border-amber-500/30 transition-all duration-500 group-hover:translate-x-2">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="font-mono text-xs text-amber-500/80">{phase.id}</div>
                                        <div className={`text-[10px] font-bold tracking-widest px-2 py-1 rounded ${phase.status === 'ONLINE' ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white/40'} animate-pulse`}>
                                            {phase.status}
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-bold text-apex mb-2">{phase.name}</h3>
                                    <p className="text-apex opacity-60 font-light">{phase.desc}</p>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                <FadeIn delay={0.8} className="mt-12 text-center">
                    <button className="mystic-button">
                        Join The Build
                    </button>
                </FadeIn>
            </div>
        </CinematicLayout>
    );
}
