import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

const TedxSite = () => {
  const [activePage, setActivePage] = useState('home');
  const [isTurbo, setIsTurbo] = useState(false);
  const [speedVal, setSpeedVal] = useState(0);

  // Refs for DOM elements and Three.js objects
  const mountRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const requestRef = useRef();
  const speedRef = useRef(0); // For sync with Three.js loop

  // --- PALETTE ---
  const PALETTE = {
    brown: '#562717',
    red: '#C21717',
    orange: '#E76219',
    yellow: '#FEA712',
    cream: '#FDDCA9',
    dark: '#0a0402',
    carbon: '#1a1a1a'
  };

  useEffect(() => {
    // --- CURSOR LOGIC ---
    let mX = window.innerWidth / 2;
    let mY = window.innerHeight / 2;
    let ringX = mX;
    let ringY = mY;

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
    const cursorAnimId = requestAnimationFrame(animateCursor);

    // --- THREE.JS ENGINE ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0402, 0.03);

    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 4, 12);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    scene.add(new THREE.AmbientLight(0xFDDCA9, 0.2));
    const dirLight = new THREE.DirectionalLight(0xFDDCA9, 4);
    dirLight.position.set(5, 10, -10);
    scene.add(dirLight);

    const underglow = new THREE.PointLight(0xE76219, 5, 20);
    underglow.position.set(0, -1, 2);
    scene.add(underglow);

    // --- CAR BUILDER ---
    const carGroup = new THREE.Group();
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xC21717, roughness: 0.3, metalness: 0.7 });
    const carbonMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.8, metalness: 0.2 });
    const glowMat = new THREE.MeshBasicMaterial({ color: 0xFEA712 });
    const tireMat = new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.9 });

    // Chassis & Nose
    const chassis = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.4, 2.0), bodyMat);
    chassis.position.y = 0.35;
    const nose = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.5, 2, 16), bodyMat);
    nose.rotation.x = Math.PI / 2;
    nose.position.set(0, 0.3, 1.8);
    nose.scale.set(1, 0.6, 1);
    carGroup.add(chassis, nose);

    // Cockpit
    const cockpit = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.35, 1.0), carbonMat);
    cockpit.position.set(0, 0.55, 0.2);
    carGroup.add(cockpit);

    // Wings
    const fwMain = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.05, 0.6), carbonMat);
    fwMain.position.set(0, 0.1, 2.7);
    carGroup.add(fwMain);

    const rwMain = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.08, 0.7), carbonMat);
    rwMain.position.set(0, 1.1, -1.8);
    carGroup.add(rwMain);

    // Wheels logic
    const wheelGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.5, 24);
    wheelGeo.rotateZ(Math.PI / 2);
    [ [1.2, 1.8], [-1.2, 1.8], [1.3, -1.5], [-1.3, -1.5] ].forEach(pos => {
      const wheel = new THREE.Mesh(wheelGeo, tireMat);
      wheel.position.set(pos[0], 0.45, pos[1]);
      carGroup.add(wheel);
    });

    scene.add(carGroup);

    // --- ENVIRONMENT ---
    const gridHelper = new THREE.GridHelper(400, 60, 0xC21717, 0x562717);
    gridHelper.position.y = -0.1;
    scene.add(gridHelper);

    // --- ANIMATION LOOP ---
    let internalSpeed = 0;
    let mouseXRatio = 0;

    const handleMouseMove3D = (e) => {
      mouseXRatio = (e.clientX / window.innerWidth) * 2 - 1;
    };
    window.addEventListener('mousemove', handleMouseMove3D);

    const animate = () => {
      const targetSpeed = speedRef.current; // Controlled by React state via Ref
      internalSpeed = THREE.MathUtils.lerp(internalSpeed, targetSpeed, 0.03);

      gridHelper.position.z += internalSpeed;
      if (gridHelper.position.z > 6.6) gridHelper.position.z = 0;

      carGroup.rotation.y = THREE.MathUtils.lerp(carGroup.rotation.y, Math.PI + (-mouseXRatio * 0.3), 0.05);
      carGroup.position.x = THREE.MathUtils.lerp(carGroup.position.x, mouseXRatio * 6, 0.05);

      // Dynamic FOV for turbo
      const targetFov = speedRef.current > 2 ? 110 : 75;
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.05);
      camera.updateProjectionMatrix();

      // Update React state for Speedometer (throttled/simplified)
      setSpeedVal(Math.floor(internalSpeed * 80));

      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleMouseMove3D);
      cancelAnimationFrame(cursorAnimId);
      cancelAnimationFrame(requestRef.current);
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  // Sync React `isTurbo` to Three.js loop via Ref
  useEffect(() => {
    speedRef.current = isTurbo ? 4.0 : 1.2;
  }, [isTurbo]);

  const handleNavClick = (page) => {
    setActivePage(page);
  };

  return (
    <div
      style={{
        backgroundColor: PALETTE.dark,
        color: PALETTE.cream,
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        fontFamily: "'Orbitron', sans-serif",
        cursor: 'none'
      }}
      onMouseDown={() => setIsTurbo(true)}
      onMouseUp={() => setIsTurbo(false)}
    >
      {/* Custom Cursor */}
      <div ref={cursorDotRef} className="cursor-dot" />
      <div ref={cursorRingRef} className={`cursor-ring ${isTurbo ? 'clicking' : ''}`} />

      {/* Three.js Canvas */}
      <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 1 }} />
      <div className="scanlines" />

      {/* GLOBAL HUD */}
      <div className="global-hud">
        <header>
          <div className="brand">TEDx<span>IITIndore</span></div>
        </header>

        <div className="footer-hud">
          <div className="speed-gauge">
            <div className="speed-val">{speedVal.toString().padStart(3, '0')}</div>
            <div className="speed-unit">KM/H // TURBO {isTurbo ? 'ACTIVE' : 'READY'}</div>
          </div>
          <button className="register-btn">Get Tickets</button>
        </div>
        <div className="hint">[ CLICK & HOLD TO BOOST ]</div>
      </div>

      {/* Navigation */}
      <nav className="nav-container">
        {['home', 'about', 'team', 'speakers', 'contact'].map((page) => (
          <a
            key={page}
            className={activePage === page ? 'active' : ''}
            onClick={() => handleNavClick(page)}
          >
            {page.toUpperCase()}
          </a>
        ))}
      </nav>

      {/* Page Content */}
      <main>
        <section id="home" className={`page-screen ${activePage === 'home' ? 'active-page' : ''}`}>
          <div className="hero-center">
            <h1>
              <span className="outline">The</span><br />
              <span className="filled">Uncharted Lap</span>
            </h1>
          </div>
        </section>

        <section id="about" className={`page-screen content-page ${activePage === 'about' ? 'active-page' : ''}`}>
          <h2>:: MISSION BRIEF</h2>
          <p>TEDxIITIndore is an independently organized event dedicated to ideas worth spreading...</p>
          <p>We are leaving the pitlane of conventional thinking and accelerating towards a future defined by bold risks.</p>
        </section>

        {/* Add other sections (team, speakers, etc.) similarly */}
      </main>

      <style jsx="true">{`
        .cursor-dot {
          position: fixed; width: 8px; height: 8px; background: ${PALETTE.orange};
          border-radius: 50%; pointer-events: none; z-index: 10000; transform: translate(-50%, -50%);
          box-shadow: 0 0 10px ${PALETTE.orange};
        }
        .cursor-ring {
          position: fixed; width: 40px; height: 40px; border: 1px solid ${PALETTE.orange};
          border-radius: 50%; pointer-events: none; z-index: 10000; transform: translate(-50%, -50%);
          transition: width 0.3s, height 0.3s;
        }
        .cursor-ring.clicking { width: 30px; height: 30px; background: ${PALETTE.red}; opacity: 0.5; }

        .scanlines {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: repeating-linear-gradient(0deg, rgba(86, 39, 23, 0.1) 0px, transparent 1px, transparent 4px);
          pointer-events: none; z-index: 5;
        }

        .global-hud {
          position: fixed; inset: 0; pointer-events: none; z-index: 100;
          display: flex; flex-direction: column; justify-content: space-between; padding: 2rem;
        }

        .brand { font-size: 2rem; font-weight: 900; pointer-events: auto; }
        .brand span { color: ${PALETTE.red}; }

        .nav-container {
          position: fixed; top: 50%; right: 2rem; transform: translateY(-50%);
          display: flex; flex-direction: column; gap: 1rem; z-index: 120;
        }
        .nav-container a {
          cursor: none; color: ${PALETTE.cream}; text-decoration: none;
          font-size: 1.1rem; text-align: right; transition: 0.3s;
        }
        .nav-container a.active { color: ${PALETTE.red}; font-weight: bold; border-right: 4px solid ${PALETTE.orange}; padding-right: 10px; }

        .footer-hud { display: flex; justify-content: space-between; align-items: flex-end; pointer-events: auto; }
        .speed-val { font-size: 5rem; font-weight: 900; text-shadow: 0 0 20px ${PALETTE.orange}; }

        .register-btn {
          background: ${PALETTE.orange}; border: none; padding: 15px 40px;
          font-family: 'Orbitron'; font-weight: 900; clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%);
          cursor: none; transition: 0.3s;
        }
        .register-btn:hover { background: ${PALETTE.yellow}; transform: scale(1.05); }

        .page-screen {
          position: absolute; inset: 0; z-index: 50; padding: 10% 5%;
          display: flex; flex-direction: column; opacity: 0; visibility: hidden;
          transition: all 0.6s ease; transform: translateY(20px);
        }
        .active-page { opacity: 1; visibility: visible; transform: translateY(0); }
        .content-page { background: rgba(10, 4, 2, 0.9); pointer-events: auto; overflow-y: auto; }

        .hero-center h1 { font-size: 5vw; line-height: 1; text-transform: uppercase; }
        .outline { -webkit-text-stroke: 2px ${PALETTE.orange}; color: transparent; }
        .filled { color: ${PALETTE.cream}; }

        .hint { text-align: center; color: ${PALETTE.red}; letter-spacing: 2px; animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
      `}</style>
    </div>
  );
};

export default TedxSite;
