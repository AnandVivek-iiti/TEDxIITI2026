import React from 'react';
// import CustomCursor from '../components/CustomCursor';
import F1Car from '../components/F1Car';
import Hero from '../components/Hero';
import WarpBackground from '../components/WarpBackground'; 

export default function HomePage() {
  return (
    <div className="relative w-full min-h-screen bg-[#050505] text-white overflow-hidden cursor-none">
      {/* <CustomCursor /> */}
      <WarpBackground />

      

      <main className="relative">
        <div className="relative z-30 pointer-events-none">
          <Hero />
        </div>
        <F1Car /> 
      </main>

      {/* Footer Info */}
      <div className="absolute bottom-8 right-10 z-10 text-right opacity-30">
        <p className="text-[10px] font-black tracking-[0.5em]">EST. 2025</p>
        <p className="text-[8px] font-bold tracking-[0.2em] text-red-600">LIMITLESS INNOVATION</p>
      </div>
    </div>
  );
}