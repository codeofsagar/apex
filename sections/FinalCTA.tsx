'use client';

export default function FinalCTA() {
    return (
        <section className="relative w-full py-32 flex flex-col items-center justify-center bg-zinc-950 text-center px-6 border-t border-white/10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">
                Ready to stop building alone?
            </h2>
            <button className="px-10 py-4 bg-white text-black font-bold uppercase tracking-wider hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                Request Access
            </button>
            <p className="mt-8 text-sm text-gray-500 uppercase tracking-widest">
                Join the Apex Ecosystem
            </p>
        </section>
    );
}
