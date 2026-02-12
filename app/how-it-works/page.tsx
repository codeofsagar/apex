'use client';

import CinematicLayout from '@/components/CinematicLayout';

export default function HowItWorksPage() {
    return (
        <CinematicLayout>
            {/* Hero Section */}
            <div className="max-w-4xl mx-auto text-center space-y-12 animate-fade-in-up">
                <h1 className="text-5xl md:text-7xl font-bold text-apex drop-shadow-2xl">
                    How Apex Companion AI Works
                </h1>

                <div className="space-y-8 text-xl md:text-3xl font-light leading-relaxed">
                    <p className="text-apex">It starts with your goal.</p>
                    <p className="text-apex opacity-90">It helps you organize the chaos.</p>
                    <p className="text-apex opacity-80">It gives you the next move.</p>
                    <p className="text-apex opacity-70">It keeps you on track.</p>
                    <p className="text-apex opacity-60">It gets sharper the longer you build together.</p>
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
