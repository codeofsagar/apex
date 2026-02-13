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

      {/* Orb Video - Fixed Top Center */}
      <div className="orb-container fixed md:ml-6 ml-3 top-70 md:top-0 left-1/2 -translate-x-1/2 z-[100] pointer-events-none mix-blend-screen">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="orb-video md:w-[500px] w-[800px] scale-250 md:scale-100 h-auto object-cover brightness-150 contrast-225"
        >
          <source src="/orb.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Cloud + Rain Layer - z-0 (below background) */}
      <div id="cloud-layer" className="fixed inset-0 z-0 scale-100 pointer-events-none">
        <ThreeClouds />
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

      </div>

      <div className="hero-content fixed inset-0 z-[120] flex flex-col items-center justify-center h-full text-center px-4 pointer-events-none">
        <div className="w-full h-[20vh] md:h-[30vh] flex items-center justify-center mb-28 md:mb-12 relative">
          {/* Subtle dark overlay for contrast */}
          <div className="absolute inset-0 bg-radial-gradient from-black/60 via-transparent to-transparent opacity-80 pointer-events-none scale-150" />

          <ChromeText
            text="APEX COMPANION AI"
            className="w-full h-full relative z-10"
            size={2.3}
            mobileSize={1}
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



        <div className="w-full flex items-center justify-center mt-4 mb-4">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-zinc-300 uppercase tracking-tight drop-shadow-lg text-center">
            AI THAT EXECUTES, NOT CHATS.
          </h2>
        </div>

        <div className="w-full flex flex-col items-center gap-2 mb-12 max-w-3xl mx-auto">
          <p className="text-lg md:text-xl text-zinc-300 font-medium leading-relaxed uppercase tracking-widest text-center">
            Your Personal AI Companion that remembers you, helps you think clearly, and keeps you moving forward.
          </p>
        </div>

        <Link href="/request-access">
          <button className="mystic-button text-xl px-12 py-5 pointer-events-auto">
            REQUEST ACCESS
          </button>
        </Link>
      </div>
    </section>
  );
}
