"use client";
import { useEffect, useState } from "react";
import talks from "../../data/Talksdata";
import WarpBackground from "../../components/WarpBackground";
import "./Talk.css";

const TalkCardFrame = ({ children, isFlipped }) => {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    setGlitch(true);
    const timer = setTimeout(() => setGlitch(false), 250);
    return () => clearTimeout(timer);
  }, [isFlipped]);

  return (
    <div
      className={`relative h-full w-full p-[2px] transition-all duration-300 ${
        glitch ? "scale-[0.98] brightness-150" : "scale-100"
      }`}
    >
      {/* Outer Tech Border */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          isFlipped
            ? "bg-red-600 shadow-[0_0_30px_rgba(220,38,38,0.4)]"
            : "bg-neutral-800"
        }`}
        style={{
          clipPath: "polygon(0 0, 95% 0, 100% 5%, 100% 100%, 5% 100%, 0 95%)",
        }}
      />

      <div
        className="relative h-full w-full bg-[#050505] overflow-hidden"
        style={{
          clipPath: "polygon(0 0, 95% 0, 100% 5%, 100% 100%, 5% 100%, 0 95%)",
        }}
      >
        {/* Animated Scanline Overlay */}
        <div className="absolute inset-0 pointer-events-none z-20 opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />

        {children}
      </div>
    </div>
  );
};

export default function TalksPage() {
  const [season, setSeason] = useState("ALL");
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const seasons = ["ALL", ...new Set(talks.map((t) => t.date))].sort(
    (a, b) => b - a
  );
  const filtered =
    season === "ALL" ? talks : talks.filter((t) => t.date === season);

  return (
    <div className="min-h-screen text-white font-sans bg-[#050505] selection:bg-red-600">
      <WarpBackground />

      {/* ===== HERO SECTION ===== */}
      <section className="relative h-[35vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-[#050505] z-10" />
        <div className="relative z-20 text-center px-4">
          <h1 className="font-[Orbitron] text-6xl md:text-8xl font-black italic tracking-tighter">
            RACE{" "}
            <span className="text-stroke-red text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500">
              OF IDEAS
            </span>
          </h1>
          <p className="mt-4 text-neutral-400 font-mono text-xs uppercase tracking-[0.5em]">
           IIT Indore Grand Prix Protocol
          </p>
        </div>
      </section>

      {/* SELECTION CONTROLS */}
      <div className="sticky top-0 z-50 py-4  backdrop-blur-xl border-y border-white/5">
        <div className="flex justify-center gap-2">
          {seasons.map((y) => (
            <button
              key={y}
              onClick={() => setSeason(y)}
              className={`px-6 py-1 text-[10px] font-bold transition-all clip-path-slant ${
                season === y
                  ? "bg-red-600 text-white"
                  : "bg-neutral-900 text-neutral-500 hover:bg-neutral-800"
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      {/* GRID */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((talk, i) => (
            <div
              key={`${season}-${i}`}
              className="perspective-1000 h-[500px] w-full cursor-pointer"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <TalkCardFrame isFlipped={hoveredIndex === i}>
                <div
                  className={`relative w-full h-full transition-transform duration-700 preserve-3d ${
                    hoveredIndex === i ? "rotate-y-180" : ""
                  }`}
                >
                  {/* FRONT SIDE */}
                  <div className="absolute inset-0 backface-hidden w-full h-full flex flex-col bg-neutral-900/40">
                    <div className="relative h-2/3 bg-black">
                      <iframe
                        src={talk.link}
                        title={talk.title}
                        className="w-full h-full pointer-events-none opacity-80 group-hover:opacity-100"
                      />
                    </div>
                    <div className="p-6 flex-grow border-t border-red-600/20">
                      <h3 className="text-lg font-[Orbitron] font-bold uppercase leading-tight tracking-tight italic">
                        {talk.title}
                      </h3>
                    </div>
                  </div>

                  {/* BACK SIDE (Telemetry) */}
                  <div className="absolute inset-0 backface-hidden w-full h-full bg-[#0a0a0a] p-8 rotate-y-180 flex flex-col">
                    <div className="border-l-4 border-red-600 pl-4 mb-6">
                      <h2 className="text-2xl font-[Orbitron] font-black italic uppercase text-white tracking-tighter">
                        {talk.speaker}
                      </h2>
                    </div>

                    <div className="flex-grow overflow-y-auto custom-scrollbar mb-6">
                      <p className="text-xs text-neutral-400 font-mono leading-relaxed">
                        {talk.description}
                      </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                      <div className="bg-neutral-900/50 p-3 border-r border-red-600/30">
                        <p className="text-[8px] text-neutral-500 uppercase font-mono">
                          Engagement
                        </p>
                        <p className="text-lg font-bold text-white font-[Orbitron]">
                          {talk.views}{" "}
                          <span className="text-[9px] text-red-600 italic">
                            pts
                          </span>
                        </p>
                      </div>
                      <div className="bg-neutral-900/50 p-3">
                        <p className="text-[8px] text-neutral-500 uppercase font-mono">
                          Launch Date
                        </p>
                        <p className="text-lg font-bold text-white font-[Orbitron]">
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
