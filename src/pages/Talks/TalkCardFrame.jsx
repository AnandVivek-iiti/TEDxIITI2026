import { memo, useEffect, useState } from "react";
import "./Talk.css";

const TalkCardFrame = memo(function TalkCardFrame({ children, isFlipped }) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    if (!isFlipped) return;
    setGlitch(true);
    const t = setTimeout(() => setGlitch(false), 300);
    return () => clearTimeout(t);
  }, [isFlipped]);

  return (
    <div
      className={`relative h-full w-full p-4 transition-all duration-500 group ${
        glitch ? "glitch-active" : ""
      }`}
    >
      {/* Outer Neon Glow Boundary */}
      <div
        className={`absolute inset-0 transition-all duration-700 ${
          isFlipped 
            ? "bg-gradient-to-br from-red-500 to-red-700 opacity-20 blur-xl" 
            : "opacity-0"
        }`}
        style={{
          clipPath: 'polygon(12% 0, 88% 0, 100% 12%, 100% 88%, 88% 100%, 12% 100%, 0 88%, 0 12%)'
        }}
      />

      {/* Main Tech Frame */}
      <div
        className={`relative h-full w-full bg-[#0d0d0d] border transition-all duration-500 shadow-2xl overflow-hidden ${
           isFlipped 
             ? "border-red-500/60 shadow-[0_0_20px_rgba(220,38,38,0.3)]" 
             : "border-neutral-800 hover:border-red-500/40"
        }`}
        style={{
          clipPath: 'polygon(12% 0, 88% 0, 100% 12%, 100% 88%, 88% 100%, 12% 100%, 0 88%, 0 12%)'
        }}
      >
        {/* HUD Elements */}
        <div className="absolute top-4 right-4 z-40 flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${isFlipped ? 'bg-red-500 animate-pulse' : 'bg-neutral-600'}`} />
          {/* Inherits Orbitron from global, added font-bold for clarity */}
          <span className="text-[9px] font-bold text-white/40 tracking-widest uppercase">
            {isFlipped ? "DATA_LINK" : "LIVE"}
          </span>
        </div>

        {/* Decorative Side Bars */}
        <div className="absolute top-1/2 left-2 -translate-y-1/2 w-[2px] h-12 bg-red-600/20 group-hover:bg-red-600 group-hover:shadow-[0_0_8px_#dc2626] transition-all duration-500" />
        <div className="absolute top-1/2 right-2 -translate-y-1/2 w-[2px] h-12 bg-red-600/20 group-hover:bg-red-600 group-hover:shadow-[0_0_8px_#dc2626] transition-all duration-500" />

        {children}
      </div>
    </div>
  );
});

export default TalkCardFrame;