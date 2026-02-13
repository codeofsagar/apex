'use client';

import CinematicLayout from '@/components/CinematicLayout';
import ChromeText from '@/components/ui/ChromeText';
import FadeIn from '@/components/ui/FadeIn';

export default function AboutPage() {
    return (
        <CinematicLayout
            desktopImage="/op.png" // CHANGE THIS: "/about-bg.png"
            mobileImage="/mobop.png" // CHANGE THIS: "/about-mobile.png"
        >
            <div className="max-w-4xl mx-auto text-center space-y-12">
                <div className="w-full h-32 md:h-48 flex items-center justify-center mb-8">
                    <ChromeText
                        text="Why Companion AI Was Built"
                        size={3}
                        mobileSize={1.5}
                        height={0.5}
                        autoFit={true}
                        letterSpacing={0.05}
                        envMapIntensity={1}
                        className="w-full h-full"
                    />
                </div>

                <div className="space-y-8 text-xl md:text-3xl font-light leading-relaxed">
                    <FadeIn delay={0.2}><p className="text-apex opacity-80">Generic AI answers questions.</p></FadeIn>
                    <FadeIn delay={0.4}><p className="text-apex font-normal">This was built to stay with you, understand your world, and help you build something real.</p></FadeIn>
                </div>

                <FadeIn delay={0.6} className="pt-12">
                    <button className="mystic-button">
                        Request Access
                    </button>
                </FadeIn>
            </div>
        </CinematicLayout>
    );
}
