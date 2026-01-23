<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TedxIITIndore</title>
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

    <style>
        :root {
            --p-brown: #562717;
            --p-red: #C21717;
            --p-orange: #E76219;
            --p-yellow: #FEA712;
            --p-cream: #FDDCA9;
        }

        body {
           
         margin: 0;
          overflow-y: auto;
          overflow-x: hidden;


            background-color: #1a1a1a; 
            /* APPLIED ORBITRON GLOBALLY HERE */
            font-family: 'Orbitron', sans-serif; 
            color: var(--p-cream);
            cursor: none; 
        }

        /* --- TELEMETRY HUD CURSOR --- */
        #cursor-dot, #cursor-ring {
            position: fixed;
            top: 0; left: 0;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 10000;
        }

        /* The center precision point */
        #cursor-dot {
            width: 8px; height: 8px;
            background-color: var(--p-orange);
            border-radius: 50%;
            box-shadow: 0 0 10px var(--p-orange);
        }

        /* The outer HUD ring */
        #cursor-ring {
            width: 40px; height: 40px;
            border: 1px solid var(--p-orange);
            border-radius: 50%;
            transition: width 0.3s, height 0.3s, border-color 0.3s;
            mix-blend-mode: exclusion;
        }

        /* Decorative "Tech" lines on the ring */
        #cursor-ring::before, #cursor-ring::after {
            content: '';
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            border: 1px dashed var(--p-cream);
            border-radius: 50%;
            opacity: 0.5;
        }

        #cursor-ring::before { width: 120%; height: 120%; border-width: 1px; animation: spin-right 10s linear infinite; }
        #cursor-ring::after { width: 60%; height: 60%; border-style: solid; border-width: 1px; border-color: transparent var(--p-orange); animation: spin-left 4s linear infinite; }

        /* HOVER STATE (Target Lock) */
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

        /* CLICK STATE (Engage) */
        body.clicking #cursor-ring {
            width: 30px; height: 30px;
            background-color: var(--p-red);
            opacity: 0.8;
        }

        @keyframes spin-right { 0% { transform: translate(-50%, -50%) rotate(0deg); } 100% { transform: translate(-50%, -50%) rotate(360deg); } }
        @keyframes spin-left { 0% { transform: translate(-50%, -50%) rotate(360deg); } 100% { transform: translate(-50%, -50%) rotate(0deg); } }


        /* Fixed Background Elements */
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
            z-index: 5;
        }

        /* --- GLOBAL HUD (Always Visible) --- */
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
            background: radial-gradient(circle, transparent 60%, rgba(86, 39, 23, 0.8) 150%);
        }

        .brand {
            font-size: 2rem; font-weight: 900; letter-spacing: 2px;
            text-transform: uppercase;
            color: var(--p-cream);
            text-shadow: 0 0 15px rgba(231, 98, 25, 0.8); 
            pointer-events: auto; 
            cursor: none;
        }
        .brand span { color: var(--p-red); }

        /* --- VERTICAL NAV BAR --- */
nav {
    position: fixed;
    z-index: 120;
    top: 50%;
    right: 2rem;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 20px;
    pointer-events: auto;
}

nav a {
    font-size: 1.1rem;
    color: var(--p-cream);
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 2px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end; /* Align icons to the right */
    transition: color 0.3s;
    cursor: none;
}

/* Icon Styling */
nav a i {
    font-size: 1.5rem;
    width: 30px;
    text-align: center;
    margin-left: 15px; /* Space between text and icon */
    transition: transform 0.3s ease;
}

/* Text Styling - Hidden by default */
.nav-text {
    opacity: 0;
    transform: translateX(10px);
    transition: opacity 0.3s ease, transform 0.3s ease;
    white-space: nowrap;
    pointer-events: none;
}

/* HOVER STATES */
nav a:hover .nav-text {
    opacity: 1;
    transform: translateX(0);
}

nav a:hover i {
    color: var(--p-yellow);
    transform: scale(1.2);
}

nav a.active i {
    color: var(--p-red);
    text-shadow: 0 0 10px var(--p-red);
}

/* The orange indicator bar */
nav a::after {
    content: '';
    position: absolute;
    top: 0;
    right: -10px; /* Positioned to the right of the icon */
    height: 100%;
    width: 0;
    background-color: var(--p-orange);
    transition: width 0.3s ease-out;
    box-shadow: 0 0 10px var(--p-orange);
    opacity: 0.6;
}

