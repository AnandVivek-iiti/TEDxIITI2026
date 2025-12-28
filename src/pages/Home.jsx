import React from 'react';
import WarpBackground from '../components/WarpBackground';
import Hero from '../components/Hero';
import F1Car from '../components/F1Car'; // Imports the updated F1CarScene
import WhatIsTedx from '../components/WhatIsTedx';
import Venue from '../components/Venue';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-red-600 selection:text-white">

      <div className="relative w-full h-screen">
        <WarpBackground />

        {/* Updated F1Car with correct Home page positioning */}
        <F1Car />

        <div className="absolute inset-0 pointer-events-none">
            <Hero />
        </div>

        <div className="absolute bottom-8 right-10 z-10 text-right opacity-30">
            <p className="text-[10px] font-black tracking-[0.5em]">EST. 2025</p>
            <p className="text-[8px] font-bold tracking-[0.2em] text-red-600">LIMITLESS INNOVATION</p>
        </div>
      </div>

      <main className="relative z-20 bg-black">
        <WhatIsTedx />
        <Venue />

      </main>
    </div>
  );
};

