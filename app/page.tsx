'use client';

import { useRef, useEffect, useState } from 'react';
import Hero from '@/sections/Hero';
import ChooseYourMode from '@/sections/ChooseYourMode';
import MemoryEngine from '@/sections/MemoryEngine';
import DailyAccountability from '@/sections/DailyAccountability';
import IdentityLayer from '@/sections/IdentityLayer';
import CrisisGuard from '@/sections/CrisisGuard';
import CinematicIntro from '@/components/CinematicIntro';

export default function Home() {
  // Intro State
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Check if user has already seen the intro in this session
    const hasSeenIntro = sessionStorage.getItem('apex_intro_seen');
    if (hasSeenIntro) {
      setShowIntro(false);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem('apex_intro_seen', 'true');
  };

  return (
    <main className="min-h-screen text-white">
      {showIntro && <CinematicIntro onComplete={handleIntroComplete} />}

      <div className="relative z-10 w-full">
        <Hero />
      </div>

      <div id="intro-trigger" className="relative z-20">
        <ChooseYourMode />
        <MemoryEngine />
        <DailyAccountability />
        <IdentityLayer />
        <CrisisGuard />
      </div>
    </main>
  );
}
