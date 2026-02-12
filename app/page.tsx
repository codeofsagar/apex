'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from "@/sections/Hero";
import IntroSection from "@/components/features/IntroSection";
import WhyItIsDifferent from "@/components/features/WhyItIsDifferent";
import DemoSection from "@/sections/DemoSection";
import FinalCTA from "@/sections/FinalCTA";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mainRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Hero Content Parallax & Fade Out
      gsap.to(".hero-content", {
        y: -150, // Move up slightly faster than scroll
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "400px top", // Fade out quickly
          scrub: true,
        },
      });

      // 2. Hero Background Image - Move Down (Curtain effect)
      // The user wants "hero.png will be go down".
      // Since it's fixed, we can translateY it.
      gsap.to(".hero-bg img", { // Target the image inside
        y: 200, // Move down
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // 3. Orb Behavior
      // "orb.mp4 is not going to top to vanish it should not be"
      // We'll keep it fixed/pinned but maybe fade it out or scale it if needed eventually.
      // For now, let's just let it stay fixed as it is in CSS, or add a subtle parallax.
      // If we don't animate it, it stays fixed (as per CSS class `fixed`).
      // The user said "it should not be [going to top to vanish]".
      // So we will NOT add a `y` animation that moves it out of view upwards.
      // We might want to fade it out as the Demo section covers it?
      // Or keep it visible? Let's just scale it down a bit to be less obtrusive.
      gsap.to(".orb-video", {
        scale: 0.8,
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className=" min-h-screen text-white">
      <div className="relative z-10">
        <Hero />
      </div>

      <div id="intro-trigger" className="relative z-20">
        <DemoSection>
          <IntroSection />
          <WhyItIsDifferent />
        </DemoSection>
        <FinalCTA />
      </div>
    </main>
  );
}
