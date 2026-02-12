'use client';

import { useRef, useEffect, useState } from 'react';
import Hero from '@/sections/Hero';
import ThreeClouds from '@/sections/ThreeClouds';
import LightningOverlay from '@/sections/LightningOverlay';
import DemoSection from '@/sections/DemoSection';
import IntroSection from '@/components/features/IntroSection';
import WhyItIsDifferent from '@/components/features/WhyItIsDifferent';
import FinalCTA from '@/sections/FinalCTA';
import CinematicIntro from '@/components/CinematicIntro';

export default function Home() {
  // Intro State
  const [showIntro, setShowIntro] = useState(true);

  if (showIntro) {
    return <CinematicIntro onComplete={() => setShowIntro(false)} />;
  }

  return (
    <main className=" min-h-screen text-white">
      <div className="relative z-10">
        <Hero />
      </div>

      <div id="intro-trigger" className="relative z-20">
        <DemoSection>
          <IntroSection />
          <WhyItIsDifferent />
          <FinalCTA />
        </DemoSection>
      </div>
    </main>
  );
}