nav a:hover::after, nav a.active::after {
    width: 3px;
}

        /* --- PAGE CONTAINERS --- */
        .page-screen {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100vh;
            z-index: 50;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 2rem 5vw;
            box-sizing: border-box;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.5s ease, transform 0.5s ease;
            pointer-events: none; 
            transform: translateY(20px);
        }

        .page-screen.active-page {
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
            transform: translateY(0);
        }

        .content-page {
            background: rgba(10, 4, 2, 0.85); 
            justify-content: flex-start;
            padding-top: 150px; 
            overflow-y: auto; 
            cursor: none;
        }

        .content-page::-webkit-scrollbar { width: 8px; }
        .content-page::-webkit-scrollbar-track { background: #1a0d08; }
        .content-page::-webkit-scrollbar-thumb { background: var(--p-orange); }

        /* --- HOME HERO TYPOGRAPHY --- */
        .hero-center {
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 100%;
        }
        .hero-center h1 {
            font-size: 3.5vw; 
            line-height: 0.85;
            text-transform: uppercase; font-weight: 900;
            margin: 0;
            color: var(--p-cream);
            text-shadow: 4px 4px 0px var(--p-brown);
        }
        .hero-center h1 .outline { 
            -webkit-text-stroke: 1px var(--p-orange); 
            color: transparent; opacity: 0.8;
        }
        .hero-center h1 .filled { color: var(--p-red); }

        /* --- FOOTER ELEMENTS --- */
        .footer-hud {
            display: flex; justify-content: space-between; align-items: flex-end;
            width: 100%; pointer-events: auto;
        }

        .speed-gauge { display: flex; flex-direction: column; }
        .speed-val {
            font-size: 5rem; font-weight: 900; line-height: 1;
            color: var(--p-cream);
            text-shadow: 0 0 20px var(--p-orange);
        }
        .speed-unit { font-size: 1rem; color: var(--p-red); font-weight: 700; letter-spacing: 2px; }

        button.register-btn {
            background: var(--p-orange); 
            color: var(--p-brown); 
            border: none;
            padding: 20px 60px; 
            /* Inherits Orbitron from body */
            font-family: 'Orbitron', sans-serif;
            font-size: 1.2rem; font-weight: 900; text-transform: uppercase;
            cursor: none; /* Hide default */
            clip-path: polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px);
            transition: 0.3s;
        }
        button.register-btn:hover {
            background: var(--p-yellow); 
            box-shadow: 0 0 40px var(--p-orange);
        }

        .hint {
            position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%);
            text-align: center; 
            /* Inherits Orbitron from body */
            opacity: 0.7; letter-spacing: 2px;
            animation: pulse 2s infinite; pointer-events: none; color: var(--p-cream);
        }
        @keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }

        h2 {
            /* Inherits Orbitron from body */
            font-size: 3rem;
            color: var(--p-yellow); border-bottom: 2px solid var(--p-red);
            padding-bottom: 10px; margin-bottom: 40px; margin-top: 0;
        }
        p {
            /* Inherits Orbitron from body */
            font-size: 1.2rem;
            line-height: 1.8; color: var(--p-cream); max-width: 800px;
        }
    </style>
</head>
<body>

    <div id="cursor-dot"></div>
    <div id="cursor-ring"></div>

    <div id="canvas-wrapper"></div>
    <div class="scanlines"></div>

    <div class="global-hud">
        <header>
            <div class="brand">The Uncharted Lap</div>
            <div style="font-size: 2em;">TedxIITIndore</div>
        </header>

        <div class="footer-hud">
            <div class="speed-gauge">
                <div class="speed-val" id="speedometer">000</div>
                <div class="speed-unit">KM/H</div>
            </div>
            <div class="cta-container">
                <button class="register-btn">Get Tickets</button>
            </div>
        </div>
        <div class="hint">[ PRESS & HOLD TO ENGAGE TURBO ]</div>
    </div>

   <nav>
    <a data-target="home" class="active">
        <span class="nav-text">HOME</span>
        <i class="fa-solid fa-house"></i>
    </a>
    <a data-target="about">
        <span class="nav-text">ABOUT</span>
        <i class="fa-solid fa-circle-info"></i>
    </a>
    <a data-target="team">
        <span class="nav-text">TEAM</span>
        <i class="fa-solid fa-users-gear"></i>
    </a>
    <a data-target="speakers">
        <span class="nav-text">SPEAKERS</span>
        <i class="fa-solid fa-microphone-lines"></i>
    </a>
    <a data-target="sponsors">
        <span class="nav-text">SPONSORS</span>
        <i class="fa-solid fa-handshake"></i>
    </a>
    <a data-target="contact">
        <span class="nav-text">CONTACT</span>
        <i class="fa-solid fa-headset"></i>
    </a>
