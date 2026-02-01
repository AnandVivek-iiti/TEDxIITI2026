import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// --- CONFIGURATION ---
const PALETTE = {
  brown: 0x5a2a1b,
  red: 0xff2222,
  orange: 0xff6a00,
  yellow: 0xffcc00,
  cream: 0xfff1cc,
};

// --- STYLES ---
const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

    :root {
      --p-brown: #562717;
      --p-red: #C21717;
      --p-orange: #ff6a00;
      --p-yellow: #FEA712;
      --p-cream: #FDDCA9;
    }

    body {
      margin: 0;
      overflow: hidden;
      background-color: #1a1a1a;
      font-family: 'Orbitron', sans-serif;
      color: var(--p-cream);
      cursor: none;
    }

    /* --- CUSTOM CURSOR --- */
    #cursor-dot, #cursor-ring {
      position: fixed;
      top: 0; left: 0;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 10000;
    }

    #cursor-dot {
      width: 8px; height: 8px;
      background-color: var(--p-orange);
      border-radius: 50%;
      box-shadow: 0 0 10px var(--p-orange);
    }

    #cursor-ring {
      width: 40px; height: 40px;
      border: 1px solid var(--p-orange);
      border-radius: 50%;
      transition: width 0.3s, height 0.3s, border-color 0.3s, background-color 0.3s;
      mix-blend-mode: exclusion;
    }

    #cursor-ring::before, #cursor-ring::after {
      content: '';
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      opacity: 0.5;
    }

    #cursor-ring::before {
        width: 120%; height: 120%;
        border: 1px dashed var(--p-cream);
        animation: spin-right 10s linear infinite;
    }
    #cursor-ring::after {
        width: 60%; height: 60%;
        border-style: solid; border-width: 1px;
        border-color: transparent var(--p-orange);
        animation: spin-left 4s linear infinite;
    }

    body.hovering #cursor-ring {
      width: 60px; height: 60px;
      border-color: var(--p-red);
      background-color: rgba(194, 23, 23, 0.1);
      border-width: 2px;
    }
    body.hovering #cursor-dot {
      background-color: var(--p-red);
      box-shadow: 0 0 15px var(--p-red);
    }

    body.clicking #cursor-ring {
      width: 30px; height: 30px;
      background-color: var(--p-red);
      opacity: 0.8;
    }

    @keyframes spin-right { 0% { transform: translate(-50%, -50%) rotate(0deg); } 100% { transform: translate(-50%, -50%) rotate(360deg); } }
    @keyframes spin-left { 0% { transform: translate(-50%, -50%) rotate(360deg); } 100% { transform: translate(-50%, -50%) rotate(0deg); } }

    /* --- BACKGROUND --- */
    #canvas-wrapper, .scanlines {
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      z-index: 1;
    }

    #canvas-wrapper { filter: sepia(0.2) contrast(1.2) brightness(1.1); }
    .scanlines {
      background: repeating-linear-gradient(0deg, rgba(86, 39, 23, 0.2) 0px, transparent 1px, transparent 3px);
      pointer-events: none;
      z-index: 2;
    }

    /* --- HUD LAYOUT --- */
    .global-hud {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      pointer-events: none;
      z-index: 100;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 2rem;
      box-sizing: border-box;
      background: radial-gradient(circle, transparent 60%, rgba(10, 4, 2, 0.4) 150%);
    }

    /* Header Area (Brand + Nav collision handling) */
    header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
    }

    .brand {
      font-size: 2rem; font-weight: 900; letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--p-cream);
      text-shadow: 0 0 15px rgba(231, 98, 25, 0.8);
      pointer-events: auto;
      cursor: none;
    }

    /* --- NEW HORIZONTAL TOP NAV --- */
    nav {
      pointer-events: auto;
      display: flex;
      gap: 3vw; /* Responsive gap */
      padding-top: 10px;
    }

    nav a {
      font-size: 1rem;
      color: var(--p-cream);
      text-decoration: none;
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 2px;
      position: relative;
      cursor: none;
      transition: color 0.3s;
      opacity: 0.7;
    }

    nav a:hover {
        opacity: 1;
        color: var(--p-yellow);
        text-shadow: 0 0 10px var(--p-orange);
    }

    nav a.active {
        opacity: 1;
        color: var(--p-red);
    }

    /* Horizontal Underline Indicator */
    nav a::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 0%;
      height: 2px;
      background-color: var(--p-red);
      transition: width 0.3s ease-out;
      box-shadow: 0 0 10px var(--p-red);
    }

    nav a:hover::after, nav a.active::after {
        width: 100%;
    }

    /* --- PAGE CONTENT --- */
    .page-screen {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100vh;
      z-index: 50;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding: 150px 5vw 50px 5vw;
      box-sizing: border-box;
      opacity: 0;
      visibility: hidden;
      transform: translateY(20px);
      transition: opacity 0.5s ease, transform 0.5s ease, visibility 0.5s;
      pointer-events: none;
      background: rgba(10, 4, 2, 0.9);
      backdrop-filter: blur(5px);
      overflow-y: auto;
    }

    .page-screen.active-page {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
      transform: translateY(0);
    }

    /* Custom Scrollbar for pages */
    .page-screen::-webkit-scrollbar { width: 8px; }
    .page-screen::-webkit-scrollbar-track { background: #1a0d08; }
    .page-screen::-webkit-scrollbar-thumb { background: var(--p-orange); border-radius: 4px; }

    /* --- FOOTER / SPEEDOMETER --- */
    .footer-hud {
      display: flex; justify-content: space-between; align-items: flex-end;
      width: 100%; pointer-events: auto;
    }

    .speed-gauge { display: flex; flex-direction: column; }
    .speed-val {
      font-size: 5rem; font-weight: 900; line-height: 1;
      color: var(--p-cream);
      text-shadow: 0 0 20px var(--p-orange);
      font-variant-numeric: tabular-nums;
    }
    .speed-unit { font-size: 1rem; color: var(--p-red); font-weight: 700; letter-spacing: 2px; }

    button.register-btn {
      background: var(--p-orange);
      color: var(--p-brown);
      border: none;
      padding: 20px 60px;
      font-family: 'Orbitron', sans-serif;
      font-size: 1.2rem; font-weight: 900; text-transform: uppercase;
      cursor: none;
      clip-path: polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px);
      transition: 0.3s;
    }
    button.register-btn:hover {
      background: var(--p-yellow);
      box-shadow: 0 0 40px var(--p-orange);
      transform: scale(1.05);
    }

    h2 {
      font-size: 3rem;
      color: var(--p-yellow); border-bottom: 2px solid var(--p-red);
      padding-bottom: 10px; margin-bottom: 40px; margin-top: 0;
    }
    p {
      font-size: 1.2rem;
      line-height: 1.8; color: var(--p-cream); max-width: 800px;
    }
