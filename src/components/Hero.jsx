import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';

// --- CONFIGURATION ---
const PALETTE = {
  brown: 0x5a2a1b,
  red: 0xff2222,
  orange: 0xff6a00,
  yellow: 0xffcc00,
  cream: 0xfff1cc,
};

// --- STYLES (Scoped to this component) ---
const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');

    :root {
      --p-brown: #562717;
      --p-red: #C21717;
      --p-orange: #ff6a00;
      --p-yellow: #FEA712;
      --p-cream: #FDDCA9;
    }

    /* Container for the Hero section */
    .hero-container {
      font-family: 'Orbitron', sans-serif; 
      color: var(--p-cream);
      width: 100%;
      height: 100vh; /* Takes full viewport height */
      overflow: hidden;
      position: relative;
    }

    #canvas-wrapper {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      filter: sepia(0.2) contrast(1.2) brightness(1.1);
      z-index: 0;
    }
    
    .scanlines {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: repeating-linear-gradient(0deg, rgba(86, 39, 23, 0.2) 0px, transparent 1px, transparent 3px);
      pointer-events: none; 
      z-index: 1;
    }

    .global-hud {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      pointer-events: none;
      z-index: 10;
      display: flex;
      flex-direction: column;
      justify-content: space-between; /* CHANGED: Pushes header to top, footer to bottom */
      padding: 2rem;
      padding-bottom: 6rem;
      box-sizing: border-box;
      background: radial-gradient(circle, transparent 60%, rgba(10, 4, 2, 0.4) 150%);
    }

    /* --- NEW HEADER STYLES --- */
    .header-hud {
      margin-top: 80px; /* Offset for the navbar */
      display: flex;
      align-items: baseline;
      gap: 1rem;
      pointer-events: auto; /* Allow interaction if needed */
    }

    .title-part {
      font-weight: 900;
      font-style: italic;
      text-transform: uppercase;
      line-height: 1;
      text-shadow: 2px 2px 0px rgba(0,0,0,0.5);
    }

    .title-white {
      font-size: 1.5rem;
      color: var(--p-cream);
    }

    .title-red {
      font-size: 2.5rem;
      color: var(--p-red);
      text-shadow: 0 0 30px rgba(194, 23, 23, 0.6);
    }
    
    /* Responsive adjustment for smaller screens */
    @media (max-width: 1024px) {
        .title-white { font-size: 1.5rem; }
        .title-red { font-size: 3rem; }
    }
    /* ------------------------- */

    .footer-hud {
      display: flex; justify-content: space-between; align-items: flex-end;
      width: 100%; 
      pointer-events: auto;
    }

    .speed-gauge { display: flex; flex-direction: column; }
    .speed-val {
      font-size: 5rem; font-weight: 900; line-height: 1;
      color: var(--p-cream);
      text-shadow: 0 0 20px var(--p-orange);
      font-variant-numeric: tabular-nums; 
    }
    .speed-unit { font-size: 1rem; color: var(--p-red); font-weight: 700; letter-spacing: 2px; }

    .register-btn {
      display: inline-block;
      background: var(--p-orange); 
      color: var(--p-brown); 
      text-decoration: none;
      border: none;
      padding: 20px 60px; 
      font-family: 'Orbitron', sans-serif;
      font-size: 1.2rem; font-weight: 900; text-transform: uppercase;
      clip-path: polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px);
      transition: 0.3s;
      cursor: pointer;
    }
    .register-btn:hover {
      background: var(--p-yellow); 
      box-shadow: 0 0 40px var(--p-orange);
      transform: scale(1.05);
      color: var(--p-brown);
    }
