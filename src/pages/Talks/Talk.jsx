"use client";
import { memo, useEffect, useState } from "react";
import talks from "../../data/Talksdata";
import WarpBackground from "../../components/WarpBackground";
import "./Talk.css";
// --- 1. THE FRAME COMPONENT ---
// This handles the "glitch" state and the racing borders
const TalkCardFrame = ({ children, isFlipped }) => {
  const [triggerGlitch, setTriggerGlitch] = useState(false);

  useEffect(() => {
    setTriggerGlitch(true);
    const timer = setTimeout(() => setTriggerGlitch(false), 300);
    return () => clearTimeout(timer);
  }, [isFlipped]);

  return (
    <div
      className={`relative h-full w-full p-[1px] group ${
        triggerGlitch ? "glitch-active" : ""
      }`}
    >
      {/* Animated Racing Border with Glow */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          isFlipped
            ? "bg-gradient-to-br from-red-600 via-red-500 to-red-700 shadow-[0_0_35px_rgba(220,38,38,0.6),inset_0_0_20px_rgba(220,38,38,0.3)] animate-pulse-glow"
            : "bg-gradient-to-br from-neutral-800 via-neutral-700 to-neutral-900 group-hover:from-neutral-700 group-hover:via-neutral-600 group-hover:to-neutral-800 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        }`}
        style={{
          clipPath: "polygon(0 0, 92% 0, 100% 8%, 100% 100%, 8% 100%, 0 92%)",
        }}
      >
        {/* Racing Stripe Animation */}
        <div
          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden ${
            isFlipped ? "opacity-100" : ""
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-racing-stripe" />
        </div>
      </div>

      {/* Internal Content Container */}
      <div
        className="relative h-full w-full bg-gradient-to-br from-[#050505] to-[#0a0a0a] overflow-hidden"
        style={{
          clipPath: "polygon(0 0, 92% 0, 100% 8%, 100% 100%, 8% 100%, 0 92%)",
        }}
      >
        {/* Animated Scan Lines */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div
            className="h-full w-full animate-scan-line"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
            }}
          />
        </div>

        {/* Corner Accents */}
        <div
          className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-red-600/30 animate-corner-pulse"
          style={{ clipPath: "polygon(100% 0, 100% 0%, 100% 100%, 0% 100%)" }}
        />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-red-600/20" />

        {/* HUD Elements with Enhanced Animation */}
        <div className="absolute top-3 right-8 z-50 flex items-center gap-2 animate-fade-in-right">
          <span
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              isFlipped
                ? "bg-red-600 animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.8)]"
                : "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"
            }`}
          />
        </div>
        {children}
      </div>
    </div>
  );
};

// --- 2. THE MAIN PAGE ---
export default function TalksPage() {
  const [season, setSeason] = useState("ALL");
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const seasons = ["ALL", ...new Set(talks.map((t) => t.date))].sort(
    (a, b) => b - a
  );
  const filtered =
    season === "ALL" ? talks : talks.filter((t) => t.date === season);

  return (
    <div className="min-h-screen text-white font-sans bg-[#050505] selection:bg-red-600 bg-[url('/Talks/bg.png')] bg-fixed speed-lines-bg">
      <WarpBackground />

      {/* ===== HERO SECTION ===== */}
      <section className="relative h-[45vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-[#050505] z-10" />
        <div className="relative z-20 text-center px-4">
          <h1 className="font-[Orbitron] text-6xl md:text-8xl font-black italic tracking-tighter">
            RACE{" "}
            <span className="text-stroke-red text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500">
              OF IDEAS
            </span>
          </h1>
          <p className="mt-4 text-neutral-400 font-mono text-xs uppercase tracking-[0.5em]">
            Indore Grand Prix Protocol
          </p>
        </div>
      </section>

      {/* ===== DASHBOARD CONTROLS ===== */}
      <div className="sticky top-0 z-40 backdrop-blur-md bg-black/20 border-b border-white/5">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="flex flex-wrap justify-center gap-4">
            {seasons.map((y) => (
              <button
                key={y}
                onClick={() => setSeason(y)}
                className={`px-8 py-2 text-xs font-[Orbitron] font-bold tracking-widest clip-path-slant transition-all duration-300 ${
                  season === y
                    ? "bg-red-600 text-white shadow-lg"
                    : "bg-neutral-900 text-neutral-500 hover:text-white"
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ===== TALKS GRID ===== */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filtered.map((talk, i) => (
            <div
              key={`${season}-${i}`}
              className="perspective-1000 h-[520px] w-full"
              style={{
                animation: `fadeInUp 0.6s ease-out forwards`,
                animationDelay: `${i * 100}ms`,
                opacity: 0,
              }}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <TalkCardFrame isFlipped={hoveredIndex === i}>
                <div
                  className={`relative w-full h-full transition-transform duration-700 preserve-3d ${
                    hoveredIndex === i ? "rotate-y-180" : ""
                  }`}
                >
                  {/* FRONT SIDE */}
                  <div className="absolute inset-0 backface-hidden w-full h-full flex flex-col">
                    {/* VIDEO CONTAINER - Interactive */}
                    <div className="relative aspect-video w-full bg-black z-10">
                      <iframe
                        src={talk.link}
                        title={talk.title}
                        allowFullScreen
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* TEXT AREA - This triggers the flip */}
                    <div
                      className="p-8 flex-grow flex flex-col justify-between bg-neutral-900/20 cursor-help"
                      onMouseEnter={() => setHoveredIndex(i)}
                    >
                      <div>
                        <h3 className="text-xl font-[Orbitron] font-black italic uppercase text-white leading-[1.1] group-hover:text-red-500 transition-colors">
                          {talk.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* BACK SIDE (Telemetry) */}
                  <div className="absolute inset-0 backface-hidden w-full h-full bg-[#0a0a0a] p-10 rotate-y-180 flex flex-col border-2 border-red-600/20">
                    <div className="mb-6">
                      <h2 className="text-3xl font-[Orbitron] font-black italic uppercase text-white tracking-tighter">
                        {talk.speaker}
                      </h2>
                    </div>

                    <div className="flex-grow overflow-y-auto pr-4 mb-6 custom-scrollbar">
                      <p className="text-sm text-neutral-400 font-light leading-relaxed font-mono">
                        {talk.description}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                      <div className="flex gap-8">
                        <div className="font-mono">
                          <p className="text-[9px] text-neutral-600 uppercase mb-1">
                            Views
                          </p>
                          <p className="text-sm text-white font-bold">
                            {talk.views}{" "}
                            <span className="text-[10px] text-neutral-500 font-normal">
                              pts
                            </span>
                          </p>
                        </div>
                        <div className="font-mono">
                          <p className="text-[9px] text-neutral-600 uppercase mb-1">
                            Likes
                          </p>
                          <p className="text-sm text-red-500 font-bold">
                            {talk.likes}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-neutral-600 text-[9px] font-mono uppercase">
                          date
                        </p>
                        <p className="text-white font-[Orbitron] text-xs font-bold">
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
  );
}
