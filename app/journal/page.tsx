'use client';

import CinematicLayout from '@/components/CinematicLayout';
import ChromeText from '@/components/ui/ChromeText';
import FadeIn from '@/components/ui/FadeIn';

export default function JournalPage() {
    const features = [
        "Daily Log Entries",
        "Emotional Reflection Prompts",
        "Weekly Pattern Summaries",
        "Integrity Score Tracking",
        "Progress Dashboard Overview"
    ];

    return (
        <CinematicLayout
            desktopImage="/jour.png"
            mobileImage="/jourmob.png"
        >
            <div className="max-w-4xl mx-auto px-4 pb-24 text-center">
                <div className="mb-20 border-b border-white/10 pb-12">
                    <div className="w-full h-32 md:h-48 flex flex-col items-center justify-center mb-8">
                        <ChromeText
                            text="Your Behavioral"
                            size={3}
                            mobileSize={1.7}
                            height={0.5}
                            autoFit={true}
                            letterSpacing={0.02}
                            envMapIntensity={1}
                            className="w-full h-full"
                        />
                 
                        <ChromeText
                            text="Archive"
                            size={3}
                            mobileSize={1.7}
                            height={0.5}
                            autoFit={true}
                            letterSpacing={0.02}
                            envMapIntensity={1}
                            className="w-full h-full relative bottom-20 md:bottom-10"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">

                    {/* Main Log Entry - Large Block */}
                    <FadeIn delay={0.2} className="md:col-span-2 md:row-span-2 relative p-8 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-md overflow-hidden group hover:border-amber-500/30 transition-all duration-500">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-50" />
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Active Log</h3>
                            <div className="flex gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                <span className="text-xs font-mono text-zinc-500">REC</span>
                            </div>
                        </div>
                        <div className="font-mono text-sm text-zinc-400 space-y-2">
                            <p>&gt; SESSION_INIT: 04:00 AM</p>
                            <p>&gt; MOOD_ANALYSIS: DETERMINED</p>
                            <p>&gt; INTENTION_SET: "COMPLETE THE MISSION"</p>
                            <p className="text-amber-500/80 animate-pulse">&gt; WAITING_FOR_INPUT_</p>
                        </div>
                        <div className="absolute bottom-4 right-4 text-xs font-mono text-zinc-600">
                            ID: LOG_8834_X
                        </div>
                    </FadeIn>

                    {/* Stat Card 1 - Small */}
                    <FadeIn delay={0.3} className="md:col-span-1 md:row-span-1 relative p-6 rounded-3xl bg-zinc-900/30 border border-white/5 backdrop-blur-sm flex flex-col justify-between group hover:bg-zinc-900/50 transition-all">
                        <h4 className="text-zinc-500 text-xs uppercase tracking-widest">Consistency</h4>
                        <div className="text-4xl font-black text-white group-hover:text-amber-500 transition-colors">98%</div>
                        <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                            <div className="w-[98%] h-full bg-amber-500" />
                        </div>
                    </FadeIn>

                    {/* Stat Card 2 - Small */}
                    <FadeIn delay={0.4} className="md:col-span-1 md:row-span-1 relative p-6 rounded-3xl bg-zinc-900/30 border border-white/5 backdrop-blur-sm flex flex-col justify-between group hover:bg-zinc-900/50 transition-all">
                        <h4 className="text-zinc-500 text-xs uppercase tracking-widest">Entries</h4>
                        <div className="text-4xl font-black text-white group-hover:text-blue-400 transition-colors">742</div>
                        <div className="text-xs text-zinc-500">Total logs archived</div>
                    </FadeIn>

                    {/* Feature List - Tall Block */}
                    <FadeIn delay={0.5} className="md:col-span-1 md:row-span-2 relative p-6 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-md flex flex-col group hover:border-white/20 transition-all">
                        <h3 className="text-lg font-bold text-white uppercase mb-6">Modules</h3>
                        <ul className="space-y-4">
                            {features.map((feature, idx) => (
                                <li key={idx} className="text-xs font-mono text-zinc-400 border-b border-white/5 pb-2 last:border-0 flex justify-between group-hover:text-zinc-200 transition-colors">
                                    <span>{feature}</span>
                                    <span className="text-amber-500 opacity-0 group-hover:opacity-100">OK</span>
                                </li>
                            ))}
                        </ul>
                    </FadeIn>

                    {/* Interactive Prompt - Wide Block */}
                    <FadeIn delay={0.6} className="md:col-span-3 md:row-span-1 relative p-8 rounded-3xl bg-gradient-to-r from-amber-900/10 to-transparent border border-amber-500/20 backdrop-blur-md flex items-center justify-between group hover:border-amber-500/50 transition-all">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">Reflection Prompt</h3>
                            <p className="text-zinc-400 italic">"What discomfort did you avoid today?"</p>
                        </div>
                        <button className="w-12 h-12 rounded-full border border-amber-500/50 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all">
                            <span className="text-xl">→</span>
                        </button>
                    </FadeIn>

                </div>
            </div>
        </CinematicLayout>
    );
}