`;

const Hero = () => {
  const mountRef = useRef(null);
  const speedometerRef = useRef(null);

  // ===============================
  // THREE.JS SCENE
  // ===============================
  useEffect(() => {
    if (!mountRef.current) return;

    // cleanup previous scene if any
    while(mountRef.current.firstChild){
        mountRef.current.removeChild(mountRef.current.firstChild);
    }

    THREE.ColorManagement.enabled = false;

    // 1. Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x2a0f0a, 0.02); 

    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 3.5, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // 2. Lights
    scene.add(new THREE.AmbientLight(PALETTE.cream, 0.6));
    
    const topLight = new THREE.SpotLight(0xffffff, 3);
    topLight.position.set(0, 20, 10);
    topLight.angle = Math.PI / 4;
    topLight.penumbra = 0.5;
    scene.add(topLight);

    const frontLight = new THREE.DirectionalLight(0xffffff, 2);
    frontLight.position.set(0, 5, 15);
    scene.add(frontLight);

    const backLight = new THREE.PointLight(PALETTE.orange, 5, 15);
    backLight.position.set(0, 5, -5);
    scene.add(backLight);

    // 3. CAR MODEL
    const carGroup = new THREE.Group();
    const wheels = []; 

    // Materials
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xFF0000, emissive: 0x330000, metalness: 0.9, roughness: 0.05 });
    const accentMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, emissive: 0x222222, metalness: 0.5, roughness: 0.1 });
    const carbonMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.8, roughness: 0.2 });
    const glowYellow = new THREE.MeshStandardMaterial({ color: 0xFFFF00, emissive: 0xFFFF00, emissiveIntensity: 2 }); // Brighter glow
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.4 });

    // Chassis & Nose
    const chassis = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.5, 3.5, 4), bodyMat);
    chassis.rotation.x = Math.PI / 2;
    chassis.position.set(0, 0.45, 0.5);
    
    const nose = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.3, 1.4, 4), accentMat);
    nose.rotation.x = Math.PI / 2;
    nose.position.set(0, 0.35, 2.7);
    carGroup.add(chassis, nose);

    // Floor & Sidepods
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

    // Wings
    const fWingMain = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.05, 0.8), carbonMat);
    fWingMain.position.set(0, 0.2, 2.8);
    carGroup.add(fWingMain);

    const rWingLower = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.05, 0.6), carbonMat);
    rWingLower.position.set(0, 0.9, -2.1);
    const rWingUpper = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.15, 0.5), bodyMat);
    rWingUpper.position.set(0, 1.15, -2.2);
    const rEndplate = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.9, 1.0), carbonMat);
    const rEndplateL = rEndplate.clone(); rEndplateL.position.set(1.2, 0.8, -2.1);
    const rEndplateR = rEndplate.clone(); rEndplateR.position.set(-1.2, 0.8, -2.1);
    carGroup.add(rWingLower, rWingUpper, rEndplateL, rEndplateR);

    // --- UPDATED WHEELS WITH SPOKES ---
    const wheelGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.65, 32);
    wheelGeo.rotateZ(Math.PI / 2);
    const rimGeo = new THREE.TorusGeometry(0.28, 0.03, 12, 32);
    const spokeGeo = new THREE.BoxGeometry(0.7, 0.1, 0.1); 

    const makeWheel = (x, z, isRear) => {
        const group = new THREE.Group();
        
        // 1. Tire
        const tire = new THREE.Mesh(wheelGeo, wheelMat);
        if (isRear) tire.scale.set(1.1, 1.3, 1.3);
        
        // 2. Rim (Glowing Ring)
        const rim = new THREE.Mesh(rimGeo, glowYellow);
        rim.rotation.y = Math.PI / 2;
        rim.position.x = x > 0 ? 0.33 : -0.33;

        // 3. Spoke (The Spinning Bar)
        const spoke = new THREE.Mesh(spokeGeo, glowYellow);
        spoke.rotation.y = Math.PI / 2; // Face outward
        spoke.position.x = x > 0 ? 0.33 : -0.33;

        group.add(tire, rim, spoke);
        group.position.set(x, 0.48, z);
        
        wheels.push(group); 
        return group;
    };

    carGroup.add(makeWheel(1.4, 1.9, false));
    carGroup.add(makeWheel(-1.4, 1.9, false));
    carGroup.add(makeWheel(1.4, -1.7, true));
    carGroup.add(makeWheel(-1.4, -1.7, true));

    // Helmet
    const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), new THREE.MeshStandardMaterial({ color: 0xff0000 }));
    helmet.position.set(0, 0.85, -0.2);
    carGroup.add(helmet);

    scene.add(carGroup);

    // 4. MOVING ENVIRONMENT
    const gridSize = 400; 
    const gridDivs = 80;
    const gridHelper = new THREE.GridHelper(gridSize, gridDivs, 0xC21717, 0x444444);
    gridHelper.position.y = -0.1;
    scene.add(gridHelper);

    // Road Lines
    const roadGroup = new THREE.Group();
    const dashGeo = new THREE.PlaneGeometry(0.3, 5);
    const dashMat = new THREE.MeshBasicMaterial({ color: PALETTE.yellow });
    for(let i = 0; i < 30; i++) {
        const dash = new THREE.Mesh(dashGeo, dashMat);
        dash.rotation.x = -Math.PI / 2;
        dash.position.y = -0.05;
        dash.position.z = -300 + (i * 15);
        roadGroup.add(dash);
    }
    scene.add(roadGroup);

    // Particles (Speed Lines)
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for(let i=0; i<particleCount*3; i+=3) {
        particlePos[i] = (Math.random() - 0.5) * 50; 
        particlePos[i+1] = Math.random() * 20;       
        particlePos[i+2] = Math.random() * -200;     
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.2, transparent: true, opacity: 0.6 });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 5. ANIMATION STATE
    let speed = 0;
    let isTurbo = false;
    let mouseX = 0;
    let displaySpeed = 0;
    let animId;

    // --- EVENTS ---
    const onMouseMove = (e) => {
        // -1 to 1
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

    // --- ANIMATION LOOP ---
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // 1. Acceleration
      const targetSpeed = isTurbo ? 4.0 : 1.5; // Increased base speed
      speed = THREE.MathUtils.lerp(speed, targetSpeed, 0.03);

      // 2. Wheel Spin
      wheels.forEach(w => {
          w.rotation.x -= speed * 0.2; 
      });

      // 3. Move Environment
      // Grid
      const gridCellSize = gridSize / gridDivs;
      gridHelper.position.z += speed * 0.8;
      if (gridHelper.position.z > gridCellSize) gridHelper.position.z %= gridCellSize;

      // Road Dashes
      roadGroup.children.forEach(dash => {
         dash.position.z += speed * 0.8;
         if(dash.position.z > 10) dash.position.z = -300;
      });

      // Particles
      const positions = particleSystem.geometry.attributes.position.array;
      for(let i=2; i<particleCount*3; i+=3) {
          positions[i] += speed * 2.0; 
          if(positions[i] > 20) positions[i] = -200;
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;

      // 4. Car Physics (Steering)
      // Yaw
      carGroup.rotation.y = THREE.MathUtils.lerp(carGroup.rotation.y, Math.PI - (mouseX * 0.6), 0.1);
      // Roll
      carGroup.rotation.z = THREE.MathUtils.lerp(carGroup.rotation.z, mouseX * 0.2, 0.1);
      // Position X
      carGroup.position.x = THREE.MathUtils.lerp(carGroup.position.x, mouseX * 5, 0.1);

      // 5. Camera Parallax & Shake
      const shakeX = (Math.random() - 0.5) * (speed * 0.02);
      const shakeY = (Math.random() - 0.5) * (speed * 0.02);

      // Camera follows car on X, but lags slightly
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, carGroup.position.x * 0.5 + shakeX, 0.1);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 3.5 + shakeY, 0.1);

      // Turbo FOV effect
      const targetFov = isTurbo ? 95 : 75;
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.05);
      camera.updateProjectionMatrix();

      camera.lookAt(carGroup.position.x * 0.3, 0.5, 0);

      // 6. HUD
      displaySpeed = Math.floor(THREE.MathUtils.lerp(displaySpeed, speed * 100, 0.1));
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

        if (mountRef.current && renderer.domElement) {
            mountRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
        THREE.ColorManagement.enabled = true;
    };
  }, []);

  return (
    <div className="hero-container">
      {/* Inject custom styles */}
      <style>{styles}</style>
      
      {/* 3D Canvas Mount Point */}
      <div id="canvas-wrapper" ref={mountRef}></div>
      
      {/* Overlay Elements */}
      <div className="scanlines"></div>
      
      <div className="global-hud">
        {/* NEW HEADER SECTION */}
        <div className="header-hud">
          <span className="title-part title-white">THE</span>
          <span className="title-part title-red">UNCHARTED</span>
          <span className="title-part title-white">LAP</span>
        </div>

        <div className="footer-hud">
          <div className="speed-gauge">
            <div className="speed-val" ref={speedometerRef}>000</div>
            <div className="speed-unit">KM/H</div>
          </div>
          <Link to="/sponsors" className="register-btn">Get Tickets</Link>
        </div>
      </div>
    </div>
    
  );
};

export default Hero;