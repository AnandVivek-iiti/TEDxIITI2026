import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import eventsData from "../../data/EventData";
import Car from "./Animation.jsx";
/* -----------------------------------------
   EVENT FRAME COMPONENT
------------------------------------------ */
function EventFrame({ event, index, totalEvents, scrollYProgress }) {
  const segment = 1 / totalEvents;
  const start = index * segment;
  const mid = start + segment / 2;
  const end = start + segment;

  // Enhanced scale with overshoot effect
  const scale = useTransform(
    scrollYProgress,
    [start, mid - 0.02, mid, end],
    [0.5, 1.05, 1, 0.6]
  );

  // Smoother opacity transitions
  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.05, mid, end - 0.05, end],
    [0, 1, 1, 1, 0]
  );

  // Add subtle rotation for depth
  const rotateX = useTransform(
    scrollYProgress,
    [start, mid, end],
    [15, 0, -15]
  );

  // Blur effect for depth of field
  const blur = useTransform(
    scrollYProgress,
    [start, mid - 0.05, mid, end - 0.05, end],
    [10, 0, 0, 0, 10]
  );

  // Y position for entrance/exit animation
  const y = useTransform(
    scrollYProgress,
    [start, mid, end],
    [100, 0, -100]
  );

  return (
    <motion.div
      style={{
        scale,
        opacity,
        rotateX,
        y,
        filter: blur.get() > 0 ? `blur(${blur.get()}px)` : 'none'
      }}
      className="absolute z-20 flex items-center justify-center"
    >
      <motion.div
        className="relative w-full max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* FRAME WITH GLOW */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-2xl opacity-70 rounded-lg" />
          <img
            src="/events/frame.png"
            alt="frame"
            className="relative w-full pointer-events-none drop-shadow-2xl"
            style={{
              clipPath: "polygon(6% 0,100% 0,100% 94%,94% 100%,0 100%,0 10%)",
              filter: "drop-shadow(0 0 30px rgba(0,255,255,0.3))"
            }}
          />
        </div>

        {/* CONTENT */}
        <div className="absolute inset-[16%] overflow-hidden rounded-lg">
          {/* Image with parallax */}
          <motion.img
            src={event.image}
            alt={event.name}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              scale: useTransform(scrollYProgress, [start, end], [1.2, 1])
            }}
          />

          {/* Gradient overlays for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full text-center">
            <motion.div
              className="pt-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h1 className="text-[24px] md:text-[28px] font-display tracking-[0.3em] text-white drop-shadow-lg uppercase">
                {event.name}
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-4" />
            </motion.div>

            <div className="flex-1" />

            <motion.div
              className="pb-10 px-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <p className="text-sm md:text-base text-white/90 max-w-xl mx-auto leading-relaxed font-light tracking-wide">
                {event.subheading}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* -----------------------------------------
   MAIN SCROLL COMPONENT
------------------------------------------ */
export default function UnchartedLapScroll() {
  const { scrollYProgress } = useScroll();
  const totalEvents = eventsData.length;

  /* --- ROAD TRANSFORMATIONS --- */
  const roadScale = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1.6, 1.8]);
  const roadOpacity = useTransform(scrollYProgress, [0.92, 1], [1, 0]);
  const roadBrightness = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1.3]);

  // Enhanced road movement with more dramatic curves
  const roadX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0, 50, -50, 60, -40, 0]
  );
  const roadSkew = useTransform(scrollYProgress, [0, 0.5, 1], [0, -2, 4]);
  const roadRotate = useTransform(scrollYProgress, [0, 1], [0, 2]);

  /* --- CAR PARALLAX MOTION --- */
  const carY = useTransform(scrollYProgress, [0, 0.5, 1], [60, -20, -150]);
  const carScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.08, 1.15]);

  // Enhanced car rotation for dynamic feel
  const carRotate = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, -3, 2, -2, 3]
  );

  // Smooth road-following with drift effect
  const carX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0, 38, -42, 45, -35, 0]
  );

  // Add subtle tilt based on horizontal velocity
  const carSkewY = useTransform(carX, [-50, 50], [1.5, -1.5]);

  return (
    <div
      className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-black"
      style={{ height: `${totalEvents * 150}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">

        {/* Atmospheric effects */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyan-500/5 via-transparent to-purple-500/5" />
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* ROAD */}
        <motion.div
          style={{
            scale: roadScale,
            opacity: roadOpacity,
            x: roadX,
            skewY: roadSkew,
            rotateZ: roadRotate,
            filter: `brightness(${roadBrightness.get()})`
          }}
          className="absolute inset-0 z-0 origin-bottom bg-[url('/events/image.png')] bg-cover bg-bottom"
        />

        {/* CAR WITH ENHANCED EFFECTS */}
        <motion.div
          className="absolute bottom-[15%] z-30 pointer-events-none"
          style={{
            y: carY,
            x: carX,
            scale: carScale,
            rotateZ: carRotate,
            skewY: carSkewY,
          }}
        >
          <div className="car-container relative">
            {/* Car glow/trail effect */}
            <div className="absolute inset-0 scale-110" />

            {/* Headlight glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-yellow-300/20 blur-3xl rounded-full" />

            <img
              src="/events/Car1.png"
              alt="car"
              className="relative w-[344px] md:w-[400px] drop-shadow-[0_40px_60px_rgba(0,0,0,0.9)]"
              style={{
                filter: "drop-shadow(0 0 20px rgba(0,200,255,0.4))"
              }}
            />
          </div>
        </motion.div>

        {/* EVENTS */}
        {eventsData.map((event, index) => (
          <EventFrame
            key={event.id}
            event={event}
            index={index}
            totalEvents={totalEvents}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>

      <style>{`




        .car-container {
          animation: engineShake 0.15s infinite ease-in-out;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.5);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #06b6d4, #8b5cf6);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #0891b2, #7c3aed);
        }
      `}</style>
    </div>
  );
}

/* -----------------------------------------
   MAIN SCROLL COMPONENT
------------------------------------------ */
export default function UnchartedLapScroll() {
  const { scrollYProgress } = useScroll();
  const totalEvents = eventsData.length;

  /* --- ROAD TRANSFORMATIONS --- */
  const roadScale = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1.6, 1.8]);
  const roadOpacity = useTransform(scrollYProgress, [0.92, 1], [1, 0]);
  const roadBrightness = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1.3]);

  // Enhanced road movement with more dramatic curves
  const roadX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0, 50, -50, 60, -40, 0]
  );
  const roadSkew = useTransform(scrollYProgress, [0, 0.5, 1], [0, -2, 4]);
  const roadRotate = useTransform(scrollYProgress, [0, 1], [0, 2]);

  /* --- CAR PARALLAX MOTION --- */
  const carY = useTransform(scrollYProgress, [0, 0.5, 1], [60, -20, -150]);
  const carScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.08, 1.15]);

  // Enhanced car rotation for dynamic feel
  const carRotate = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, -3, 2, -2, 3]
  );

  // Smooth road-following with drift effect
  const carX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0, 38, -42, 45, -35, 0]
  );

  // Add subtle tilt based on horizontal velocity
  const carSkewY = useTransform(carX, [-50, 50], [1.5, -1.5]);

  return (
    <div
      className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-black"
      style={{ height: `${totalEvents * 150}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">

        {/* Atmospheric effects */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyan-500/5 via-transparent to-purple-500/5" />
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* ROAD */}
        <motion.div
          style={{
            scale: roadScale,
            opacity: roadOpacity,
            x: roadX,
            skewY: roadSkew,
            rotateZ: roadRotate,
            filter: `brightness(${roadBrightness.get()})`
          }}
          className="absolute inset-0 z-0 origin-bottom bg-[url('/events/image.png')] bg-cover bg-bottom"
        />

        {/* CAR WITH ENHANCED EFFECTS */}
        <motion.div
          className="absolute bottom-[15%] z-30 pointer-events-none"
          style={{
            y: carY,
            x: carX,
            scale: carScale,
            rotateZ: carRotate,
            skewY: carSkewY,
          }}
        >
          <div className="car-container relative">
            {/* Car glow/trail effect */}
            <div className="absolute inset-0 scale-110" />

            {/* Headlight glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-yellow-300/20 blur-3xl rounded-full" />

            <img
              src="/events/Car1.png"
              alt="car"
              className="relative w-[344px] md:w-[400px] drop-shadow-[0_40px_60px_rgba(0,0,0,0.9)]"
              style={{
                filter: "drop-shadow(0 0 20px rgba(0,200,255,0.4))"
              }}
            />
          </div>
        </motion.div>

        {/* EVENTS */}
        {eventsData.map((event, index) => (
          <EventFrame
            key={event.id}
            event={event}
            index={index}
            totalEvents={totalEvents}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>

      <style>{`




        .car-container {
          animation: engineShake 0.15s infinite ease-in-out;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.5);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #06b6d4, #8b5cf6);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #0891b2, #7c3aed);
        }
      `}</style>
    </div>
  );
}