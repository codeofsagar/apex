'use client';

import CinematicLayout from '@/components/CinematicLayout';

const useCases = [
    "Founders running companies",
    "Creators building content engines",
    "Affiliate operators scaling distribution",
    "Course builders launching education systems",
    "Ecommerce owners managing growth",
    "Anyone tired of doing everything alone"
];

export default function UseCasesPage() {
    return (
        <CinematicLayout>
            <div className="max-w-4xl mx-auto text-center space-y-16 animate-fade-in-up">
                <h1 className="text-5xl md:text-7xl font-bold text-apex drop-shadow-2xl">
                    Built for Builders
                </h1>

                <div className="space-y-6">
                    {useCases.map((useCase, idx) => (
                        <div key={idx} className="flex items-center justify-center space-x-4 group">
                            <div className="h-px w-8 bg-amber-500/50 group-hover:w-16 transition-all duration-500" />
                            <p className="text-xl md:text-2xl text-apex font-light tracking-wide group-hover:translate-x-2 transition-transform duration-300">
                                {useCase}
                            </p>
                            <div className="h-px w-8 bg-amber-500/50 group-hover:w-16 transition-all duration-500" />
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
