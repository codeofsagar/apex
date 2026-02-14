'use client';

import CinematicLayout from '@/components/CinematicLayout';
import ChromeText from '@/components/ui/ChromeText';

const principles = [
    { title: "What Companion AI Does", desc: "It processes your project data to provide contextual assistance and execution support." },
    { title: "Data Handling Principles", desc: "We prioritize minimization, encryption, and user consent in all data operations." },
    { title: "User Ownership", desc: "You retain full ownership of your data and intellectual property." },
    { title: "No Selling Personal Data", desc: "We do not sell your personal data to third parties. Ever." }
];

export default function DataPolicyPage() {
    return (
        <CinematicLayout
            desktopImage="/featuresdesktop.png"
            mobileImage="/featuremob.png"
        >
            <div className="max-w-4xl mx-auto text-center space-y-16 animate-fade-in-up">
                <div className="w-full h-32 md:h-48 flex items-center justify-center mb-8">
                    <ChromeText
                        text="AI & Data Policy"
                        size={3}
                        mobileSize={1.5}
                        height={0.5}
                        autoFit={true}
                        letterSpacing={0.05}
                        envMapIntensity={1}
                        className="w-full h-full"
                    />
                </div>

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
