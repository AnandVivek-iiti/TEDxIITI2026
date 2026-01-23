// EventCard.jsx
import React from "react";
import { motion, useTransform } from "framer-motion";

export default function EventCard({ event, progress }) {
  const scale = useTransform(progress, [0, 0.5, 1], [0.7, 1, 0.7]);
  const opacity = useTransform(progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(progress, [0, 1], [120, -120]);

  return (
    <motion.div
      style={{ scale, opacity, y }}
      className="relative w-full max-w-6xl"
    >
      <img src="/events/frame.png" className="w-full pointer-events-none" />

      <div
        className="absolute inset-[8%] overflow-hidden"
        style={{
          clipPath:
            "polygon(6% 0,100% 0,100% 94%,94% 100%,0 100%,0 6%)",
        }}
      >
        <img
          src={event.image}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 " />

        <div className="relative z-10 h-full flex flex-col">
          <div className="pt-16 text-center">
            <h1 className="tracking-[0.3em] text-xl text-white">
              {event.name}
            </h1>
          </div>

          <div className="flex-1" />

          <div className="pb-12 px-6 text-center">
            <p className="text-white/80">{event.subheading}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
