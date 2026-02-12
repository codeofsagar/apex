'use client';

import CinematicLayout from '@/components/CinematicLayout';

export default function ContactPage() {
    return (
        <CinematicLayout>
            <div className="max-w-2xl mx-auto text-center space-y-12 animate-fade-in-up">
                <h1 className="text-5xl md:text-7xl font-bold text-apex drop-shadow-2xl">
                    Send the Signal
                </h1>

                <form className="space-y-6 w-full backdrop-blur-md bg-black/40 p-8 rounded-2xl border border-white/10">
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
            </div>
        </CinematicLayout>
    );
}
