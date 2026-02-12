'use client';

import CinematicLayout from '@/components/CinematicLayout';

export default function AboutPage() {
    return (
        <CinematicLayout>
            <div className="max-w-4xl mx-auto text-center space-y-12 animate-fade-in-up">
                <h1 className="text-5xl md:text-7xl font-bold text-apex drop-shadow-2xl">
                    Why Companion AI Was Built
                </h1>

                <div className="space-y-8 text-xl md:text-3xl font-light leading-relaxed">
                    <p className="text-apex opacity-80">Generic AI answers questions.</p>
                    <p className="text-apex font-normal">This was built to stay with you, understand your world, and help you build something real.</p>
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
