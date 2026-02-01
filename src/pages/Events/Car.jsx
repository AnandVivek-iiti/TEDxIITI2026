import React, { useRef, useState, forwardRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";
import EventData from "../../data/EventData";
/* ===================== MATERIALS ===================== */
const materials = {
  carbonFiber: { color: "#0e0b09", metalness: 0.5, roughness: 0.4 },
  glossyAmber: { color: "#fea712", metalness: 0.8, roughness: 0.2 },
  tire: { color: "#0e0b09", metalness: 0.05, roughness: 0.95 },
  rimDark: { color: "#562717", metalness: 0.7, roughness: 0.3 },
  accentOrange: { color: "#E76219", metalness: 0.6, roughness: 0.25 },
  glowAmber: { color: "#fea712", emissive: "#fea712", emissiveIntensity: 0.5 },
};

/* ===================== PARTICLE SYSTEM ===================== */
function SpeedParticles({ carPosition }) {
  const particlesRef = useRef();
  const particleCount = 300;

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 5);
    const velocities = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 5] = (Math.random() - 0.5) * 20;
      positions[i * 5 + 1] = Math.random() * 3;
      positions[i * 5 + 2] = Math.random() * 40 - 20;
      velocities[i] = Math.random() * 0.5 + 0.3;
    }

    return { positions, velocities };
  }, []);

  useFrame((state, delta) => {
    if (!particlesRef.current) return;

    const positions = particlesRef.current.geometry.attributes.position.array;

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 2] -= particles.velocities[i] * delta * 30;

      if (positions[i * 3 + 2] < -30) {
        positions[i * 3 + 2] = 30;
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = Math.random() * 3;
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#fea712"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ===================== EXHAUST PARTICLES ===================== */
function ExhaustParticles({ position }) {
  const exhaustRef = useRef();
  const particleCount = 50;

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;
      velocities.push({
        x: (Math.random() - 0.5) * 0.3,
        y: Math.random() * 0.2,
        z: -Math.random() * 0.5 - 0.5,
        life: Math.random(),
      });
    }

    return { positions, velocities };
  }, []);

  useFrame((state, delta) => {
    if (!exhaustRef.current) return;

    const positions = exhaustRef.current.geometry.attributes.position.array;

    for (let i = 0; i < particleCount; i++) {
      const vel = particles.velocities[i];

      positions[i * 3] += vel.x * delta * 5;
      positions[i * 3 + 1] += vel.y * delta * 5;
      positions[i * 3 + 2] += vel.z * delta * 5;

      vel.life -= delta * 0.8;

      if (vel.life <= 0) {
        positions[i * 3] = position[0];
        positions[i * 3 + 1] = position[1];
        positions[i * 3 + 2] = position[2];
        vel.life = 1;
        vel.x = (Math.random() - 0.5) * 0.3;
        vel.y = Math.random() * 0.2;
        vel.z = -Math.random() * 0.5 - 0.5;
      }
    }

    exhaustRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={exhaustRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#888888"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ===================== ENHANCED WHEEL COMPONENT ===================== */
function Wheel({ wheelRef, glowIntensity = 0 }) {
  return (
    <group ref={wheelRef} rotation={[0, 0, Math.PI / 2]}>
      {/* Tire */}
      <mesh castShadow>
        <cylinderGeometry args={[0.36, 0.36, 0.32, 48]} />
        <meshStandardMaterial {...materials.tire} />
      </mesh>

      {/* Rim */}
      <mesh castShadow>
        <cylinderGeometry args={[0.26, 0.26, 0.28, 48]} />
        <meshStandardMaterial {...materials.rimDark} />
      </mesh>

      {/* Brake Disc */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.02, 32]} />
        <meshStandardMaterial color="#E76219" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Wheel Glow */}
      {glowIntensity > 0 && (
        <pointLight
          position={[0, 0, 0]}
          color="#fea712"
          intensity={glowIntensity}
          distance={2}
        />
      )}
    </group>
  );
}

/* ===================== F1 CAR ===================== */
const F1Car = forwardRef(function F1Car({ scrollProgress }, ref) {
  const wheelRefs = useRef([]);
  const [speedBoost, setSpeedBoost] = useState(0.6);
  const exhaustLeft = useRef();
  const exhaustRight = useRef();
  useFrame((state, delta) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const scroll = scrollProgress.get();

    /* POSITIONING */
    const trackLength = 180;
    ref.current.position.z = THREE.MathUtils.lerp(20, -trackLength, scroll);
    ref.current.position.x = Math.sin(scroll * Math.PI * 6) * 1.2;
    ref.current.rotation.y = Math.PI + Math.sin(scroll * Math.PI * 4) * 0.12;
    ref.current.rotation.z = ref.current.position.x * 0.05;
    ref.current.position.y = 0.55 + Math.sin(t * 2) * 0.05;

    /* SPEED FEEDBACK */
    const newSpeedBoost = 0.6 + Math.abs(Math.sin(scroll * Math.PI)) * 0.8;
    setSpeedBoost(newSpeedBoost);

    /* WHEEL ROTATION */
    wheelRefs.current.forEach((w) => {
      if (w) {
        w.rotation.x -= delta * (3 + newSpeedBoost * 4);
      }
    });
  });

  return (
    <group ref={ref} scale={1.4} position={[0, 2, -25]}>
      {/* MAIN BODY - Amber Gold */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.35, 3.2]} />
        <meshStandardMaterial {...materials.glossyAmber} />
      </mesh>

      {/* BODY ACCENT LINES */}
      <mesh position={[0.61, 0.15, 0]}>
        <boxGeometry args={[0.02, 0.36, 3.2]} />
        <meshStandardMaterial {...materials.accentOrange} />
      </mesh>
      <mesh position={[-0.61, 0.15, 0]}>
        <boxGeometry args={[0.02, 0.36, 3.2]} />
        <meshStandardMaterial {...materials.accentOrange} />
      </mesh>

      {/* COCKPIT - Coffee Dark */}
      <mesh position={[0, 0.38, 0.2]} castShadow>
        <boxGeometry args={[0.6, 0.2, 1.1]} />
        <meshStandardMaterial {...materials.carbonFiber} />
      </mesh>

      {/* COCKPIT WINDSHIELD */}
      <mesh position={[0, 0.45, 0.5]} rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[0.58, 0.15, 0.3]} />
        <meshStandardMaterial
          color="#0e0b09"
          transparent
          opacity={0.3}
          metalness={1}
          roughness={0}
        />
      </mesh>

      {/* NOSE CONE */}
      <mesh position={[0, 0.1, 1.4]}>
        <coneGeometry args={[0.35, 0.8, 8]} />
        <meshStandardMaterial {...materials.glossyAmber} />
      </mesh>

      {/* FRONT WING - Orange Accent */}
      <mesh position={[0, 0.05, 1.7]} castShadow>
        <boxGeometry args={[1.8, 0.04, 0.4]} />
        <meshStandardMaterial {...materials.accentOrange} />
      </mesh>

      {/* FRONT WING ENDPLATES */}
      <mesh position={[0.9, 0.15, 1.7]}>
        <boxGeometry args={[0.04, 0.25, 0.4]} />
        <meshStandardMaterial {...materials.carbonFiber} />
      </mesh>
      <mesh position={[-0.9, 0.15, 1.7]}>
        <boxGeometry args={[0.04, 0.25, 0.4]} />
        <meshStandardMaterial {...materials.carbonFiber} />
      </mesh>

      {/* SIDE PODS */}
      <mesh position={[0.5, 0.1, -0.3]}>
        <boxGeometry args={[0.3, 0.25, 2]} />
        <meshStandardMaterial {...materials.carbonFiber} />
      </mesh>
      <mesh position={[-0.5, 0.1, -0.3]}>
        <boxGeometry args={[0.3, 0.25, 2]} />
        <meshStandardMaterial {...materials.carbonFiber} />
      </mesh>

      {/* AIR INTAKES */}
      <mesh position={[0.5, 0.25, 0.5]}>
        <boxGeometry args={[0.25, 0.15, 0.3]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[-0.5, 0.25, 0.5]}>
        <boxGeometry args={[0.25, 0.15, 0.3]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* REAR WING - Coffee Dark */}
      <mesh position={[0, 0.55, -1.6]} castShadow>
        <boxGeometry args={[1.4, 0.05, 0.5]} />
        <meshStandardMaterial {...materials.carbonFiber} />
      </mesh>

      {/* REAR WING TOP ELEMENT */}
      <mesh position={[0, 0.75, -1.6]}>
        <boxGeometry args={[1.3, 0.04, 0.45]} />
        <meshStandardMaterial {...materials.accentOrange} />
      </mesh>

      {/* REAR WING SUPPORTS */}
      <mesh position={[0.5, 0.65, -1.6]}>
        <boxGeometry args={[0.04, 0.25, 0.04]} />
        <meshStandardMaterial {...materials.carbonFiber} />
      </mesh>
      <mesh position={[-0.5, 0.65, -1.6]}>
        <boxGeometry args={[0.04, 0.25, 0.04]} />
        <meshStandardMaterial {...materials.carbonFiber} />
      </mesh>

      {/* ENGINE COVER */}
      <mesh position={[0, 0.28, -0.8]}>
        <boxGeometry args={[0.8, 0.15, 1.5]} />
        <meshStandardMaterial {...materials.glossyAmber} />
      </mesh>

      {/* REAR DIFFUSER */}
      <mesh position={[0, -0.05, -1.8]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[1.1, 0.25, 0.4]} />
        <meshStandardMaterial {...materials.carbonFiber} />
      </mesh>

      {/* HEADLIGHTS */}
      <mesh position={[0.3, 0.1, 1.55]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          {...materials.glowAmber}
          emissiveIntensity={speedBoost}
        />
      </mesh>
      <mesh position={[-0.3, 0.1, 1.55]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          {...materials.glowAmber}
          emissiveIntensity={speedBoost}
        />
      </mesh>

      {/* HEADLIGHT BEAMS */}
      <pointLight
        position={[0.3, 0.1, 1.8]}
        color="#fea712"
        intensity={speedBoost * 3}
        distance={8}
        angle={0.5}
      />
      <pointLight
        position={[-0.3, 0.1, 1.8]}
        color="#fea712"
        intensity={speedBoost * 3}
        distance={8}
        angle={0.5}
      />

      {/* REAR LIGHTS */}
      <mesh position={[0.4, 0.15, -1.9]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color="#C21717"
          emissive="#C21717"
          emissiveIntensity={0.8}
        />
      </mesh>
      <mesh position={[-0.4, 0.15, -1.9]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color="#C21717"
          emissive="#C21717"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* WHEELS */}
      <group position={[0.75, -0.15, 1.1]}>
        <Wheel
          wheelRef={(el) => (wheelRefs.current[0] = el)}
          glowIntensity={speedBoost * 0.5}
        />
      </group>
      <group position={[-0.75, -0.15, 1.1]}>
        <Wheel
          wheelRef={(el) => (wheelRefs.current[1] = el)}
          glowIntensity={speedBoost * 0.5}
        />
      </group>
      <group position={[0.75, -0.15, -1.1]}>
        <Wheel
          wheelRef={(el) => (wheelRefs.current[2] = el)}
          glowIntensity={speedBoost * 0.5}
        />
      </group>
      <group position={[-0.75, -0.15, -1.1]}>
        <Wheel
          wheelRef={(el) => (wheelRefs.current[3] = el)}
          glowIntensity={speedBoost * 0.5}
        />
      </group>

      {/* EXHAUST PARTICLES */}
      <group position={[0.35, -0.05, -1.95]} ref={exhaustLeft}>
        <ExhaustParticles position={[0.35, -0.05, -1.95]} />
      </group>
      <group position={[-0.35, -0.05, -1.95]} ref={exhaustRight}>
        <ExhaustParticles position={[-0.35, -0.05, -1.95]} />
      </group>

      {/* AMBIENT GLOW */}
      <pointLight
        position={[0, 0.3, 0]}
        color="#fea712"
        intensity={speedBoost * 0.8}
        distance={3}
      />
    </group>
  );
});
/* ===================== ROAD (REVERSED) ===================== */
function Road({ scrollProgress }) {
  const roadRefs = useRef([]);
  const lastScroll = useRef(0);
  const SEGMENT = 19;
  const COUNT = 30;

  useFrame((_, delta) => {
    const scroll = scrollProgress.get();
    const velocity = Math.abs(scroll - lastScroll.current);
    lastScroll.current = scroll;

    const speed = THREE.MathUtils.clamp(velocity * 120, 6, 40);

    roadRefs.current.forEach((obj) => {
      if (!obj) return;

      obj.position.z -= speed * delta;
      if (obj.position.z < -((COUNT - 5) * SEGMENT)) {
        obj.position.z += COUNT * SEGMENT;
      }
    });
  });

  return (
    <>
      {[...Array(COUNT)].map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (roadRefs.current[i] = el)}
          position={[0, 0, -i * SEGMENT]}
          receiveShadow
        >
          <boxGeometry args={[10, 0.15, SEGMENT]} />
          <meshStandardMaterial color="#562717" roughness={0.85} />
        </mesh>
      ))}
    </>
  );
}
/* ===================== ENVIRONMENT (UPDATED) ===================== */
function Environment() {
  const colors = ["#562717", "#C21717", "#E76219", "#fea712", "#FDDCA9"];
  const buildingsRef = useRef([]);

  useFrame((state) => {
    buildingsRef.current.forEach((b, i) => {
      if (!b) return;
      const pulse = Math.sin(state.clock.elapsedTime * 2 + i) * 0.5 + 0.5;
      b.material.opacity = 0.25 + pulse * 0.25;
    });
  });

  return (
    <>
      {/* LEFT */}
      {[...Array(50)].map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (buildingsRef.current[i] = el)}
          position={[6 + Math.random() * 2, 1, -i * 8]}
        >
          <boxGeometry args={[2, 2 + Math.random() * 6, 2]} />
          <meshStandardMaterial
            color={colors[i % colors.length]}
            transparent
            emissive={colors[i % colors.length]}
            emissiveIntensity={0.25}
          />
        </mesh>
      ))}

      {/* RIGHT */}
      {[...Array(50)].map((_, i) => (
        <mesh
          key={i + 100}
          ref={(el) => (buildingsRef.current[i + 50] = el)}
          position={[-6 - Math.random() * 2, 1, -i * 8]}
        >
          <boxGeometry args={[2, 2 + Math.random() * 6, 2]} />
          <meshStandardMaterial
            color={colors[(i + 2) % colors.length]}
            transparent
            emissive={colors[(i + 2) % colors.length]}
            emissiveIntensity={0.25}
          />
        </mesh>
      ))}

      {/* NEON SIGNS */}
      {[...Array(24)].map((_, i) => (
        <mesh
          key={`sign-${i}`}
          position={[i % 2 ? -7 : 7, 3 + Math.random() * 2, -i * 16]}
        >
          <planeGeometry args={[1.6, 0.9]} />
          <meshStandardMaterial
            emissive="#fea712"
            emissiveIntensity={1.8}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </>
  );
}

/* ===================== 3D SCENE ===================== */
function Scene({ scrollProgress }) {
  const carRef = useRef();
  const { camera, scene } = useThree();

  React.useEffect(() => {
    scene.fog = new THREE.Fog("#0e0b09", 15, 60);
    scene.background = new THREE.Color("#0e0b09");
  }, [scene]);

  useFrame(() => {
    if (!carRef.current) return;

    const target = carRef.current.position;
    const camTarget = new THREE.Vector3(target.x * 0.6, 4.8, target.z + 10);

    camera.position.lerp(camTarget, 0.08);
    camera.lookAt(target.x, target.y + 0.5, target.z - 10);
  });

  return (
    <>
      <ambientLight intensity={0.4} color="#fea712" />
      <directionalLight
        position={[10, 20, 5]}
        intensity={1.2}
        color="#FDDCA9"
        castShadow
      />
      <pointLight position={[0, 3, 5]} intensity={0.6} color="#E76219" />

      <SpeedParticles />
      <Environment />
      <Road scrollProgress={scrollProgress} />
      <F1Car ref={carRef} scrollProgress={scrollProgress} />
    </>
  );
}
function EventCard({ event, progress }) {
  // y: 600 (bottom) -> 0 (center) -> -600 (top)
  const y = useTransform(progress, [0, 0.45, 0.55, 1], [600, 0, 0, -600]);

  // opacity: 0 -> 1 (stays solid in middle) -> 0
  const opacity = useTransform(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  // Scale: small at bottom, full size in middle, small at top
  const scale = useTransform(progress, [0, 0.5, 1], [0.8, 1, 0.8]);

  // Optional: Add a slight rotation for a "popup" feel
  const rotateX = useTransform(progress, [0, 0.5, 1], [20, 0, -20]);

  return (
    <motion.div
      style={{
        scale,
        opacity,
        y,
        rotateX,
        // Ensure only the active card is "interactable" or visible
        display: useTransform(progress, (p) => (p <= 0 || p >= 1 ? "none" : "flex")),
      }}
      className="absolute z-20 flex items-center justify-center w-full"
    >
      <div className="relative w-full max-w-2xl px-4">
        <img
          src="/events/frame.png"
          className="w-full pointer-events-none drop-shadow-2xl"
          alt="frame"
        />

        <div className="absolute inset-[16%] overflow-hidden rounded-lg">
          <motion.img
            src={event.image}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              scale: useTransform(progress, [0, 1], [1.2, 1]),
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

          <div className="relative z-10 flex flex-col h-full text-center">
            <div className="pt-6 md:pt-10">
              <h1 className="tracking-[0.3em] text-lg md:text-2xl text-white font-bold uppercase">
                {event.name}
              </h1>
            </div>

            <div className="flex-1" />

            <div className="pb-6 md:pb-10 px-6">
              <p className="text-white/90 text-xs md:text-base font-medium leading-relaxed">
                {event.subheading}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

}
function EventSlot({ event, index, total, scrollYProgress }) {
  const start = index / total;
  const end = (index + 1) / total;

  const progress = useTransform(scrollYProgress, [start, end], [0, 1]);

  return <EventCard event={event} progress={progress} />;
}
/* ===================== MAIN APP ===================== */
export default function App() {
  const { scrollYProgress } = useScroll();
  const total = EventData.length;

  return (
    <div
      className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-black"
      style={{ height: `${total * 150}vh` }}
    >
      {/* STICKY CONTAINER */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* 3D BACKGROUND */}
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [0, 5, 14], fov: 55 }}
          className="absolute inset-0"
        >
          <Scene scrollProgress={scrollYProgress} />
        </Canvas>

        {/* EVENT CARDS LAYER */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          {EventData.map((event, index) => (
            <EventSlot
              key={event.id}
              event={event}
              index={index}
              total={EventData.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* TITLE OVERLAY */}
        <div className="absolute top-16 left-0 right-0 text-center z-30 pointer-events-none">
          <motion.h1
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]),
            }}
            className="text-4xl md:text-6xl font-bold text-amber-400"
          >
             <h1 className="font-[Orbitron] text-6xl md:text-8xl font-black italic tracking-tighter">

            <span className="text-stroke-red text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500">
             Events
            </span>
          </h1>
          </motion.h1>
        </div>
      </div>
    </div>
  );
}
