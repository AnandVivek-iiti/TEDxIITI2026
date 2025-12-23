import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Car from "./Car";
import eventsData from "../../data/EventData";
// import EventCard from "./Eventcard";
// import Button from "../../components/Button";
// import { Link } from "react-router-dom";

export default function UnchartedLapScroll() {
  const { scrollYProgress } = useScroll();
  const totalEvents = eventsData.length;

  // --- ROAD MOTION ---
  const roadScale = useTransform(scrollYProgress, [0, 1], [1, 2.3]);
  const roadOpacity = useTransform(scrollYProgress, [0.9, 1], [1, 0]);

  // --- CAR MOTION ---
  // Moves the car from 20% down the screen to -20% (moving forward)
  const carY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  // Makes the car grow slightly as it "approaches"
  const carScale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);
  // Optional: Add a subtle side-to-side sway
  const carX = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, -5, 5, -5, 5, 0]);

  return (
    <div className="relative h-[1200vh] bg-lap-coffee">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">

        {/* ROAD */}
        <motion.div
          style={{ scale: roadScale, opacity: roadOpacity }}
          className="absolute inset-0 bg-[url('/events/image.png')] bg-cover bg-bottom"
        >
          <div className="absolute inset-0 bg-lap-noise opacity-0" />
        </motion.div>

        {/* THE CAR */}
        {/* We wrap the Car component in a motion.div to control its movement */}
        <motion.div
          style={{
            y: carY,
            scale: carScale,
            x: carX,
            zIndex: 50
          }}
          className="pointer-events-none"
        >
          <Car />
        </motion.div>

        {/* EVENT FRAMES */}
        {eventsData.map((event, index) => {
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
              key={event.id}
              style={{ scale, opacity }}
              className="absolute z-10 flex flex-col items-center gap-6"
            >
              {/* Your existing Frame logic */}
              <div className="relative w-full max-w-2xl ">
                <img
                style={{
                    clipPath:
                      "polygon(6% 0,100% 0%,100% 94%,94% 100%,0 100%,0 10%)",
                  }}
                  src="/events/frame2.png"
                  alt="frame"
                  className="w-full pointer"
                />

                <div
                  className="absolute inset-[0%] overflow-hidden flex flex-col"

                >
                  <img
                    src={event.image}
                    alt={event.name}
                    className="absolute w-full h-full object-cover scale-50"
                  />
                  <div className="absolute  " />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="pt-15 text-center">
                      <h1 className="text-[22px] font-display tracking-[0.3em]">
                        {event.name}
                      </h1>
                    </div>
                    <div className="flex-1  max-w-xl" />
                    <div className="pb-15 px-30 text-center">
                      <p className="text-m max-w-xl opacity-80">
                        {event.subheading}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
// import React, { useEffect } from "react";

// import Car from "./Car";
// import eventsData from "../../data/EventData";
// import EventCard from "./Eventcard";
// import Button from "../../components/Button";
// import { Link } from "react-router-dom";
// export default function RoadJourney() {
//   useEffect(() => {
//     const onScroll = () => {
//       const scrollY = window.scrollY;

//       // Normalize scroll
//       const progress = Math.min(scrollY / 1200, 1);
//       const curvePattern = [
//         { start: 0, dir: 1 },
//         { start: 800, dir: -1 },
//         { start: 1600, dir: 1 },
//       ];

//       let direction = 1;
//       curvePattern.forEach((p) => {
//         if (scrollY > p.start) direction = p.dir;
//       });

//       const curveX = direction * Math.min((scrollY % 800) * 0.05, 40);

//       // Curve values
//       // const curveX = Math.sin(scrollY * 0.002) * 40; // left-right
//       const skewY = progress * 2; // perspective skew
//       const scale = 1 + progress * 0.08; // forward motion

//       const road = document.getElementById("road-transform");
//       if (road) {
//         road.style.transform = `
//           translateX(${curveX}px)
//           skewY(${skewY}deg)
//           scale(${scale})
//         `;
//       }
//     };

//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <section className="relative h-[1200vh]">
//       {/* Sticky road */}
//       <div className="sticky top-0 h-screen overflow-hidden">
//         <div
//           id="road-transform"
//           className="
//             h-full w-full
//             bg-center bg-cover
//             transition-transform duration-75
//             will-change-transform
//           "
//           style={{
//             backgroundImage: "url('/events/image.png')",
//           }}

//         >
//           <div className="absolute inset-0 bg-black/50" />
//         </div>
//       </div>

//          {/* EVENT FRAMES */}
//          {eventsData.map((event, index) => {


//           return (
//             <motion.div
//               key={event.id}
//               className="absolute z-10 flex flex-col items-center gap-6"
//             >
//               <div className="relative w-full max-w-5xl px-10">
//                 <img
//                   src="/events/frame1.png"
//                   alt="frame"
//                   className="w-full pointer-events-none"
//                 />

//                 <div
//                   className="absolute inset-[8%] overflow-hidden flex flex-col"
//                   style={{
//                     clipPath:
//                       "polygon(6% 0,100% 0,100% 94%,94% 100%,0 100%,0 6%)",
//                   }}
//                 >
//                   <img
//                     src={event.image}
//                     alt={event.name}
//                     className="absolute inset-0 w-full h-full object-cover scale-50"
//                   />

//                   <div className="absolute inset-0 bg-black/50" />

//                   <div className="relative z-10 flex flex-col h-full">
//                     <div className="pt-20 text-center">
//                       <h1 className="text-[22px] font-display tracking-[0.3em]">
//                         {event.name}
//                       </h1>
//                     </div>

//                     <div className="flex-1" />

//                     <div className="pb-30 px-6 text-center">
//                       <p className="text-m  tracking-wide opacity-80">
//                         {event.subheading}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           );
//         })}
//     </section>
//   );
// }
