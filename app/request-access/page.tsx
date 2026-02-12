'use client';

import CinematicLayout from '@/components/CinematicLayout';

export default function RequestAccessPage() {
    return (
        <CinematicLayout>
            <div className="max-w-2xl mx-auto text-center space-y-12 animate-fade-in-up">
                <h1 className="text-5xl md:text-7xl font-bold text-apex drop-shadow-2xl">
                    Activate Your Companion
                </h1>

                <form className="space-y-6 w-full backdrop-blur-md bg-black/40 p-8 rounded-2xl border border-white/10">
                    <div className="space-y-2 text-left">
                        <label className="text-sm uppercase tracking-widest text-apex opacity-80 pl-1">Name</label>
                        <input type="text" className="w-full bg-black/50 border border-white/20 rounded-lg p-4 text-white focus:border-amber-500/50 focus:outline-none transition-colors" placeholder="Enter your name" />
                    </div>
                    <div className="space-y-2 text-left">
                        <label className="text-sm uppercase tracking-widest text-apex opacity-80 pl-1">Email</label>
                        <input type="email" className="w-full bg-black/50 border border-white/20 rounded-lg p-4 text-white focus:border-amber-500/50 focus:outline-none transition-colors" placeholder="Enter your email" />
                    </div>
                    <div className="space-y-2 text-left">
                        <label className="text-sm uppercase tracking-widest text-apex opacity-80 pl-1">What are you building?</label>
                        <textarea rows={4} className="w-full bg-black/50 border border-white/20 rounded-lg p-4 text-white focus:border-amber-500/50 focus:outline-none transition-colors" placeholder="Tell us about your project..." />
                    </div>

                    <div className="pt-4">
                        <button type="submit" className="mystic-button w-full">
                            Request Activation
                        </button>
                    </div>
                </form>
            </div>
        </CinematicLayout>
    );
}
