'use client';

import CinematicLayout from '@/components/CinematicLayout';
import ChromeText from '@/components/ui/ChromeText';

const points = [
    "Your data stays yours",
    "No resale",
    "Built for privacy",
    "Designed for serious operators"
];

export default function SecurityPage() {
    return (
        <CinematicLayout
            desktopImage="/featuresdesktop.png"
            mobileImage="/featuremob.png"
        >
            <div className="max-w-4xl mx-auto text-center space-y-16 animate-fade-in-up">
                <div className="w-full h-32 md:h-48 flex items-center justify-center mb-8">
                    <ChromeText
                        text="Built for Control"
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
