import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import ThreeClouds from './ThreeClouds';
import LightningOverlay from './LightningOverlay';
import ChromeText from "@/components/ChromeText";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Navbar />

      {/* 3D Cloud Animation Layer - z-0 (below background) */}
      <div className="absolute inset-0 z-0 scale-150">
        <ThreeClouds />
        <LightningOverlay />
      </div>

      {/* Background Image - z-10 (above clouds) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Image
          src="/bg1.png"
          alt="Background"
          fill
          className="object-contain md:scale-134 scale-300"
          priority
        />
        {/* Overlay */}

      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4">
        {/* Main Title - Using a serif font via the variable defined in layout */}
        <ChromeText as="h1" className="font-serif text-5xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight mb-6">
          APEX FLOW LABS
        </ChromeText>

        {/* Subtitle */}
        <p className="text-xs md:text-sm tracking-[0.4em] uppercase mb-16 text-gray-400 font-light">
          The Ecosystem of Dominance
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 mb-24">
          <button className="px-10 py-4 border border-white/20 bg-white/5 backdrop-blur-sm text-gray-200 text-[10px] tracking-[0.2em] uppercase hover:bg-white/10 hover:border-white/40 transition-all duration-500 cursor-pointer">
            Enter The Ecosystem
          </button>
          <button className="px-10 py-4 border border-white/20 bg-white/5 backdrop-blur-sm text-gray-200 text-[10px] tracking-[0.2em] uppercase hover:bg-white/10 hover:border-white/40 transition-all duration-500 cursor-pointer">
            See The Domains
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 pb-8">
        <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/40 to-transparent"></div>
      </div>
    </section>
  );
}
