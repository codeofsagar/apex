'use client';

import CinematicLayout from '@/components/CinematicLayout';
import ChromeText from '@/components/ui/ChromeText';
import FadeIn from '@/components/ui/FadeIn';

export default function ContactPage() {
    return (
        <CinematicLayout
            desktopImage="/contact.png"
            mobileImage="/contactmob.png"
        >
            <div className="max-w-2xl mx-auto px-4 text-center space-y-12 pb-24">
                <div className="w-full h-32 md:h-48 flex items-center justify-center mb-8 border-b border-white/10 pb-8">
                    <ChromeText
                        text="Contact Command"
                        size={3}
                        mobileSize={1.5}
                        height={0.5}
                        autoFit={true}
                        letterSpacing={0.05}
                        envMapIntensity={1}
                        className="w-full h-full"
                    />
                </div>

                <FadeIn delay={0.2} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-zinc-900/40 p-6 rounded-lg border border-zinc-700 hover:border-amber-500 transition-colors duration-300">
                        <h3 className="text-zinc-500 uppercase tracking-widest text-xs mb-2">Support Relay</h3>
                        <a href="mailto:support@apex.ai" className="text-xl text-white font-mono hover:text-amber-500 transition-colors">support@apex.ai</a>
                    </div>
                    <div className="bg-zinc-900/40 p-6 rounded-lg border border-zinc-700 hover:border-amber-500 transition-colors duration-300">
                        <h3 className="text-zinc-500 uppercase tracking-widest text-xs mb-2">Partnership Uplink</h3>
                        <a href="mailto:partners@apex.ai" className="text-xl text-white font-mono hover:text-amber-500 transition-colors">partners@apex.ai</a>
                    </div>
                </FadeIn>

                <FadeIn delay={0.4} className="space-y-4">
                    <h3 className="text-white font-bold uppercase tracking-wider mb-6">System Protocols</h3>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-zinc-400">
                        <a href="/faq" className="hover:text-white transition-colors border-b border-transparent hover:border-amber-500 pb-1">FAQ Database</a>
                        <a href="/privacy" className="hover:text-white transition-colors border-b border-transparent hover:border-amber-500 pb-1">Privacy Protocol</a>
                        <a href="/terms" className="hover:text-white transition-colors border-b border-transparent hover:border-amber-500 pb-1">Terms of Service</a>
                    </div>
                </FadeIn>
            </div>
        </CinematicLayout>
    );
}
