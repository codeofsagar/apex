'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import ThreeClouds from './ThreeClouds';
import LightningOverlay from './LightningOverlay';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade out content on scroll
      gsap.to(".hero-content", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom center", // Fade out halfway through
          scrub: true
        },
        opacity: 0,
        y: -50,
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

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      <Navbar />

      {/* Orb Video - Fixed Top Center */}
      <div className="orb-container fixed md:ml-6 ml-3  top-70 md:top-40  left-1/2 -translate-x-1/2 z-[100] pointer-events-none mix-blend-screen">
        <video
          autoPlay
          loop
          playsInline
          className="orb-video md:w-[500px] w-[800px] scale-250 md:scale-100 h-auto object-cover"
        >
          <source src="/orb.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 3D Cloud Animation Layer - z-0 (below background) */}
      <div id="cloud-layer" className="fixed inset-0 z-0 scale-150 pointer-events-none">
        <ThreeClouds />
        <LightningOverlay />
      </div>

      {/* Background Image - z-10 (above clouds) */}
      <div className="hero-bg fixed inset-0 z-10 pointer-events-none w-full h-full">
        {/* Desktop Background */}
        <Image
          src="/op.png"
          alt="Background"
          fill
          className="hero-bg-img hidden md:block object-contain scale-134"
          priority
        />
        {/* Mobile Background */}
        <Image
          src="/mobop.png"
          alt="Background"
          fill
          className="hero-bg-img block md:hidden object-contain scale-145 h-100vh"
          priority
        />

        <div className="hero-content absolute inset-0 z-20 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-apex text-5xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight mb-44 text-center">
            APEX COMPANION AI
          </h1>
          <p className="text-apex text-xl md:text-4xl tracking-widest uppercase mb-8">
            AI That Executes, Not Chats.
          </p>
          <p className="max-w-2xl text-apex text-lg md:text-xl font-light mb-12 leading-relaxed">
            Your personal AI companion that remembers you, helps you think clearly, and keeps you moving forward.
          </p>
          <Link href="/request-access">
            <button className="mystic-button pointer-events-auto">
              Request Access
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
