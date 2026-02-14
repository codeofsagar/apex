'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import RainEffect from './RainEffect';
import ThreeClouds from './ThreeClouds';
import CloudOverlay from '@/components/CloudOverlay';
import ChromeText from '@/components/ui/ChromeText';
import ElectricOrb from './ElectricOrb';
// import FadeIn from '@/components/ui/FadeIn';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade out content on scroll
      gsap.to(".hero-content", {
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "+=100%",
          scrub: true
        },
        opacity: 0,
        y: -50,
        pointerEvents: "none",
        ease: "power1.out"
      });

      // Entry Animation
      gsap.from(".hero-content > *", {
        y: 50,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.5
      });

      // Parallax for Background
      gsap.to(".hero-bg-img", {
        y: 100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Cinematic auto-zoom (Ken Burns effect) on the hero background
      gsap.fromTo(
        heroBgRef.current,
        { scale: 1 },
        {
          scale: 1.15,
          duration: 12,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      <Navbar />

      {/* Electric Orb - Three.js Effect */}
      <div className="fixed left-0 top-0 md:-top-24 w-full flex justify-center z-[100] pointer-events-none">
        <div className="w-[400px] h-[400px] md:w-[450px] md:h-[450px]">
          <ElectricOrb />
        </div>
      </div>

      {/* Cloud + Rain Layer - z-0 (below background) */}
      <div id="cloud-layer" className="fixed inset-0 z-0 scale-100 pointer-events-none">
        <ThreeClouds />
      </div>

      {/* Rain Effect - z-1 (Behind Background Image) */}
      <div className="fixed inset-0 z-1 pointer-events-none">
        <RainEffect />
      </div>

      {/* CSS Cloud Overlay - z-20 (above background) */}
      <div className="fixed inset-0 z-20 pointer-events-none">
        <CloudOverlay />
      </div>

      {/* Background Image - z-10 (above clouds) */}
      <div ref={heroBgRef} className="hero-bg fixed inset-0 z-10 pointer-events-none w-full h-full will-change-transform">
        {/* Desktop Background */}
        <Image
          src="/ok.png"
          alt="Background"
          fill
          className="hero-bg-img hidden md:block  "
          priority
        />
        {/* Mobile Background */}
        <Image
          src="/mobok.png"
          alt="Background Mobile"
          fill
          className="hero-bg-img block md:hidden object-cover"
          priority
        />
      </div>

      <div className="hero-content fixed inset-0 z-[120] flex flex-col items-center justify-center md:top-10 h-full text-center px-4 pointer-events-none">
        <div className="w-full h-[20vh] md:h-[30vh] flex items-center justify-center mb-8 md:mb-1  relative">
          {/* Subtle dark overlay for contrast */}
          <div className="absolute inset-0 bg-radial-gradient from-black/90 via-transparent to-transparent opacity-100 pointer-events-none scale-150" />

          <ChromeText
            text="APEX COMPANION AI"
            className="w-full h-full relative z-10"
            size={2.3}
            mobileSize={1.1}
            height={1}
            bevelSize={0.04}
            bevelThickness={0.1}
            letterSpacing={0.05}
            envMapIntensity={1}
            rotation={[0, 0, 0]}
          />
          {/* Note: I might need to adjust the text splitting or sizing for mobile vs desktop.
                 Currently attempting a single line "APEX" as the main visual anchor, or replacing the whole H1 "APEX COMPANION AI".
                 The user asked for "APEX COMPANION AI". Let's stick to the request.
                 However, Text3D with long strings on mobile can be tricky. 
                 Let's try to pass the full string, but maybe adjust size based on screen width in a future iteration if needed.
                 For now, let's use a responsive container and let generic sizing handle it, or stick to the original \"APEX COMPANION AI\".
              */}
        </div>



        <div className="w-full flex flex-col items-center gap-8 mb-12 max-w-5xl mx-auto px-4 relative z-[130] pointer-events-auto">



          <div className="w-full">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-none drop-shadow-2xl text-center">
              The First AI That <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-zinc-200 to-zinc-500">Actually Remembers You.</span>
            </h2>
          </div>

          <div className="w-full max-w-3xl">
            <div className="flex flex-col items-center gap-6">
              <p className="text-lg md:text-xl text-white font-light leading-relaxed text-center border-l-2 border-amber-500/50 pl-6 pr-6 md:border-l-0 md:border-t md:pt-6 md:pl-0">
                An adaptive behavioral intelligence system that tracks your goals, promises, and emotional patterns — <span className="text-white font-semibold">and refuses to let you drift.</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 mt-8 w-full justify-center">
            <Link href="/request-access" className="w-full md:w-auto">
              <button className="mystic-button text-lg px-8 py-4 w-full md:w-auto">
                ENTER THE SYSTEM
              </button>
            </Link>
            <Link href="/features" className="w-full md:w-auto">
              <button className="group relative px-8 py-4 w-full md:w-auto backdrop-blur-xl border border-white/10 bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300 uppercase text-sm font-bold tracking-widest overflow-hidden">
                <span className="relative z-10">Explore Intelligence</span>
                <div className="absolute inset-0 bg-amber-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section >
  );
}
