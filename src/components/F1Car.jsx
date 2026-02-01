import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, SSAO } from '@react-three/postprocessing';
import * as THREE from 'three';

// === MATERIALS ===
const materials = {
  carbonFiber: { color: "#0a0a0a", metalness: 0.4, roughness: 0.5 },
  glossyRed: { color: "#dd0000", metalness: 0.7, roughness: 0.15 },
  mattePaint: { color: "#c41e3a", metalness: 0.2, roughness: 0.4 },
  tire: { color: "#0d0d0d", metalness: 0.05, roughness: 0.95 },
  brakeDisk: { color: "#333", metalness: 0.95, roughness: 0.25 },
  metal: { color: "#666", metalness: 1.0, roughness: 0.2 },
  rimDark: { color: "#1a1a1a", metalness: 0.8, roughness: 0.3 },
  redRim: { color: "#e31e24", metalness: 0.9, roughness: 0.2 }
};

// === FRONT WING (Multi-element) ===
function FrontWing({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0, 0]} rotation={[-0.08, 0, 0]}>
        <boxGeometry args={[2.1, 0.025, 0.4]} />
        <meshStandardMaterial {...materials.carbonFiber} />
      </mesh>
      <mesh position={[0, 0.055, -0.06]} rotation={[-0.12, 0, 0]}>
        <boxGeometry args={[2.05, 0.025, 0.35]} />
        <meshStandardMaterial {...materials.carbonFiber} />
      </mesh>
      <mesh position={[0, 0.11, -0.12]} rotation={[-0.17, 0, 0]}>
        <boxGeometry args={[1.95, 0.025, 0.32]} />
        <meshStandardMaterial {...materials.carbonFiber} />
      </mesh>
      <mesh position={[0, 0.17, -0.18]} rotation={[-0.22, 0, 0]}>
        <boxGeometry args={[1.85, 0.025, 0.28]} />
        <meshStandardMaterial {...materials.carbonFiber} />
      </mesh>
      <mesh position={[0, 0.24, -0.24]} rotation={[-0.28, 0, 0]}>
        <boxGeometry args={[1.75, 0.025, 0.25]} />
        <meshStandardMaterial {...materials.carbonFiber} />
      </mesh>
      <mesh position={[1.1, 0.2, 0]} rotation={[0, 0.08, 0]}>
        <boxGeometry args={[0.06, 0.6, 0.7]} />
        <meshStandardMaterial {...materials.carbonFiber} />
      </mesh>
      <mesh position={[-1.1, 0.2, 0]} rotation={[0, -0.08, 0]}>
        <boxGeometry args={[0.06, 0.6, 0.7]} />
        <meshStandardMaterial {...materials.carbonFiber} />
      </mesh>
      {[-0.85, -0.6, 0.6, 0.85].map((x, i) => (
        <mesh key={i} position={[x, 0.32, -0.15]} rotation={[-0.25, 0, 0]}>
          <boxGeometry args={[0.06, 0.18, 0.1]} />
          <meshStandardMaterial {...materials.carbonFiber} />
        </mesh>
      ))}
    </group>
  );
}