`;

const TedxIITIndore = () => {
  const [activePage, setActivePage] = useState('home');

  const mountRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const speedometerRef = useRef(null);

  // Simplified Nav Items (Removed Icons)
  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'team', label: 'TEAM' },
    { id: 'speakers', label: 'SPEAKERS' },
    { id: 'sponsors', label: 'SPONSORS' },
    { id: 'contact', label: 'CONTACT' },
  ];

  // ===============================
  // 1️⃣ CURSOR LOGIC
  // ===============================
  useEffect(() => {
    let mX = window.innerWidth / 2, mY = window.innerHeight / 2;
    let ringX = mX, ringY = mY;
    let requestID;

    const handleMouseMove = (e) => {
      mX = e.clientX;
      mY = e.clientY;
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = mX + 'px';
        cursorDotRef.current.style.top = mY + 'px';
      }
    };

    const handleMouseDown = () => document.body.classList.add('clicking');
    const handleMouseUp = () => document.body.classList.remove('clicking');

    const animateCursor = () => {
      ringX += (mX - ringX) * 0.15;
      ringY += (mY - ringY) * 0.15;
      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = ringX + 'px';
        cursorRingRef.current.style.top = ringY + 'px';
      }
      requestID = requestAnimationFrame(animateCursor);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    animateCursor();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(requestID);
      document.body.classList.remove('clicking', 'hovering');
    };
  }, []);

  // ===============================
  // 2️⃣ THREE.JS SCENE
  // ===============================
  useEffect(() => {
    if (!mountRef.current) return;

    THREE.ColorManagement.enabled = false;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x2a0f0a, 0.015);

    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 3.5, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(PALETTE.cream, 0.5));

    const topLight = new THREE.SpotLight(0xffffff, 2);
    topLight.position.set(0, 20, 10);
    topLight.angle = Math.PI / 4;
    topLight.penumbra = 0.5;
    scene.add(topLight);

    const frontLight = new THREE.DirectionalLight(0xffffff, 1.5);
    frontLight.position.set(0, 5, 15);
    scene.add(frontLight);

    const backLight = new THREE.PointLight(PALETTE.orange, 5, 15);
    backLight.position.set(0, 5, -5);
    scene.add(backLight);

    const carGroup = new THREE.Group();

    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xFF0000, emissive: 0x330000, metalness: 0.9, roughness: 0.05 });
    const accentMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, emissive: 0x222222, metalness: 0.5, roughness: 0.1 });
    const carbonMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.8, roughness: 0.2 });
    const glowYellow = new THREE.MeshStandardMaterial({ color: 0xFFFF00, emissive: 0xFFFF00, emissiveIntensity: 1.5 });
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.4 });

    const chassis = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.5, 3.5, 4), bodyMat);
    chassis.rotation.x = Math.PI / 2;
    chassis.position.set(0, 0.45, 0.5);

    const nose = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.3, 1.4, 4), accentMat);
    nose.rotation.x = Math.PI / 2;
    nose.position.set(0, 0.35, 2.7);

    carGroup.add(chassis, nose);

    const floor = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.05, 4.5), carbonMat);
    floor.position.y = 0.15;

    const sidePodGeo = new THREE.BoxGeometry(0.65, 0.45, 2.0);
    const sidePodL = new THREE.Mesh(sidePodGeo, bodyMat);
    sidePodL.position.set(0.7, 0.35, 0.2);
    sidePodL.rotation.y = 0.15;
    const sidePodR = sidePodL.clone();
    sidePodR.position.set(-0.7, 0.35, 0.2);
    sidePodR.rotation.y = -0.15;

    carGroup.add(floor, sidePodL, sidePodR);

    const fWingMain = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.05, 0.8), carbonMat);
    fWingMain.position.set(0, 0.2, 2.8);
    const fEndplate = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.35, 0.8), bodyMat);
    const fEndplateL = fEndplate.clone(); fEndplateL.position.set(1.4, 0.3, 2.8);
    const fEndplateR = fEndplate.clone(); fEndplateR.position.set(-1.4, 0.3, 2.8);
    carGroup.add(fWingMain, fEndplateL, fEndplateR);

    const rWingLower = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.05, 0.6), carbonMat);
    rWingLower.position.set(0, 0.9, -2.1);
    const rWingUpper = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.15, 0.5), bodyMat);
    rWingUpper.position.set(0, 1.15, -2.2);
    const rEndplate = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.9, 1.0), carbonMat);
    const rEndplateL = rEndplate.clone(); rEndplateL.position.set(1.2, 0.8, -2.1);
    const rEndplateR = rEndplate.clone(); rEndplateR.position.set(-1.2, 0.8, -2.1);
    carGroup.add(rWingLower, rWingUpper, rEndplateL, rEndplateR);

    const wheelGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.65, 32);
    wheelGeo.rotateZ(Math.PI / 2);
    const rimGeo = new THREE.TorusGeometry(0.28, 0.03, 12, 32);

    const makeWheel = (x, z, isRear) => {
        const group = new THREE.Group();
        const tire = new THREE.Mesh(wheelGeo, wheelMat);
        if (isRear) tire.scale.set(1.1, 1.3, 1.3);

        const rim = new THREE.Mesh(rimGeo, glowYellow);
        rim.rotation.y = Math.PI / 2;
        rim.position.x = x > 0 ? 0.33 : -0.33;

        group.add(tire, rim);
        group.position.set(x, 0.48, z);
        return group;
    };

    carGroup.add(makeWheel(1.4, 1.9, false));
    carGroup.add(makeWheel(-1.4, 1.9, false));
    carGroup.add(makeWheel(1.4, -1.7, true));
    carGroup.add(makeWheel(-1.4, -1.7, true));

    const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), new THREE.MeshStandardMaterial({ color: 0xff0000 }));
    helmet.position.set(0, 0.85, -0.2);
    carGroup.add(helmet);

    scene.add(carGroup);

    const gridSize = 400;
    const gridDivs = 80;
    const gridHelper = new THREE.GridHelper(gridSize, gridDivs, 0xC21717, 0x444444);
    gridHelper.position.y = -0.1;
    scene.add(gridHelper);

    const roadGroup = new THREE.Group();
    const dashGeo = new THREE.PlaneGeometry(0.3, 4);
    const dashMat = new THREE.MeshBasicMaterial({ color: PALETTE.yellow });
    for(let i = 0; i < 20; i++) {
        const dash = new THREE.Mesh(dashGeo, dashMat);
        dash.rotation.x = -Math.PI / 2;
        dash.position.y = -0.05;
        dash.position.z = -200 + (i * 15);
        roadGroup.add(dash);
    }
    scene.add(roadGroup);

    const tunnelGroup = new THREE.Group();
    const tunnelColors = [PALETTE.red, PALETTE.orange, PALETTE.yellow, PALETTE.cream];
    const tunnelMats = tunnelColors.map(c => new THREE.MeshBasicMaterial({ color: c }));
    const tunnelGeo = new THREE.BoxGeometry(0.05, 0.05, 10);

    for(let i = 0; i < 60; i++) {
        const matIndex = Math.floor(Math.random() * tunnelMats.length);
        const tLine = new THREE.Mesh(tunnelGeo, tunnelMats[matIndex]);

        const ang = Math.random() * Math.PI * 2;
        const rad = 8 + Math.random() * 6;

        tLine.position.set(
            Math.cos(ang) * rad,
            Math.sin(ang) * rad,
            Math.random() * -100
        );
        tLine.scale.z = 1 + Math.random();
        tunnelGroup.add(tLine);
    }
    scene.add(tunnelGroup);

    let speed = 0;
    let isTurbo = false;
    let mouseX = 0;
    let displaySpeed = 0;
    let animId;

    const onMouseMove = (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    };
    const onMouseDown = () => { isTurbo = true; };
    const onMouseUp = () => { isTurbo = false; };

    const onResize = () => {
       camera.aspect = window.innerWidth / window.innerHeight;
       camera.updateProjectionMatrix();
       renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('resize', onResize);

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const targetSpeed = isTurbo ? 2.5 : 0.8;
      speed = THREE.MathUtils.lerp(speed, targetSpeed, 0.05);

      const gridCellSize = gridSize / gridDivs;
      gridHelper.position.z += speed * 0.5;
      if (gridHelper.position.z > gridCellSize) {
         gridHelper.position.z %= gridCellSize;
      }

      roadGroup.children.forEach(dash => {
         dash.position.z += speed * 0.5;
         if(dash.position.z > 10) dash.position.z = -280;
      });

      tunnelGroup.children.forEach(p => {
         p.position.z += speed * 1.0;
         if(p.position.z > 20) p.position.z = -100;
      });

      carGroup.rotation.y = THREE.MathUtils.lerp(carGroup.rotation.y, Math.PI - (mouseX * 0.5), 0.1);
      carGroup.rotation.z = THREE.MathUtils.lerp(carGroup.rotation.z, mouseX * 0.1, 0.1);
      carGroup.position.x = THREE.MathUtils.lerp(carGroup.position.x, mouseX * 5, 0.05);

      camera.position.x = THREE.MathUtils.lerp(camera.position.x, carGroup.position.x * 0.6, 0.1);

      if(isTurbo) {
         camera.fov = THREE.MathUtils.lerp(camera.fov, 90, 0.05);
         camera.position.y = 3 + (Math.random() - 0.5) * 0.1;
      } else {
         camera.fov = THREE.MathUtils.lerp(camera.fov, 70, 0.05);
         camera.position.y = THREE.MathUtils.lerp(camera.position.y, 3.5, 0.1);
      }
      camera.updateProjectionMatrix();

      displaySpeed = Math.floor(THREE.MathUtils.lerp(displaySpeed, speed * 150, 0.1));
      if(speedometerRef.current) {
         speedometerRef.current.innerText = displaySpeed.toString().padStart(3, '0');
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mousedown', onMouseDown);
  window.removeEventListener('mouseup', onMouseUp);
  window.removeEventListener('resize', onResize);

  cancelAnimationFrame(animId);

  scene.traverse((obj) => {
    if (obj.geometry) obj.geometry.dispose();
    if (obj.material) {
      if (Array.isArray(obj.material)) {
        obj.material.forEach(m => m.dispose());
      } else {
        obj.material.dispose();
      }
    }
  });

  renderer.dispose();

  if (mountRef.current && renderer.domElement) {
    mountRef.current.removeChild(renderer.domElement);
  }

  THREE.ColorManagement.enabled = true;
};

  }, []);

  const handleHoverStart = () => document.body.classList.add('hovering');
  const handleHoverEnd = () => document.body.classList.remove('hovering');

  return (
    <>
      <style>{styles}</style>

      {/* CURSOR */}
      <div id="cursor-dot" ref={cursorDotRef}></div>
      <div id="cursor-ring" ref={cursorRingRef}></div>

      {/* HERO CANVAS */}
      <div id="canvas-wrapper" ref={mountRef}></div>
      <div className="scanlines"></div>

      {/* HUD CONTAINER */}
      <div className="global-hud">

        {/* TOP HEADER: BRAND + NAV */}
        <header>
          <div className="brand" onMouseEnter={handleHoverStart} onMouseLeave={handleHoverEnd}>
            <div>The Uncharted Lap</div>
            <div style={{ fontSize: '1.2rem', letterSpacing: '4px', opacity: 0.8 }}>TedxIITIndore</div>
          </div>

          {/* TOP NAVIGATION (Horizontal, No Icons) */}
          <nav>
            {navItems.map(item => (
              <a
                key={item.id}
                className={activePage === item.id ? 'active' : ''}
                onClick={() => setActivePage(item.id)}
                onMouseEnter={handleHoverStart}
                onMouseLeave={handleHoverEnd}
                role="button"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </header>

        {/* BOTTOM HUD */}
        <div className="footer-hud">
          <div className="speed-gauge">
            <div className="speed-val" ref={speedometerRef}>000</div>
            <div className="speed-unit">KM/H</div>
          </div>
          <button className="register-btn" onMouseEnter={handleHoverStart} onMouseLeave={handleHoverEnd}>
            Get Tickets
          </button>
        </div>
      </div>

      {/* CONTENT PAGES */}
      <section className={`page-screen ${activePage === 'about' ? 'active-page' : ''}`}>
        <h2>ABOUT THE EVENT</h2>
        <p>TEDxIITIndore is an independently organized event dedicated to ideas worth spreading. Join us as we explore the uncharted territories of innovation and speed.</p>
      </section>

      <section className={`page-screen ${activePage === 'team' ? 'active-page' : ''}`}>
        <h2>OUR RACE CREW</h2>
        <p>The TEDxIITIndore organizing team is comprised of dedicated students and faculty pushing the boundaries of what is possible.</p>
      </section>

      <section className={`page-screen ${activePage === 'speakers' ? 'active-page' : ''}`}>
        <h2>THE PILOTS</h2>
        <p>Meet the extraordinary speakers who steer the conversation toward the future.</p>
      </section>

      <section className={`page-screen ${activePage === 'sponsors' ? 'active-page' : ''}`}>
        <h2>POWERING THE ENGINE</h2>
        <p>Our sponsors fuel the ambition and scale of our event.</p>
      </section>

      <section className={`page-screen ${activePage === 'contact' ? 'active-page' : ''}`}>
        <h2>COMMUNICATION PORT</h2>
        <p>Reach out to us for queries, partnerships, or just to talk about the race.</p>
      </section>
    </>
  );
};

export default TedxIITIndore;
