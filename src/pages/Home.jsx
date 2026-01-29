import React from 'react';
// import WarpBackground from '../components/WarpBackground'; // Disabled to prevent conflict
import Hero from '../components/Hero';
// import F1Car from '../components/F1Car'; // Disabled: Hero now creates its own 3D car scene
import WhatIsTedx from '../components/WhatIsTedx';
import Venue from '../components/Venue';
// import Footer from '../components/Footer'; // Assuming Footer exists in your project structure

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-red-600 selection:text-white">
      
      {/* The Hero component now contains the Full 3D Canvas, Cursor, and HUD.
          We do not need WarpBackground or F1Car here anymore as Hero handles the visuals.
      */}
      <Hero />

      <main className="relative z-20 bg-black">
        <WhatIsTedx />
        <Venue />
        {/* <Footer /> */}
      </main>
    </div>
  );
}