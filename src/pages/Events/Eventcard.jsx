import React from "react";
import EventData from "../../data/EventData";

export default function EventCard() {
  return (

    <div className="relative w-full max-w-5xl px-10">
      {/* EVENT FRAMES */}
  {EventData.map((event) => {

            {/* FRAME IMAGE */}
            <img
              src="/events/frame1.png"
              alt="frame"
              className="w-full pointer-events-none"
            />

            {/* FRAME WINDOW (IMAGE + TEXT INSIDE FRAME) */}
            <div
              className="absolute inset-[8%] overflow-hidden flex flex-col"
              style={{
                clipPath: "polygon(6% 0,100% 0,100% 94%,94% 100%,0 100%,0 6%)",
              }}
            >
              {/* BACKGROUND IMAGE */}
              <img
                src={event.image}
                alt={event.name}
                className="absolute inset-0 w-full h-full object-cover scale-50"
              />

              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-black/50" />

              {/* CONTENT LAYER */}
              <div className="relative z-10 flex flex-col h-full">
                {/* TOP — EVENT NAME */}
                <div className="pt-20 text-center">
                  <h1 className="text-[22px] font-display tracking-[0.3em]">
                    {event.name}
                  </h1>
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