</nav>

    
    
    <section id="about" class="page-screen content-page">
        <h2>ABOUT THE EVENT</h2>
        <p>TEDxIITIndore is an independently organized event dedicated to ideas worth spreading. In line with this year's theme, "The Uncharted Lap," we explore groundbreaking concepts, radical innovations, and boundary-pushing thoughts.</p>
    </section>

    <section id="team" class="page-screen content-page">
        <h2>OUR RACE CREW</h2>
        <p>The TEDxIITIndore organizing team is comprised of dedicated students and faculty working tirelessly behind the scenes.</p>
    </section>

    <section id="speakers" class="page-screen content-page">
        <h2>THE PILOTS</h2>
        <p>Meet the extraordinary speakers who will take the stage. Each speaker represents a different vector on the uncharted map.</p>
    </section>

    <section id="sponsors" class="page-screen content-page">
        <h2>POWERING THE ENGINE</h2>
        <p>We extend our deepest gratitude to the partners who make TEDxIITIndore possible.</p>
    </section>

    <section id="contact" class="page-screen content-page">
        <h2>COMMUNICATION PORT</h2>
        <p>Ready to connect? For ticketing queries, press inquiries, or sponsorship opportunities, please use the contact form.</p>
        
        </p>
    </section>


    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script>
        // --- CUSTOM TECH CURSOR LOGIC ---
        const cursorDot = document.getElementById('cursor-dot');
        const cursorRing = document.getElementById('cursor-ring');
        const bodyEl = document.body;

        // Track mouse position
        let mX = 0; // Renamed to avoid conflict with ThreeJS 'mouseX'
        let mY = 0;
        
        // Track ring position (for smooth lag)
        let ringX = 0;
        let ringY = 0;

        document.addEventListener('mousemove', (e) => {
            mX = e.clientX;
            mY = e.clientY;
            
            // Dot moves instantly
            cursorDot.style.left = mX + 'px';
            cursorDot.style.top = mY + 'px';
        });

        document.addEventListener('mousedown', () => bodyEl.classList.add('clicking'));
        document.addEventListener('mouseup', () => bodyEl.classList.remove('clicking'));

        // Hover effects for interactive elements
        const interactiveEls = document.querySelectorAll('a, button, .brand');
        interactiveEls.forEach(el => {
            el.addEventListener('mouseenter', () => bodyEl.classList.add('hovering'));
            el.addEventListener('mouseleave', () => bodyEl.classList.remove('hovering'));
        });

        // Animation Loop for Smooth Ring Movement
        function animateCursor() {
            // LERP: Move ring towards mouse position gradually
            ringX += (mX - ringX) * 0.15;
            ringY += (mY - ringY) * 0.15;

            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';

            requestAnimationFrame(animateCursor);
        }
        animateCursor();


        // --- PAGE SWITCHING LOGIC ---
        const navLinks = document.querySelectorAll('nav a');
        const pages = document.querySelectorAll('.page-screen');

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                const targetId = link.getAttribute('data-target');
                pages.forEach(page => page.classList.remove('active-page'));
                const targetPage = document.getElementById(targetId);
                if(targetPage) targetPage.classList.add('active-page');
            });
        });


        // --- THREE.JS SCRIPT ---
        
        const PALETTE = {
            brown: 0x562717, red: 0xC21717, orange: 0xE76219, yellow: 0xFEA712, cream: 0xFDDCA9, darkBrown: 0x1a0d08 
        };
        const container = document.getElementById('canvas-wrapper');
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x1a1a1a, 0.025);
        const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        container.appendChild(renderer.domElement);

        // Replace your light section with this:
scene.add(new THREE.AmbientLight(PALETTE.cream, 0.5)); // Brighter base light

const topLight = new THREE.SpotLight(0xffffff, 2);
topLight.position.set(0, 20, 10);
topLight.angle = Math.PI / 4;
topLight.penumbra = 0.5;
scene.add(topLight);

