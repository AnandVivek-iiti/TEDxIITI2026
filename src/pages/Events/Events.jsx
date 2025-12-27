import React, { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Car from "../../components/F1Car";
import eventsData from "../../data/EventData";

/* -----------------------------------------
   EVENT FRAME COMPONENT
------------------------------------------ */
function EventFrame({ event, index, totalEvents, scrollYProgress }) {
  const segment = 1 / totalEvents;
  const start = index * segment;
  const mid = start + segment / 2;
  const end = start + segment;

  const scale = useTransform(scrollYProgress, [start, mid], [0.6, 1]);
  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.04, end - 0.04, end],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      style={{ scale, opacity }}
      className="absolute z-20 flex items-center justify-center"
    >
      <div className="relative w-full max-w-2xl">
        {/* FRAME */}
        <img
          src="/events/frame.png"
          alt="frame"
          className="w-full pointer-events-none"
          style={{
            clipPath: "polygon(6% 0,100% 0,100% 94%,94% 100%,0 100%,0 10%)",
          }}
        />

        {/* CONTENT */}
        <div className="absolute inset-[6%] overflow-hidden">
          <img
            src={event.image}
            alt={event.name}
            className="absolute inset-0 w-full scale-60 h-full object-cover"
          />
          <div className="absolute inset-0 " />

          <div className="relative z-10 flex flex-col h-full text-center">
            <div className="pt-10">
              <h1 className="text-[22px] font-display tracking-[0.3em]">
                {event.name}
              </h1>
            </div>

            <div className="flex-1" />

            <div className="pb-10 px-6">
              <p className="text-sm opacity-80 max-w-xl mx-auto">
                {event.subheading}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* -----------------------------------------
   MAIN SCROLL COMPONENT
------------------------------------------ */
export default function UnchartedLapScroll() {
  const { scrollYProgress } = useScroll();
  const totalEvents = eventsData.length;

  /* ROAD */
  const roadScale = useTransform(scrollYProgress, [0, 1], [1, 1.6]);
  const roadOpacity = useTransform(scrollYProgress, [0.9, 1], [1, 0]);

  /* CAR */
  const carY = useTransform(scrollYProgress, [0, 1], [120, -80]);
  const carScale = useTransform(scrollYProgress, [0, 1], [0.85, 1.05]);
  const carX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0, -5, 5, -5, 5, 0]
  );
  const carRotateZ = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0, -2, 2, -2, 2, 0]
  );

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;

      // Normalize scroll
      const progress = Math.min(scrollY / 1200, 1);
      const curvePattern = [
        { start: 0, dir: 1 },
        { start: 800, dir: -1 },
        { start: 1600, dir: 1 },
      ];

      let direction = 1;
      curvePattern.forEach((p) => {
        if (scrollY > p.start) direction = p.dir;
      });

      const curveX = direction * Math.min((scrollY % 800) * 0.05, 40);

      // Curve values
      const skewY = progress * 2; // perspective skew
      const scale = 1 + progress * 0.08; // forward motion

      const road = document.getElementById("road-transform");
      if (road) {
        road.style.transform = `
          translateX(${curveX}px)
          skewY(${skewY}deg)
          scale(${scale})
        `;
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="relative bg-transparent"
      style={{ height: `${totalEvents * 120}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* ROAD */}
        <motion.div
          id="road-transform"
          style={{ scale: roadScale, opacity: roadOpacity }}
          className="absolute inset-0 z-0 origin-bottom bg-[url('/events/image.png')] bg-cover bg-bottom"
        />

        {/* CAR */}
        <motion.div
          style={{
            y: carY,
            scale: carScale,
            x: carX,
            rotateZ: carRotateZ,
          }}
          className="absolute bottom-[15vh] left-1/2 -translate-x-1/2 z-40 pointer-events-none"
        >
          <Car />
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
    </div>
  );
}