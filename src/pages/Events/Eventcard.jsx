export default function EventCard({ event }) {
  const clip =
    "polygon(12% 0, 100% 0, 100% 88%, 88% 100%, 0 100%, 0 12%)";

  return (
    <div className="relative group w-80">
      {/* OUTER GLOW */}
      <div
        className="absolute inset-0 z-0 opacity-60 group-hover:opacity-100 transition duration-300"
        style={{
          clipPath: clip,
          background:
            "linear-gradient(135deg,#ec4899,#a855f7,#3b82f6,#06b6d4)",
          filter: "blur(10px)",
        }}
      />

      {/* BORDER WRAPPER */}
      <div
        className="relative z-10 p-[2px]"
        style={{
          clipPath: clip,
          background:
            "linear-gradient(135deg,#ec4899,#a855f7,#3b82f6,#06b6d4)",
        }}
      >
        {/* CARD BODY */}
        <div
          className="relative bg-[#070b18] overflow-hidden
          group-hover:-translate-y-2 transition-transform duration-300"
          style={{ clipPath: clip }}
        >
          {/* IMAGE */}
          <div
            className="relative h-64 overflow-hidden"
            style={{
              clipPath:
                "polygon(8% 0, 100% 0, 100% 92%, 92% 100%, 0 100%, 0 8%)",
            }}
          >
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-full object-cover
              group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* NAME BAR */}
          <div className="absolute bottom-0 left-0 right-0 bg-[#0b1024]/90 px-4 py-3">
            <h3 className="text-white font-bold text-lg tracking-widest text-center uppercase">
              {event.name}
            </h3>
          </div>

          {/* HOVER DESCRIPTION */}
          <div
            className="absolute inset-0 z-20 flex items-center justify-center
            bg-[#050914]/95 px-6 text-center
            opacity-0 translate-y-6
            group-hover:opacity-100 group-hover:translate-y-0
            transition-all duration-300"
          >
            <p className="text-cyan-300 text-sm leading-relaxed">
              {event.subheading}
            </p>
          </div>
        </div>
      </div>

      {/* SOFT HOVER PULSE */}
      <div
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-30 transition duration-300 pointer-events-none"
        style={{
          clipPath: clip,
          background:
            "radial-gradient(circle at center,#22d3ee,transparent 70%)",
          filter: "blur(18px)",
        }}
      />
    </div>
  );
}
