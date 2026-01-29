import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Zap } from 'lucide-react';

export default function Hero() {
  const [isTurbo, setIsTurbo] = useState(false);
  
  // Refs for DOM elements
  const canvasRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const speedometerRef = useRef(null);
  
  useEffect(() => {
    // --- CURSOR LOGIC ---
    let mX = 0, mY = 0, ringX = 0, ringY = 0;
    
    const handleMouseMove = (e) => {
      mX = e.clientX;
      mY = e.clientY;
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${mX}px`;
        cursorDotRef.current.style.top = `${mY}px`;
      }
    };

    const animateCursor = () => {
      ringX += (mX - ringX) * 0.15;
      ringY += (mY - ringY) * 0.15;
      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = `${ringX}px`;
        cursorRingRef.current.style.top = `${ringY}px`;
      }
      requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animateCursor();

    // --- THREE.JS ENGINE ---
    const PALETTE = {
      brown: 0x562717, red: 0xC21717, orange: 0xE76219, 
      yellow: 0xFEA712, cream: 0xFDDCA9, darkBrown: 0x1a0d08 
    };

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x1a1a1a, 0.025);
    
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 3.5, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    
    // Mount renderer
    if (canvasRef.current) {
        // clear previous canvas if any
        while (canvasRef.current.firstChild) {
            canvasRef.current.removeChild(canvasRef.current.firstChild);
        }
        canvasRef.current.appendChild(renderer.domElement);
    }

    // Lights
    scene.add(new THREE.AmbientLight(PALETTE.cream, 0.5));
    const topLight = new THREE.SpotLight(0xffffff, 2);
    topLight.position.set(0, 20, 10);
    scene.add(topLight);
    const backLight = new THREE.PointLight(PALETTE.orange, 5, 20);
    backLight.position.set(0, 5, -5);
    scene.add(backLight);

    // Car Builder
    const carGroup = new THREE.Group();
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xFF0000, metalness: 0.9, roughness: 0.05 });
    const accentMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, metalness: 0.5, roughness: 0.1 });
    const glowYellow = new THREE.MeshStandardMaterial({ color: 0xFFFF00, emissive: 0xFFFF00, emissiveIntensity: 1.5 });

    const chassis = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.5, 3.5, 4), bodyMat);
    chassis.rotateX(Math.PI/2);
    chassis.position.set(0, 0.45, 0.5);
    
    const nose = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.3, 1.4, 4), accentMat);
    nose.rotateX(Math.PI/2);
    nose.position.set(0, 0.35, 2.7);
    carGroup.add(chassis, nose);

    // Wheels logic
    const wheelGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.65, 32);
    wheelGeo.rotateZ(Math.PI/2);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.4 });
    
    const makeWheel = (x, z, isRear = false) => {
      const wGroup = new THREE.Group();
      const w = new THREE.Mesh(wheelGeo, wheelMat);
      if(isRear) w.scale.set(1.1, 1.3, 1.3);
      const rim = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.03, 12, 32), glowYellow);
      rim.rotation.y = Math.PI/2;
      rim.position.x = x > 0 ? 0.33 : -0.33;
      wGroup.add(w, rim);
      wGroup.position.set(x, 0.48, z);
      return wGroup;
    };

    carGroup.add(makeWheel(1.4, 1.9), makeWheel(-1.4, 1.9), makeWheel(1.4, -1.7, true), makeWheel(-1.4, -1.7, true));
    scene.add(carGroup);

    // Environment
    const gridSize = 400;
    const gridHelper = new THREE.GridHelper(gridSize, 80, 0xE76219, 0x444444);
    gridHelper.position.y = -0.1;
    scene.add(gridHelper);

    const roadGroup = new THREE.Group();
    const dashGeo = new THREE.PlaneGeometry(0.3, 4);
    const dashMat = new THREE.MeshBasicMaterial({ color: PALETTE.yellow });
    for(let i=0; i<20; i++) {
      const dash = new THREE.Mesh(dashGeo, dashMat);
      dash.rotation.x = -Math.PI / 2;
      dash.position.set(0, -0.05, -500 + (i * 10));
      roadGroup.add(dash);
    }
    scene.add(roadGroup);

    // Animation variables
    let speed = 0;
    let displaySpeed = 0;
    let internalMouseX = 0;
    let frameId;

    const handleWindowMouseMove = (e) => {
        internalMouseX = (e.clientX / window.innerWidth) * 2 - 1;
    };
    window.addEventListener('mousemove', handleWindowMouseMove);

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const targetSpeed = isTurbo ? 2.0 : 0.8;
      speed = THREE.MathUtils.lerp(speed, targetSpeed, 0.05);

      gridHelper.position.z += speed * 0.35;
      if (gridHelper.position.z > (gridSize/80)) gridHelper.position.z = 0;

      roadGroup.children.forEach(dash => {
        dash.position.z += speed * 0.35;
        if(dash.position.z > 20) dash.position.z = -180;
      });

      carGroup.rotation.y = THREE.MathUtils.lerp(carGroup.rotation.y, Math.PI - internalMouseX * 0.5, 0.1);
      carGroup.position.x = THREE.MathUtils.lerp(carGroup.position.x, internalMouseX * 5, 0.05);
      
      if(isTurbo) {
        camera.fov = THREE.MathUtils.lerp(camera.fov, 100, 0.05);
        camera.position.y = 3 + (Math.random()-0.5)*0.1;
      } else {
        camera.fov = THREE.MathUtils.lerp(camera.fov, 70, 0.05);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, 3.5, 0.1);
      }
      camera.updateProjectionMatrix();

      displaySpeed = Math.floor(THREE.MathUtils.lerp(displaySpeed, speed * 150, 0.1));
      if (speedometerRef.current) {
        speedometerRef.current.innerText = displaySpeed.toString().padStart(3, '0');
      }

      renderer.render(scene, camera);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('resize', handleResize);
      if(frameId) cancelAnimationFrame(frameId);
      renderer.dispose();
      if(canvasRef.current) canvasRef.current.innerHTML = '';
    };
  }, [isTurbo]);

  return (
    <div className={`relative w-full h-screen overflow-hidden ${isTurbo ? 'turbo-active' : ''}`}>
      <style>{`
        :root {
          --p-brown: #562717; --p-red: #C21717; --p-orange: #E76219;
          --p-yellow: #FEA712; --p-cream: #FDDCA9;
        }
        #cursor-dot, #cursor-ring { position: fixed; top: 0; left: 0; transform: translate(-50%, -50%); pointer-events: none; z-index: 10000; }
        #cursor-dot { width: 8px; height: 8px; background-color: var(--p-orange); border-radius: 50%; box-shadow: 0 0 10px var(--p-orange); }
        #cursor-ring { width: 40px; height: 40px; border: 1px solid var(--p-orange); border-radius: 50%; transition: width 0.3s, height 0.3s; mix-blend-mode: exclusion; }
        
        .speed-val { font-size: 5rem; font-weight: 900; color: var(--p-cream); text-shadow: 0 0 20px var(--p-orange); }
        .register-btn { background: var(--p-orange); border: none; padding: 20px 60px; font-family: 'Orbitron', sans-serif; font-weight: 900; color: white; cursor: none; clip-path: polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px); transition: transform 0.2s; }
        .register-btn:hover { transform: scale(1.05); background: var(--p-red); }
        .register-btn:active { transform: scale(0.95); }

        .scanlines { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: repeating-linear-gradient(0deg, rgba(86, 39, 23, 0.2) 0px, transparent 1px, transparent 3px); pointer-events: none; z-index: 5; }
      `}</style>

      {/* Custom Cursor */}
      <div id="cursor-dot" ref={cursorDotRef}></div>
      <div id="cursor-ring" ref={cursorRingRef}></div>

      {/* Background (Three.js) */}
      <div ref={canvasRef} className="absolute inset-0 z-0"></div>
      <div className="scanlines"></div>

      {/* HUD Content */}
      <div className="absolute inset-0 z-10 p-10 flex flex-col justify-between pointer-events-none">
        
        {/* Top Header - Merged with original styling logic */}
        <header className="pointer-events-auto mt-20 md:mt-10">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 border border-red-600/30 bg-red-600/5 text-red-500 text-[10px] font-black uppercase tracking-[0.4em]">
                <Zap className="w-3.5 h-3.5 fill-current" /> The Uncharted Lap
            </div>
            <h1 className="text-[2rem] md:text-[3rem] font-black leading-[0.85] italic tracking-tighter text-white">
                TEDx<span className="text-red-600">IIT INDORE</span>
            </h1>
        </header>

        {/* Bottom HUD */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 pointer-events-auto">
          <div className="flex flex-col">
            <div className="speed-val font-mono" ref={speedometerRef}>000</div>
            <div className="text-red-500 font-black tracking-[0.2em] text-sm">KM/H</div>
          </div>
          
          <button 
            className="register-btn text-xl italic"
            onMouseDown={() => setIsTurbo(true)}
            onMouseUp={() => setIsTurbo(false)}
            onMouseLeave={() => setIsTurbo(false)}
            onTouchStart={() => setIsTurbo(true)}
            onTouchEnd={() => setIsTurbo(false)}
          >
            HOLD FOR TURBO
          </button>
        </div>
      </div>
    </div>
  );
}