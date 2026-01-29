import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const TedxIITIndore = () => {
  const [activePage, setActivePage] = useState('home');
  const [isTurbo, setIsTurbo] = useState(false);
  
  // Refs for DOM elements
  const canvasRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const speedometerRef = useRef(null);
  
  // Navigation Data
  const navItems = [
    { id: 'home', label: 'HOME', icon: 'fa-house' },
    { id: 'about', label: 'ABOUT', icon: 'fa-circle-info' },
    { id: 'team', label: 'TEAM', icon: 'fa-users-gear' },
    { id: 'speakers', label: 'SPEAKERS', icon: 'fa-microphone-lines' },
    { id: 'sponsors', label: 'SPONSORS', icon: 'fa-handshake' },
    { id: 'contact', label: 'CONTACT', icon: 'fa-headset' },
  ];

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

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    canvasRef.current.appendChild(renderer.domElement);

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
    const carbonMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.8, roughness: 0.2 });
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

    const handleWindowMouseMove = (e) => {
        internalMouseX = (e.clientX / window.innerWidth) * 2 - 1;
    };
    window.addEventListener('mousemove', handleWindowMouseMove);

    const animate = () => {
      const frameId = requestAnimationFrame(animate);
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
      renderer.dispose();
      // Additional geometry/material cleanup should happen here for full optimization
    };
  }, [isTurbo]); // Re-run effect when Turbo changes or handle turbo via ref for better perf

  return (
    <div className={`app-container ${isTurbo ? 'turbo-active' : ''}`}>
      <style>{`
        :root {
          --p-brown: #562717; --p-red: #C21717; --p-orange: #E76219;
          --p-yellow: #FEA712; --p-cream: #FDDCA9;
        }
        body { margin: 0; background-color: #1a1a1a; font-family: 'Orbitron', sans-serif; color: var(--p-cream); cursor: none; overflow: hidden; }
        #cursor-dot, #cursor-ring { position: fixed; top: 0; left: 0; transform: translate(-50%, -50%); pointer-events: none; z-index: 10000; }
        #cursor-dot { width: 8px; height: 8px; background-color: var(--p-orange); border-radius: 50%; box-shadow: 0 0 10px var(--p-orange); }
        #cursor-ring { width: 40px; height: 40px; border: 1px solid var(--p-orange); border-radius: 50%; transition: width 0.3s, height 0.3s; mix-blend-mode: exclusion; }
        
        .global-hud { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 100; display: flex; flex-direction: column; justify-content: space-between; padding: 2rem; box-sizing: border-box; }
        .brand { font-size: 2rem; font-weight: 900; color: var(--p-cream); text-shadow: 0 0 15px rgba(231, 98, 25, 0.8); pointer-events: auto; }
        
        nav { position: fixed; z-index: 120; top: 50%; right: 2rem; transform: translateY(-50%); display: flex; flex-direction: column; gap: 20px; pointer-events: auto; }
        nav a { cursor: none; display: flex; align-items: center; justify-content: flex-end; color: var(--p-cream); text-decoration: none; }
        nav a i { font-size: 1.5rem; margin-left: 15px; transition: 0.3s; }
        .nav-text { opacity: 0; transform: translateX(10px); transition: 0.3s; }
        nav a:hover .nav-text { opacity: 1; transform: translateX(0); }
        nav a.active i { color: var(--p-red); }

        .page-screen { position: absolute; top: 0; left: 0; width: 100%; height: 100vh; z-index: 50; display: flex; flex-direction: column; padding: 150px 5vw; box-sizing: border-box; opacity: 0; visibility: hidden; transition: 0.5s; background: rgba(10, 4, 2, 0.85); }
        .page-screen.active { opacity: 1; visibility: visible; transform: translateY(0); }
        
        .speed-val { font-size: 5rem; font-weight: 900; color: var(--p-cream); text-shadow: 0 0 20px var(--p-orange); }
        button.register-btn { background: var(--p-orange); border: none; padding: 20px 60px; font-family: 'Orbitron'; font-weight: 900; clip-path: polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px); pointer-events: auto; }
        
        .scanlines { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: repeating-linear-gradient(0deg, rgba(86, 39, 23, 0.2) 0px, transparent 1px, transparent 3px); pointer-events: none; z-index: 5; }
      `}</style>

      {/* Custom Cursor */}
      <div id="cursor-dot" ref={cursorDotRef}></div>
      <div id="cursor-ring" ref={cursorRingRef}></div>

      {/* Background */}
      <div ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 1 }}></div>
      <div className="scanlines"></div>

      {/* HUD */}
      <div className="global-hud">
        <header>
          <div className="brand" onMouseEnter={() => document.body.classList.add('hovering')} onMouseLeave={() => document.body.classList.remove('hovering')}>
            The Uncharted Lap <span style={{display:'block', fontSize: '0.5em', color: 'var(--p-red)'}}>TedxIITIndore</span>
          </div>
        </header>

        <div className="footer-hud" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', pointerEvents: 'auto'}}>
          <div className="speed-gauge">
            <div className="speed-val" ref={speedometerRef}>000</div>
            <div className="speed-unit" style={{color: 'var(--p-red)', letterSpacing: '2px'}}>KM/H</div>
          </div>
          <button 
            className="register-btn"
            onMouseDown={() => setIsTurbo(true)}
            onMouseUp={() => setIsTurbo(false)}
          >
            Get Tickets
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav>
        {navItems.map(item => (
          <a 
            key={item.id}
            className={activePage === item.id ? 'active' : ''} 
            onClick={() => setActivePage(item.id)}
          >
            <span className="nav-text">{item.label}</span>
            <i className={`fa-solid ${item.icon}`}></i>
          </a>
        ))}
      </nav>

      {/* Content Sections */}
      <section className={`page-screen ${activePage === 'about' ? 'active' : ''}`}>
        <h2>ABOUT THE EVENT</h2>
        <p>TEDxIITIndore is an independently organized event dedicated to ideas worth spreading...</p>
      </section>

      <section className={`page-screen ${activePage === 'team' ? 'active' : ''}`}>
        <h2>OUR RACE CREW</h2>
        <p>The TEDxIITIndore organizing team is comprised of dedicated students and faculty...</p>
      </section>

      {/* Add more sections as needed following the pattern above */}
    </div>
  );
};

export default TedxIITIndore;
