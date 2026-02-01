"use client";
import { useEffect, useState } from "react";
import talks from "../../data/Talksdata";
import WarpBackground from "../../components/WarpBackground";
import TalkCardFrame from "./TalkCardFrame";
import "./Talk.css";

export default function TalksPage() {
  const [season, setSeason] = useState("ALL");
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const seasons = ["ALL", ...new Set(talks.map((t) => t.date))].sort(
    (a, b) => b - a
  );
  const filtered =
    season === "ALL" ? talks : talks.filter((t) => t.date === season);

  return (
    // Added 'font-orbitron-global' to enforce the font everywhere
    <div className="relative min-h-screen text-white bg-[#050505] selection:bg-red-600 overflow-x-hidden font-orbitron-global">
      
      {/* Background Component */}
      <WarpBackground />

      {/* Content Container */}
      <div className="relative z-10">
        
        {/* ===== HERO SECTION ===== */}
        <section className="pt-32 pb-16 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter italic mb-6">
            <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">Race of </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 drop-shadow-[0_0_25px_rgba(220,38,38,0.5)]">
              Ideas
            </span>
          </h1>
          
          <div className="flex items-center gap-4 opacity-80">
            <div className="h-[1px] w-12 bg-red-600/50" />
            {/* Replaced font-mono with global font, adjusted tracking for look */}
            <p className="text-[10px] md:text-xs text-red-500 uppercase tracking-[0.4em] font-bold">
              Indore Grand Prix Protocol
            </p>
            <div className="h-[1px] w-12 bg-red-600/50" />
          </div>
        </section>

        {/* ===== CONTROLS ===== */}
        <div className="sticky top-0 z-50 py-6 bg-gradient-to-b from-[#050505] via-[#050505]/95 to-transparent backdrop-blur-sm">
          <div className="flex justify-center gap-4">
            {seasons.map((y) => (
              <button
                key={y}
                onClick={() => setSeason(y)}
                className={`relative px-8 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 clip-path-button ${
                  season === y
                    ? "bg-red-600 text-black shadow-[0_0_20px_rgba(220,38,38,0.6)]"
                    : "bg-neutral-900/80 text-neutral-500 hover:text-white hover:bg-neutral-800 border border-neutral-800"
                }`}
                style={{
                  clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)'
                }}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        {/* ===== GRID ===== */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filtered.map((talk, i) => (
              <div
                key={`${season}-${i}`}
                className="perspective-1000 h-[480px] w-full cursor-pointer group/card"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                // Added onClick handler to open link in new tab
                onClick={() => window.open(talk.link, "_blank", "noopener,noreferrer")}
              >
                <TalkCardFrame isFlipped={hoveredIndex === i}>
                  <div
                    className={`relative w-full h-full transition-transform duration-700 preserve-3d ${
                      hoveredIndex === i ? "rotate-y-180" : ""
                    }`}
                  >
                    {/* FRONT SIDE */}
                    <div className="absolute inset-0 backface-hidden w-full h-full flex flex-col bg-[#0a0a0a]">
                      <div className="relative h-3/5 w-full bg-black overflow-hidden border-b border-red-600/20">
                         {/* Scanning Line (Hover Only) */}
                        <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover/card:opacity-100">
                          <div className="h-1/2 w-full bg-gradient-to-b from-red-500/10 to-transparent absolute top-[-50%] animate-scan" />
                        </div>
                        
                        <iframe
                          src={talk.link}
                          title={talk.title}
                          className="w-full h-full pointer-events-none opacity-70 grayscale group-hover/card:grayscale-0 group-hover/card:opacity-100 transition-all duration-500"
                        />
                      </div>
                      
                      <div className="flex-grow p-6 flex flex-col justify-center relative">
                        <div className="mb-2 w-8 h-1 bg-red-600/50" />
                        <h3 className="text-xl font-black text-white uppercase leading-none tracking-tighter italic group-hover/card:text-red-500 transition-colors">
                          {talk.title}
                        </h3>
                      </div>
                    </div>

                    {/* BACK SIDE (Telemetry Data) */}
                    <div className="absolute inset-0 backface-hidden w-full h-full bg-[#080808] p-8 rotate-y-180 flex flex-col">
                      <div className="border-l-4 border-red-600 pl-5 mb-6">
                        <p className="text-[10px] text-neutral-500 uppercase tracking-widest mb-1 font-bold">Speaker_ID</p>
                        <h2 className="text-2xl font-black italic uppercase text-white tracking-tight">
                          {talk.speaker}
                        </h2>
                      </div>

                      <div className="flex-grow overflow-y-auto custom-scrollbar pr-2 mb-6">
                        {/* Description text also uses Orbitron now, but lighter weight for readability */}
                        <p className="text-xs text-neutral-400 leading-relaxed text-justify font-medium tracking-wide">
                          {talk.description}
                        </p>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-red-900/30">
                        <div className="bg-red-900/5 p-3 border border-red-900/20">
                          <p className="text-[9px] text-red-400 uppercase font-bold tracking-widest mb-1">
                            Views
                          </p>
                          <p className="text-xl font-black text-white tabular-nums tracking-tighter">
                            {talk.views}
                          </p>
                        </div>
                        <div className="bg-red-900/5 p-3 border border-red-900/20">
                          <p className="text-[9px] text-red-400 uppercase font-bold tracking-widest mb-1">
                            Date
                          </p>
                          <p className="text-xl font-black text-white tabular-nums tracking-tighter">
                            {talk.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TalkCardFrame>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}