// === REAR WING ===
function RearWing({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.55, 0]} rotation={[0.12, 0, 0]}>
        <boxGeometry args={[1.6, 0.035, 0.55]} />
        <meshStandardMaterial {...materials.carbonFiber} />
      </mesh>
      <mesh position={[0, 0.72, 0.15]} rotation={[0.08, 0, 0]}>
        <boxGeometry args={[1.55, 0.035, 0.38]} />
        <meshStandardMaterial {...materials.carbonFiber} />
      </mesh>
      <mesh position={[0.82, 0.5, 0]}>
        <boxGeometry args={[0.05, 1.1, 0.75]} />
        <meshStandardMaterial {...materials.carbonFiber} />
      </mesh>
      <mesh position={[-0.82, 0.5, 0]}>
        <boxGeometry args={[0.05, 1.1, 0.75]} />
        <meshStandardMaterial {...materials.carbonFiber} />
      </mesh>
      {[0.7, 0.5, 0.3, -0.3, -0.5, -0.7].map((x, i) => (
        <mesh key={i} position={[x, 0.35, 0.32]}>
          <boxGeometry args={[0.025, 0.7, 0.08]} />
          <meshStandardMaterial {...materials.carbonFiber} />
        </mesh>
      ))}
      <mesh position={[0.65, 0.05, -0.1]}>
        <cylinderGeometry args={[0.018, 0.018, 1.0, 12]} />
        <meshStandardMaterial {...materials.carbonFiber} />
      </mesh>
      <mesh position={[-0.65, 0.05, -0.1]}>
        <cylinderGeometry args={[0.018, 0.018, 1.0, 12]} />
        <meshStandardMaterial {...materials.carbonFiber} />
      </mesh>
      <mesh position={[0, 0.82, 0.08]} rotation={[Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.12, 10]} />
        <meshStandardMaterial {...materials.metal} />
      </mesh>
    </group>
  );
}

// === WHEEL ASSEMBLY ===
function WheelAssembly({ position, isRear, isLeft, wheelRefs, index }) {
  const wheelWidth = isRear ? 0.38 : 0.34;
  const wheelRadius = 0.365;

  return (
    <group position={position}>
      <group ref={(el) => (wheelRefs.current[index] = el)}>
        <group rotation={[0, 0, Math.PI / 2]}>
          <mesh>
            <cylinderGeometry args={[wheelRadius, wheelRadius, wheelWidth, 64]} />
            <meshStandardMaterial {...materials.tire} />
          </mesh>
          <mesh position={[0, isLeft ? wheelWidth/2 + 0.008 : -wheelWidth/2 - 0.008, 0]}>
            <ringGeometry args={[0.29, 0.33, 64]} />
            <meshBasicMaterial color="#ff1e3c" side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, isLeft ? -wheelWidth/2 - 0.008 : wheelWidth/2 + 0.008, 0]}>
            <ringGeometry args={[0.29, 0.33, 64]} />
            <meshBasicMaterial color="#ff1e3c" side={THREE.DoubleSide} />
          </mesh>
          <mesh>
            <cylinderGeometry args={[0.28, 0.28, wheelWidth - 0.06, 64]} />
            <meshStandardMaterial {...materials.rimDark} />
          </mesh>
          <mesh position={[0.12, isLeft ? wheelWidth/2 - 0.08 : -wheelWidth/2 + 0.08, 0]} rotation={[0, Math.PI/2, 0]}>
            <boxGeometry args={[0.08, 0.12, 0.06]} />
            <meshStandardMaterial color="#cc0000" metalness={0.6} roughness={0.3} />
          </mesh>
          <group position={[0, isLeft ? wheelWidth/2 - 0.04 : -wheelWidth/2 + 0.04, 0]}>
            <mesh>
              <cylinderGeometry args={[0.16, 0.16, 0.018, 48]} />
              <meshStandardMaterial {...materials.brakeDisk} />
            </mesh>
            {Array.from({ length: 32 }).map((_, i) => (
              <mesh key={i} position={[Math.cos(i/32*Math.PI*2)*0.11, 0.01, Math.sin(i/32*Math.PI*2)*0.11]}>
                <cylinderGeometry args={[0.006, 0.006, 0.025, 8]} />
                <meshStandardMaterial color="#000" />
              </mesh>
            ))}
          </group>
          {Array.from({ length: 5 }).map((_, i) => (
            <group key={i} rotation={[0, (i/5)*Math.PI*2, 0]}>
              <mesh position={[0.18, 0, 0]}>
                <boxGeometry args={[0.28, 0.06, 0.025]} />
                <meshStandardMaterial {...materials.rimDark} />
              </mesh>
            </group>
          ))}
          <mesh position={[0, isLeft ? wheelWidth/2 - 0.015 : -wheelWidth/2 + 0.015, 0]}>
            <cylinderGeometry args={[0.055, 0.055, 0.02, 6]} />
            <meshStandardMaterial color="#dd0000" metalness={0.95} roughness={0.15} />
          </mesh>
        </group>
      </group>
      <mesh position={[isLeft ? 0.28 : -0.28, 0, 0.08]} rotation={[0, isLeft ? -Math.PI/2 : Math.PI/2, 0]}>
        <boxGeometry args={[0.15, 0.12, 0.08]} />
        <meshStandardMaterial {...materials.carbonFiber} />
      </mesh>
    </group>
  );
}

