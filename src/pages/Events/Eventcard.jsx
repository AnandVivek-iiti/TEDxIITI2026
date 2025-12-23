import React from "react";
import EventData from "../../data/EventData";

export default function EventCard() {
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
        className="relative z-10 p-0.5"
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

                {/* CENTER — EMPTY (VISUAL BREATHING SPACE) */}
                <div className="flex-1" />

                {/* BOTTOM — SUBHEADING */}
                <div className="pb-30 px-6 text-center">
                  <p className="text-m  tracking-wide opacity-80">
                    {event.subheading}
                  </p>
                </div>
              </div>
            </div>

      })}
    </div>
  );
}
