import { memo, useEffect, useState } from "react";

const TalkCardFrame = memo(function TalkCardFrame({ children, isFlipped }) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    if (!isFlipped) return;
    setGlitch(true);
    const t = setTimeout(() => setGlitch(false), 260);
    return () => clearTimeout(t);
  }, [isFlipped]);

  return (
    <div
      className={`relative h-full w-full p-[1px] group ${
        glitch ? "glitch-active" : ""
      }`}
      role="group"
      aria-live="polite"
    >
      {/* Outer Racing Border */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          isFlipped
            ? "bg-red-600 shadow-[0_0_30px_rgba(220,38,38,0.45)]"
            : "bg-neutral-800 group-hover:bg-neutral-700"
        }`}
        style={{
          clipPath:
            "polygon(0 0, 92% 0, 100% 8%, 100% 100%, 8% 100%, 0 92%)",
        }}
      />

      {/* Inner Container */}
      <div
        className="relative h-full w-full bg-[#050505] overflow-hidden"
        style={{
          clipPath:
            "polygon(0 0, 92% 0, 100% 8%, 100% 100%, 8% 100%, 0 92%)",
        }}
      >
        {/* HUD */}
        <div className="absolute top-3 right-8 z-40 flex items-center gap-2">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isFlipped ? "bg-red-600 animate-pulse" : "bg-green-500"
            }`}
          />
          <span className="text-[9px] font-mono text-white/50 tracking-widest uppercase">
            {isFlipped ? "DATA_LINK" : "LIVE_FEED"}
          </span>
        </div>

        {children}
      </div>
    </div>
  );
});

export default TalkCardFrame;