// === SUSPENSION COMPONENTS ===
function Suspension({ position, isRear, isLeft }) {
  const side = isLeft ? 1 : -1;
  return (
    <group position={position}>
      <mesh position={[0.15 * side, 0.08, 0]} rotation={[0, 0, 0.4 * side]}>
        <cylinderGeometry args={[0.008, 0.008, 0.35, 8]} />
        <meshStandardMaterial {...materials.metal} />
      </mesh>
      <mesh position={[0.15 * side, -0.12, 0]} rotation={[0, 0, -0.35 * side]}>
        <cylinderGeometry args={[0.008, 0.008, 0.4, 8]} />
        <meshStandardMaterial {...materials.metal} />
      </mesh>
      <mesh position={[0.08 * side, 0.05, isRear ? -0.12 : 0.12]} rotation={[isRear ? -0.6 : 0.6, 0, 0.2 * side]}>
        <cylinderGeometry args={[0.01, 0.01, 0.32, 8]} />
        <meshStandardMaterial {...materials.metal} />
      </mesh>
    </group>
  );
}

// === MAIN F1 CAR LOGIC ===
function F1Car({ mouse }) {
  const groupRef = useRef();
  const wheelRefs = useRef([]);

  // Animation States
  const [entryProgress, setEntryProgress] = useState(0);
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // 1. ENTRY ANIMATION (Slide in from Right)
    // Updated to match Home Page positioning (lerp from 18 to 6)
    if (entryProgress < 1) {
      setEntryProgress(prev => Math.min(prev + delta * 0.5, 1));
      const eased = 1 - Math.pow(1 - entryProgress, 3);

      // Interpolate position from start (18) to end (6) for Home Page
      groupRef.current.position.x = THREE.MathUtils.lerp(18, 6, eased);
      groupRef.current.position.y = THREE.MathUtils.lerp(2, 0.5, eased);

      // Interpolate rotation during entry
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        -Math.PI / 2 - 0.6,
        -Math.PI / 2 - 0.2,
        eased
      );

      groupRef.current.rotation.z = THREE.MathUtils.lerp(-0.1, 0, eased);

    } else {
      // 2. IDLE FLOATING ANIMATION
      groupRef.current.position.y = 0.5 + Math.sin(time * 1.2) * 0.15;
      groupRef.current.position.z = Math.sin(time * 0.6) * 0.05;

      // 3. CURSOR INTERACTION
      targetRotation.current.x = mouse.current[1] * 0.2;
      targetRotation.current.y = -Math.PI / 2 - 0.2 + mouse.current[0] * 0.3;

      currentRotation.current.x = THREE.MathUtils.lerp(currentRotation.current.x, targetRotation.current.x, 0.04);
      currentRotation.current.y = THREE.MathUtils.lerp(currentRotation.current.y, targetRotation.current.y, 0.04);

      groupRef.current.rotation.x = currentRotation.current.x;
      groupRef.current.rotation.y = currentRotation.current.y;
      groupRef.current.rotation.z = -mouse.current[0] * 0.06;
    }

    // 4. WHEEL SPIN (Reversing effect for Home Page)
    wheelRefs.current.forEach(wheel => {
      if (wheel) wheel.rotation.x -= 0.15;
    });
  });

  return (
    <group
      ref={groupRef}
      scale={1.4}
      position={[18, 2, 0]} // Initial spawn position
    >
      {/* High-Detail Car Mesh Construction */}
      <mesh position={[0, -0.07, 2.0]} rotation={[0.06, 0, 0]}>
        <boxGeometry args={[0.12, 0.1, 1.0]} />
        <meshStandardMaterial {...materials.carbonFiber} />
      </mesh>
      <mesh position={[0, -0.02, 1.5]}>
        <boxGeometry args={[0.28, 0.14, 0.5]} />
        <meshStandardMaterial {...materials.carbonFiber} />
      </mesh>
      <FrontWing position={[0, -0.14, 2.35]} />
      <mesh position={[0, 0.05, 0.6]}>
        <boxGeometry args={[0.95, 0.42, 2.0]} />
        <meshStandardMaterial {...materials.glossyRed} />
      </mesh>
      <mesh position={[0, 0.22, 0.7]}>
        <boxGeometry args={[0.65, 0.08, 1.1]} />
        <meshStandardMaterial color="#000" roughness={0.3} />
      </mesh>
      <mesh position={[0.28, 0.2, 0.6]}>
        <boxGeometry args={[0.08, 0.06, 0.8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[-0.28, 0.2, 0.6]}>
        <boxGeometry args={[0.08, 0.06, 0.8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <group position={[0, 0.25, 0.65]}>
        <mesh rotation={[-0.18, 0, 0]}>
          <torusGeometry args={[0.32, 0.022, 16, 48, Math.PI]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.85} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0.18, -0.2]}>
          <cylinderGeometry args={[0.018, 0.018, 0.35, 16]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.85} roughness={0.25} />
        </mesh>
      </group>
      <mesh position={[0.62, -0.02, 0.3]}>
        <boxGeometry args={[0.45, 0.32, 1.4]} />
        <meshStandardMaterial {...materials.glossyRed} />
      </mesh>
      <mesh position={[-0.62, -0.02, 0.3]}>
        <boxGeometry args={[0.45, 0.32, 1.4]} />
        <meshStandardMaterial {...materials.glossyRed} />
      </mesh>
      <mesh position={[0.72, -0.22, 0.4]} rotation={[0, 0, 0.15]}>
        <boxGeometry args={[0.2, 0.12, 1.0]} />
        <meshStandardMaterial {...materials.carbonFiber} />
      </mesh>
      <mesh position={[-0.72, -0.22, 0.4]} rotation={[0, 0, -0.15]}>
        <boxGeometry args={[0.2, 0.12, 1.0]} />
        <meshStandardMaterial {...materials.carbonFiber} />
      </mesh>
      <mesh position={[0, -0.3, 0.2]}>
        <boxGeometry args={[2.0, 0.018, 3.5]} />
        <meshStandardMaterial {...materials.carbonFiber} />
      </mesh>
      <mesh position={[0.58, -0.26, 0.1]} rotation={[0, 0, 0.12]}>
        <boxGeometry args={[0.32, 0.12, 2.8]} />
        <meshStandardMaterial {...materials.carbonFiber} />
      </mesh>
      <mesh position={[-0.58, -0.26, 0.1]} rotation={[0, 0, -0.12]}>
        <boxGeometry args={[0.32, 0.12, 2.8]} />
        <meshStandardMaterial {...materials.carbonFiber} />
      </mesh>
      <mesh position={[0, 0.12, -0.4]}>
        <boxGeometry args={[0.75, 0.4, 1.6]} />
        <meshStandardMaterial {...materials.glossyRed} />
      </mesh>
      <mesh position={[0, 0.35, -0.8]}>
        <boxGeometry args={[0.02, 0.28, 0.6]} />
        <meshStandardMaterial {...materials.carbonFiber} />
      </mesh>
      <mesh position={[0, 0.35, 0.3]}>
        <boxGeometry args={[0.45, 0.25, 0.4]} />
        <meshStandardMaterial {...materials.carbonFiber} />
      </mesh>
      <mesh position={[0, -0.05, -1.3]}>
        <boxGeometry args={[0.55, 0.28, 0.5]} />
        <meshStandardMaterial {...materials.carbonFiber} />
      </mesh>
      <group position={[0, -0.18, -1.55]}>
        <mesh rotation={[-0.15, 0, 0]}>
          <boxGeometry args={[1.4, 0.32, 0.7]} />
          <meshStandardMaterial {...materials.carbonFiber} />
        </mesh>
        {[-0.5, -0.3, -0.1, 0.1, 0.3, 0.5].map((x, i) => (
          <mesh key={i} position={[x, 0.12, 0.05]} rotation={[-0.2, 0, 0]}>
            <boxGeometry args={[0.025, 0.3, 0.6]} />
            <meshStandardMaterial {...materials.carbonFiber} />
          </mesh>
        ))}
      </group>
      <mesh position={[0, -0.02, -1.65]}>
        <cylinderGeometry args={[0.038, 0.045, 0.18, 20]} />
        <meshStandardMaterial color="#1a1a1a" emissive="#ff4400" emissiveIntensity={0.4} metalness={0.9} />
      </mesh>
      <RearWing position={[0, 0.08, -1.7]} />
      <WheelAssembly position={[0.73, -0.15, 1.15]} isRear={false} isLeft={true} wheelRefs={wheelRefs} index={0} />
      <WheelAssembly position={[-0.73, -0.15, 1.15]} isRear={false} isLeft={false} wheelRefs={wheelRefs} index={1} />
      <WheelAssembly position={[0.73, -0.15, -0.95]} isRear={true} isLeft={true} wheelRefs={wheelRefs} index={2} />
      <WheelAssembly position={[-0.73, -0.15, -0.95]} isRear={true} isLeft={false} wheelRefs={wheelRefs} index={3} />
      <Suspension position={[0.55, -0.08, 1.15]} isRear={false} isLeft={true} />
      <Suspension position={[-0.55, -0.08, 1.15]} isRear={false} isLeft={false} />
      <Suspension position={[0.55, -0.08, -0.95]} isRear={true} isLeft={true} />
      <Suspension position={[-0.55, -0.08, -0.95]} isRear={true} isLeft={false} />
      <mesh position={[0, 0.05, 0.8]}>
        <boxGeometry args={[0.98, 0.004, 1.5]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0, 0.05, -0.3]}>
        <boxGeometry args={[0.78, 0.004, 1.2]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <pointLight position={[0, -0.35, 0.5]} distance={5} intensity={25} color="#ff3300" />
      <pointLight position={[0, -0.35, -0.8]} distance={5} intensity={22} color="#ff5500" />
    </group>
  );
}

