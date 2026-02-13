'use client';

import CinematicLayout from '@/components/CinematicLayout';
import ChromeText from '@/components/ui/ChromeText';
import FadeIn from '@/components/ui/FadeIn';

export default function ContactPage() {
    return (
        <CinematicLayout
            desktopImage="/op.png" // CHANGE THIS: "/contact-bg.png"
            mobileImage="/mobop.png" // CHANGE THIS: "/contact-mobile.png"
        >
            <div className="max-w-2xl mx-auto text-center space-y-12">
                <div className="w-full h-32 md:h-48 flex items-center justify-center mb-8">
                    <ChromeText
                        text="Send the Signal"
                        size={3}
                        mobileSize={1.5}
                        height={0.5}
                        autoFit={true}
                        letterSpacing={0.05}
                        envMapIntensity={1}
                        className="w-full h-full"
                    />
                </div>

                <FadeIn delay={0.4}>
                    <form className="space-y-6 w-full backdrop-blur-md bg-black/40 p-8 rounded-2xl border border-white/10 shadow-2xl">
                        <div className="space-y-2 text-left">
                            <label className="text-sm uppercase tracking-widest text-apex opacity-80 pl-1">Name</label>
                            <input type="text" className="w-full bg-black/50 border border-white/20 rounded-lg p-4 text-white focus:border-amber-500/50 focus:outline-none transition-colors" placeholder="Your Name" />
                        </div>
                        <div className="space-y-2 text-left">
                            <label className="text-sm uppercase tracking-widest text-apex opacity-80 pl-1">Email</label>
                            <input type="email" className="w-full bg-black/50 border border-white/20 rounded-lg p-4 text-white focus:border-amber-500/50 focus:outline-none transition-colors" placeholder="Your Email" />
                        </div>
                        <div className="space-y-2 text-left">
                            <label className="text-sm uppercase tracking-widest text-apex opacity-80 pl-1">Message</label>
                            <textarea rows={6} className="w-full bg-black/50 border border-white/20 rounded-lg p-4 text-white focus:border-amber-500/50 focus:outline-none transition-colors" placeholder="How can we help?" />
                        </div>

                        <div className="pt-4">
                            <button type="submit" className="mystic-button w-full">
                                Transmit
                            </button>
                        </div>
                    </form>
                </FadeIn>
            </div>
        </CinematicLayout>
    );
}
