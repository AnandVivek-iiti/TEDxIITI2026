"use client";
import { useEffect, useState } from "react";
import talks from "../../data/Talksdata";
import WarpBackground from "../../components/WarpBackground";
import TalkCardFrame from "./TalkCardFrame";
import "./Talk.css";

export default function TalksPage() {
  const [season, setSeason] = useState("ALL");
  const [flippedIndex, setFlippedIndex] = useState(null);

  const seasons = ["ALL", ...new Set(talks.map((t) => t.date))].sort(
    (a, b) => b - a,
  );
  const filtered =
    season === "ALL" ? talks : talks.filter((t) => t.date === season);
  const getEmbedUrl = (url) => {
    if (url.includes("embed")) return url;
    const id = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${id}`;
  };

  const handleCardClick = (index) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  return (
    <div className="relative min-h-screen text-white bg-[#050505] selection:bg-red-600 overflow-x-hidden font-orbitron-global">

      {/* Background Component */}
      <WarpBackground />

      {/* Content Container */}
      <div className="relative z-10">

        {/* ===== HERO SECTION ===== */}
        <section className="pt-20 sm:pt-32 pb-12 sm:pb-16 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter italic mb-4 sm:mb-6">
            <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">Race of </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 drop-shadow-[0_0_25px_rgba(220,38,38,0.5)]">
              Ideas
            </span>
          </h1>

          <div className="flex items-center gap-2 sm:gap-4 opacity-80">
            <div className="h-[1px] w-8 sm:w-12 bg-red-600/50" />
            <p className="text-[8px] sm:text-[10px] md:text-xs text-red-500 uppercase tracking-[0.3em] sm:tracking-[0.4em] font-bold">
              Indore Grand Prix Protocol
            </p>
            <div className="h-[1px] w-8 sm:w-12 bg-red-600/50" />
          </div>
        </section>

        {/* ===== CONTROLS ===== */}
        <div className="sticky top-0 z-50 py-4 sm:py-6 bg-gradient-to-b from-[#050505] via-[#050505]/95 to-transparent backdrop-blur-sm">
          <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 px-4 flex-wrap">
            {seasons.map((y) => (
              <button
                key={y}
                onClick={() => {
                  setSeason(y);
                  setFlippedIndex(null); // Reset flipped cards when changing season
                }}
                className={`relative px-4 sm:px-6 md:px-8 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 clip-path-button ${
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
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {filtered.map((talk, i) => (
              <div
                key={`${season}-${i}`}
                className="perspective-1000 h-[400px] sm:h-[450px] lg:h-[480px] w-full cursor-pointer group/card"
                onClick={() => handleCardClick(i)}
              >
                <TalkCardFrame isFlipped={flippedIndex === i}>
                  <div
                    className={`relative w-full h-full transition-transform duration-700 preserve-3d ${
                      flippedIndex === i ? "rotate-y-180" : ""
                    }`}
                  >
                    {/* FRONT SIDE */}
                    <div className="absolute inset-0 backface-hidden w-full h-full flex flex-col bg-[#0a0a0a]">
                      <div className="relative h-3/5 w-full bg-black overflow-hidden border-b border-red-600/20">
                         {/* Scanning Line (Active Only) */}
                        <div className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-300 ${flippedIndex === i ? 'opacity-0' : 'opacity-0 group-hover/card:opacity-100'}`}>
                          <div className="h-1/2 w-full bg-gradient-to-b from-red-500/10 to-transparent absolute top-[-50%] animate-scan" />
                        </div>

                          <iframe
      src={getEmbedUrl(talk.link)}
      title={talk.title}
      className="w-full h-full"
      allowFullScreen
    />
                      </div>

                      <div className="flex-grow p-4 sm:p-6 flex flex-col justify-center relative">
                        <div className="mb-2 w-6 sm:w-8 h-1 bg-red-600/50" />
                        <h3 className="text-base sm:text-lg lg:text-xl font-black text-white uppercase leading-tight tracking-tighter italic group-hover/card:text-red-500 transition-colors">
                          {talk.title}
                        </h3>
                        <p className="text-[10px] sm:text-xs text-neutral-500 mt-2 uppercase tracking-wide">
                          Click to view details
                        </p>
                      </div>
                    </div>

                    {/* BACK SIDE (Telemetry Data) */}
                    <div className="absolute inset-0 backface-hidden w-full h-full bg-[#080808] p-5 sm:p-6 lg:p-8 rotate-y-180 flex flex-col">
                      <div className="border-l-4 border-red-600 pl-3 sm:pl-5 mb-4 sm:mb-6">
                        <p className="text-[9px] sm:text-[10px] text-neutral-500 uppercase tracking-widest mb-1 font-bold">Speaker_ID</p>
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-black italic uppercase text-white tracking-tight">
                          {talk.speaker}
                        </h2>
                      </div>

                      <div className="flex-grow overflow-y-auto custom-scrollbar pr-2 mb-4 sm:mb-6">
                        <p className="text-[11px] sm:text-xs text-neutral-400 leading-relaxed text-justify font-medium tracking-wide">
                          {talk.description}
                        </p>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-red-900/30">
                        <div className="bg-red-900/5 p-2 sm:p-3 border border-red-900/20">
                          <p className="text-[8px] sm:text-[9px] text-red-400 uppercase font-bold tracking-widest mb-1">
                            Views
                          </p>
                          <p className="text-base sm:text-lg lg:text-xl font-black text-white tabular-nums tracking-tighter">
                            {talk.views}
                          </p>
                        </div>
                        <div className="bg-red-900/5 p-2 sm:p-3 border border-red-900/20">
                          <p className="text-[8px] sm:text-[9px] text-red-400 uppercase font-bold tracking-widest mb-1">
                            Date
                          </p>
                          <p className="text-base sm:text-lg lg:text-xl font-black text-white tabular-nums tracking-tighter">
                            {talk.date}
                          </p>
                        </div>
                      </div>

                      {/* Watch Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(talk.link, "_blank", "noopener,noreferrer");
                        }}
                        className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 sm:py-3 text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(220,38,38,0.4)] hover:shadow-[0_0_25px_rgba(220,38,38,0.6)]"
                        style={{
                          clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0% 100%)'
                        }}
                      >
                        Watch Talk →
                      </button>
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