export default function F1CarScene() {
  const mouse = useRef([0, 0]);
  return (
    <div className="absolute inset-0 z-0 w-full h-full pointer-events-auto">
      <Canvas
        gl={{ alpha: true }}
        shadows
        dpr={[1, 2]}
        onPointerMove={(e) => {
          mouse.current = [
            (e.clientX / window.innerWidth) * 2 - 1,
            (e.clientY / window.innerHeight) * 2 - 1
          ];
        }}
      >
        <PerspectiveCamera makeDefault position={[3, 1.2, 10]} fov={42} />
        <ambientLight intensity={1.2} />
        <directionalLight position={[12, 18, 8]} intensity={2.5} castShadow />
        <directionalLight position={[-10, 12, -5]} intensity={1.2} />
        <spotLight position={[0, 8, 15]} intensity={1.8} angle={0.4} penumbra={1} color="#ffffff" />
        <pointLight position={[-8, 4, 8]} intensity={0.8} color="#a0c4ff" />

        <Environment preset="studio" />

        <F1Car mouse={mouse} />

        <EffectComposer>
          <Bloom luminanceThreshold={0.75} mipmapBlur intensity={0.9} radius={0.55} />
          <ChromaticAberration offset={[0.0012, 0.0012]} />
          <SSAO radius={0.35} intensity={25} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}