// Add a "Rim Light" from behind to catch the edges of the car
const backLight = new THREE.PointLight(PALETTE.orange, 5, 20);
backLight.position.set(0, 5, -5);
scene.add(backLight);

       // --- VIBRANT HIGH-GLOSS F1 CAR BUILDER ---
        const carGroup = new THREE.Group();
        
        // 1. BRIGHTER MATERIAL DEFINITIONS
        const bodyMat = new THREE.MeshStandardMaterial({ 
            color: 0xFF0000,          // Pure Racing Red
            emissive: 0x330000,      // Subtle self-glow for vibrance
            metalness: 0.9, 
            roughness: 0.05          // Extremely glossy
        });

        const accentMat = new THREE.MeshStandardMaterial({ 
            color: 0xFFFFFF,          // Pure White for high contrast
            emissive: 0x222222,
            metalness: 0.5, 
            roughness: 0.1 
        });

        const carbonMat = new THREE.MeshStandardMaterial({ 
            color: 0x1a1a1a,          // Deeper Black
            metalness: 0.8, 
            roughness: 0.2, 
            emissive: 0x050000
        });

        const glowYellow = new THREE.MeshStandardMaterial({ 
            color: 0xFFFF00, 
            emissive: 0xFFFF00,      // Makes the rims actually glow
            emissiveIntensity: 1.5 
        });

        // 2. CHASSIS & NOSE
        const chassisGeo = new THREE.CylinderGeometry(0.3, 0.5, 3.5, 4);
        chassisGeo.rotateX(Math.PI/2);
        const chassis = new THREE.Mesh(chassisGeo, bodyMat);
        chassis.position.set(0, 0.45, 0.5);
        
        const noseGeo = new THREE.CylinderGeometry(0.05, 0.3, 1.4, 4);
        noseGeo.rotateX(Math.PI/2);
        const nose = new THREE.Mesh(noseGeo, accentMat); // Bright white nose
        nose.position.set(0, 0.35, 2.7);
        carGroup.add(chassis, nose);

        // 3. AERODYNAMICS
        const floor = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.05, 4.5), carbonMat);
        floor.position.y = 0.15;
        
        const sidePodGeo = new THREE.BoxGeometry(0.65, 0.45, 2.0);
        const sidePodL = new THREE.Mesh(sidePodGeo, bodyMat);
        sidePodL.position.set(0.7, 0.35, 0.2);
        sidePodL.rotation.y = 0.15;
        const sidePodR = sidePodL.clone();
        sidePodR.position.x = -0.7;
        sidePodR.rotation.y = -0.15;
        carGroup.add(floor, sidePodL, sidePodR);

        // 4. BRIGHT WINGS
        const fWingMain = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.05, 0.8), carbonMat);
        fWingMain.position.set(0, 0.2, 2.8);
        const fEndplateL = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.35, 0.8), bodyMat);
        fEndplateL.position.set(1.4, 0.3, 2.8);
        const fEndplateR = fEndplateL.clone();
        fEndplateR.position.x = -1.4;
        carGroup.add(fWingMain, fEndplateL, fEndplateR);

        const rWingLower = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.05, 0.6), carbonMat);
        rWingLower.position.set(0, 0.9, -2.1);
        const rWingUpper = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.15, 0.5), bodyMat);
        rWingUpper.position.set(0, 1.15, -2.2);
        const rEndplateL = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.9, 1.0), carbonMat);
        rEndplateL.position.set(1.2, 0.8, -2.1);
        const rEndplateR = rEndplateL.clone();
        rEndplateR.position.x = -1.2;
        carGroup.add(rWingLower, rWingUpper, rEndplateL, rEndplateR);

        // 5. COCKPIT & RADIANT HELMET
        const cockpit = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.3, 1.0), carbonMat);
        cockpit.position.set(0, 0.65, -0.2);
        const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), new THREE.MeshStandardMaterial({
            color: 0xFFFF00, 
            emissive: 0x555500,
            metalness: 1, 
            roughness: 0
        }));
        helmet.position.set(0, 0.85, -0.2);
        carGroup.add(cockpit, helmet);

        // 6. GLOWING WHEELS
        const wheelGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.65, 32);
        wheelGeo.rotateZ(Math.PI/2);
        const wheelMat = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.4 });
        
        function makeF1Wheel(x, z, isRear = false) {
            const wGroup = new THREE.Group();
            const w = new THREE.Mesh(wheelGeo, wheelMat);
            if(isRear) w.scale.set(1.1, 1.3, 1.3);
            wGroup.add(w);
            
            const rim = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.03, 12, 32), glowYellow);
            rim.rotation.y = Math.PI/2;
            rim.position.x = x > 0 ? 0.33 : -0.33;
            wGroup.add(rim);
            
            wGroup.position.set(x, 0.48, z);
            return wGroup;
        }

        carGroup.add(makeF1Wheel(1.4, 1.9));      
        carGroup.add(makeF1Wheel(-1.4, 1.9));     
        carGroup.add(makeF1Wheel(1.4, -1.7, true)); 
        carGroup.add(makeF1Wheel(-1.4, -1.7, true));

        scene.add(carGroup);

        // --- ENVIRONMENT ---
        const gridSize = 400; const gridDivs = 80; 
        const gridHelper = new THREE.GridHelper(gridSize, gridDivs, 0xE76219, 0x444444);
        gridHelper.position.y = -0.1;
        scene.add(gridHelper);

        const roadGroup = new THREE.Group();
        const dashCount = 20;
        const dashGeo = new THREE.PlaneGeometry(0.3, 4);
        const dashMat = new THREE.MeshBasicMaterial({ color: PALETTE.yellow });
        for(let i=0; i<dashCount; i++) {
            const dash = new THREE.Mesh(dashGeo, dashMat);
            dash.rotation.x = -Math.PI / 2;
            dash.position.y = -0.05;
            dash.position.z = -500 + (i * 10);
            roadGroup.add(dash);
        }
        scene.add(roadGroup);

        const tunnelGroup = new THREE.Group();
        const tunnelColors = [PALETTE.red, PALETTE.orange, PALETTE.yellow, PALETTE.cream];
        for(let i=0; i<60; i++) {
            const col = tunnelColors[Math.floor(Math.random() * tunnelColors.length)];
            const tMat = new THREE.MeshBasicMaterial({ color: col });
            const tGeo = new THREE.BoxGeometry(0.05, 0.05, 10 + Math.random()*10);
            const tLine = new THREE.Mesh(tGeo, tMat);
            const ang = Math.random() * Math.PI * 2;
            const rad = 8 + Math.random() * 6;
            tLine.position.set(Math.cos(ang)*rad, Math.sin(ang)*rad, Math.random() * -100);
            tunnelGroup.add(tLine);
        }
        scene.add(tunnelGroup);


        // --- ANIMATION STATE ---
        let speed = 0; let isTurbo = false; let mouseX = 0;
        document.addEventListener('mousemove', e => {
            mouseX = (e.clientX/window.innerWidth)*2-1;
        });
        document.addEventListener('mousedown', () => isTurbo=true);
        document.addEventListener('mouseup', () => isTurbo=false);

        const speedometer = document.getElementById('speedometer');
        let displaySpeed = 0;

        function animate() {
           requestAnimationFrame(animate);

    // 1. UPDATED SPEEDS (Kept at 120 / 300 KM/H)
    const targetSpeed = isTurbo ? 2.0 : 0.8; 

    speed = THREE.MathUtils.lerp(speed, targetSpeed, 0.05);
    const gridCellSize = gridSize / gridDivs; 

    // 2. REDUCED ENVIRONMENT MULTIPLIERS (Now Half Speed)
    gridHelper.position.z += speed * 0.35; // Reduced from 0.7
    if (gridHelper.position.z > gridCellSize) {
        gridHelper.position.z = 0;
    }

    roadGroup.children.forEach(dash => {
        dash.position.z += speed * 0.35; // Reduced from 0.7
        if(dash.position.z > 20) { dash.position.z = -180; }
    });

    tunnelGroup.children.forEach(p => {
        p.position.z += speed * 0.75; // Reduced from 1.5
        if(p.position.z > 20) p.position.z = -100;
    });

            
            carGroup.rotation.y = THREE.MathUtils.lerp(carGroup.rotation.y, Math.PI -mouseX * 0.5, 0.1);
            carGroup.rotation.z = THREE.MathUtils.lerp(carGroup.rotation.z, mouseX * 0.1, 0.1); 
            carGroup.position.x = THREE.MathUtils.lerp(carGroup.position.x, mouseX * 5, 0.05);
            
            camera.position.x = THREE.MathUtils.lerp(camera.position.x, carGroup.position.x * 0.6, 0.1);
            
            if(isTurbo) {
                camera.fov = THREE.MathUtils.lerp(camera.fov, 100, 0.05);
                camera.position.y = 3 + (Math.random()-0.5)*0.1;
            } else {
                camera.fov = THREE.MathUtils.lerp(camera.fov, 70, 0.05);
                camera.position.y = THREE.MathUtils.lerp(camera.position.y, 3.5, 0.1); 
            }
            camera.updateProjectionMatrix();

            displaySpeed = Math.floor(THREE.MathUtils.lerp(displaySpeed, speed * 150, 0.1));
            speedometer.innerText = displaySpeed.toString().padStart(3,'0');

            renderer.render(scene, camera);
        }

        camera.position.set(0, 3.5, 10);
        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth/window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        
    </script>
</body>
</html>
