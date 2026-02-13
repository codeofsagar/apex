'use client';

import CinematicLayout from '@/components/CinematicLayout';
import ChromeText from '@/components/ui/ChromeText';
import FadeIn from '@/components/ui/FadeIn';

export default function HowItWorksPage() {
    return (
        <CinematicLayout
            desktopImage="/op.png" // CHANGE THIS: "/how-it-works-bg.png"
            mobileImage="/mobop.png" // CHANGE THIS: "/how-it-works-mobile.png"
        >
            {/* Hero Section */}
            <div className="max-w-4xl mx-auto text-center space-y-12">
                <div className="w-full h-32 md:h-48 flex items-center justify-center mb-8">
                    <ChromeText
                        text="How Apex Companion AI Works"
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
                    <FadeIn delay={0.2}><p className="text-apex">It starts with your goal.</p></FadeIn>
                    <FadeIn delay={0.4}><p className="text-apex opacity-90">It helps you organize the chaos.</p></FadeIn>
                    <FadeIn delay={0.6}><p className="text-apex opacity-80">It gives you the next move.</p></FadeIn>
                    <FadeIn delay={0.8}><p className="text-apex opacity-70">It keeps you on track.</p></FadeIn>
                    <FadeIn delay={1.0}><p className="text-apex opacity-60">It gets sharper the longer you build together.</p></FadeIn>
                </div>

                <FadeIn delay={1.2} className="pt-12">
                    <button className="mystic-button">
                        Request Access
                    </button>
                </FadeIn>
            </div>
        </CinematicLayout>
    );
}
