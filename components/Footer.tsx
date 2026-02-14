'use client';

import Link from 'next/link';
import ChromeText from '@/components/ui/ChromeText';

export default function Footer() {
    return (
        <footer className="w-full bg-black/80 backdrop-blur-md border-t border-white/10 pt-16 pb-8 relative z-50">
            <div className="max-w-7xl mx-auto px-4">

                {/* Top Section: Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 text-sm md:text-base">

                    {/* Column 1: Product */}
                    <div className="flex flex-col space-y-4">
                        <h4 className="text-zinc-500 uppercase tracking-widest text-xs font-bold mb-2">Product</h4>
                        <Link href="/features" className="text-zinc-400 hover:text-white transition-colors">Features</Link>
                        <Link href="/how-it-works" className="text-zinc-400 hover:text-white transition-colors">How It Works</Link>
                        <Link href="/pricing" className="text-zinc-400 hover:text-white transition-colors">Pricing</Link>
                        <Link href="/roadmap" className="text-zinc-400 hover:text-white transition-colors">Roadmap</Link>
                    </div>

                    {/* Column 2: Behavior */}
                    <div className="flex flex-col space-y-4">
                        <h4 className="text-zinc-500 uppercase tracking-widest text-xs font-bold mb-2">Behavior</h4>
                        <Link href="/modes" className="text-zinc-400 hover:text-white transition-colors">Operating Modes</Link>
                        <Link href="/archetype" className="text-zinc-400 hover:text-white transition-colors">Archetypes</Link>
                        <Link href="/use-cases" className="text-zinc-400 hover:text-white transition-colors">Use Cases</Link>
                        <Link href="/journal" className="text-zinc-400 hover:text-white transition-colors">Journal System</Link>
                    </div>

                    {/* Column 3: Support */}
                    <div className="flex flex-col space-y-4">
                        <h4 className="text-zinc-500 uppercase tracking-widest text-xs font-bold mb-2">Support</h4>
                        <Link href="/contact" className="text-zinc-400 hover:text-white transition-colors">Contact</Link>
                        <Link href="/faq" className="text-zinc-400 hover:text-white transition-colors">FAQ</Link>
                        <Link href="/crisis-control" className="text-zinc-400 hover:text-red-400 transition-colors">Crisis Protocol</Link>
                        <Link href="/request-access" className="text-amber-500/80 hover:text-amber-500 transition-colors">Request Access</Link>
                    </div>

                    {/* Column 4: Legal */}
                    <div className="flex flex-col space-y-4">
                        <h4 className="text-zinc-500 uppercase tracking-widest text-xs font-bold mb-2">Legal</h4>
                        <Link href="/privacy" className="text-zinc-400 hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="text-zinc-400 hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="/security" className="text-zinc-400 hover:text-white transition-colors">Security</Link>
                        <Link href="/data-policy" className="text-zinc-400 hover:text-white transition-colors">Data Policy</Link>
                    </div>
                </div>

                {/* Bottom Section: Massive Chrome Text Logo */}
                <div className="w-full h-32 md:h-64 flex items-center justify-center border-t border-white/5 pt-12">
                    <ChromeText
                        text="Apex Companion"
                        size={5}
                        mobileSize={2.5}
                        height={0.5}
                        bevelSize={0.04}
                        bevelThickness={0.1}
                        letterSpacing={0.02}
                        envMapIntensity={0.8}
                        className="w-full h-full "
                        autoFit={true}
                    />
                </div>

                <div className="pt-8 text-center text-zinc-600 text-xs uppercase tracking-widest">
                    © {new Date().getFullYear()} Apex Flow Labs. All Systems Operational.
                </div>
            </div>
        </footer>
    );
}
