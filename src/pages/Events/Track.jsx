// // components/Track.jsx
// export default function Track() {
//   return (
//     <svg
//       viewBox="0 0 3800 500"
//       className="w-[3800px] h-[500px]"
//     >
//       {/* road */}
//       <path
//         d="M 100 50 C 300 338.5 500 -95.3 700 252.7
//            C 900 584.6 1100 61.7 1300 283.4
//            C 1500 522.69 1700 -22.75 1900 404.66
//            C 2100 605.62 2300 39.81 2500 295.48
//            C 2700 488.29 2900 -2.48 3100 318.58
//            C 3300 410.78 3500 -117.82 3700 215.56"
//         stroke="#382920"
//         strokeWidth="90"
//         fill="none"
//       />

//       {/* dashed center line */}
//       <path
//         d="M 100 50 C 300 338.5 500 -95.3 700 252.7
//            C 900 584.6 1100 61.7 1300 283.4
//            C 1500 522.69 1700 -22.75 1900 404.66
//            C 2100 605.62 2300 39.81 2500 295.48
//            C 2700 488.29 2900 -2.48 3100 318.58
//            C 3300 410.78 3500 -117.82 3700 215.56"
//         stroke="#f7f7f7"
//         strokeWidth="4"
//         strokeDasharray="18 18"
//         strokeLinecap="round"
//         fill="none"
//       />
//     </svg>
//   );
// }
// src/components/RoadScene.jsx

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function RoadScene() {
  const roadRef = useRef(null);

  useEffect(() => {
    gsap.to(roadRef.current, {
      y: "-50%",
      ease: "none",
      scrollTrigger: {
        trigger: roadRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      <img
        ref={roadRef}
        src="/events/road.png"
        alt="road"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%]"
      />
    </div>
  );
}
