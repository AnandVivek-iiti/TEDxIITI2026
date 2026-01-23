import { useEffect } from "react";
import * as THREE from "three";

export default function TedxIITIndore() {

  useEffect(() => {
    /* ---------------- CURSOR LOGIC ---------------- */
    const cursorDot = document.getElementById("cursor-dot");
    const cursorRing = document.getElementById("cursor-ring");
    const bodyEl = document.body;

    let mX = 0, mY = 0, ringX = 0, ringY = 0;

    const moveMouse = (e) => {
      mX = e.clientX;
      mY = e.clientY;
      cursorDot.style.left = `${mX}px`;
      cursorDot.style.top = `${mY}px`;
    };

    const animateCursor = () => {
      ringX += (mX - ringX) * 0.15;
      ringY += (mY - ringY) * 0.15;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      requestAnimationFrame(animateCursor);
    };

    document.addEventListener("mousemove", moveMouse);
    document.addEventListener("mousedown", () => bodyEl.classList.add("clicking"));
    document.addEventListener("mouseup", () => bodyEl.classList.remove("clicking"));

    document.querySelectorAll("a, button, .brand").forEach(el => {
      el.addEventListener("mouseenter", () => bodyEl.classList.add("hovering"));
      el.addEventListener("mouseleave", () => bodyEl.classList.remove("hovering"));
    });

    animateCursor();

    /* ---------------- PAGE NAV ---------------- */
    const navLinks = document.querySelectorAll("nav a");
    const pages = document.querySelectorAll(".page-screen");

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
        pages.forEach(p => p.classList.remove("active-page"));
        document.getElementById(link.dataset.target)?.classList.add("active-page");
      });
    });

    /* ---------------- THREE.JS ---------------- */
    const container = document.getElementById("canvas-wrapper");
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x2b130b, 0.025);

    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xfddca9, 0.3));
    const dirLight = new THREE.DirectionalLight(0xe76219, 2);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);

    const carGroup = new THREE.Group();
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xff0000, metalness: 0.9, roughness: 0.05 });
    const chassis = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.5, 3.5, 4).rotateX(Math.PI / 2), bodyMat);
    chassis.position.set(0, 0.45, 0.5);
    carGroup.add(chassis);
    scene.add(carGroup);

    camera.position.set(0, 3.5, 10);

    let speed = 0, isTurbo = false, mouseX = 0;
    const speedometer = document.getElementById("speedometer");

    document.addEventListener("mousemove", e => mouseX = (e.clientX / window.innerWidth) * 2 - 1);
    document.addEventListener("mousedown", () => isTurbo = true);
    document.addEventListener("mouseup", () => isTurbo = false);

    const animate = () => {
      requestAnimationFrame(animate);
      speed = THREE.MathUtils.lerp(speed, isTurbo ? 2 : 0.8, 0.05);
      carGroup.rotation.y = THREE.MathUtils.lerp(carGroup.rotation.y, -mouseX * 0.5, 0.1);
      speedometer.innerText = Math.floor(speed * 150).toString().padStart(3, "0");
      renderer.render(scene, camera);
    };

    animate();

    const resize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", resize);

    return () => {
      document.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      container.innerHTML = "";
    };
  }, []);

  return (
    <>
      <div id="cursor-dot"></div>
      <div id="cursor-ring"></div>
      <div id="canvas-wrapper"></div>
      <div className="scanlines"></div>

      <div className="global-hud">
        <header>
          <div className="brand">The Uncharted Lap</div>
          <div style={{ fontSize: "2em" }}>TedxIITIndore</div>
        </header>

        <div className="footer-hud">
          <div className="speed-gauge">
            <div className="speed-val" id="speedometer">000</div>
            <div className="speed-unit">KM/H</div>
          </div>
          <button className="register-btn">Get Tickets</button>
        </div>
        <div className="hint">[ PRESS & HOLD TO ENGAGE TURBO ]</div>
      </div>

      <nav>
        {["home","about","team","speakers","sponsors","contact"].map((p,i)=>(
          <a key={p} data-target={p} className={i===0?"active":""}>
            <span className="nav-text">{p.toUpperCase()}</span>
            <i className="fa-solid fa-circle"></i>
          </a>
        ))}
      </nav>

      <section id="about" className="page-screen content-page active-page">
        <h2>ABOUT THE EVENT</h2>
        <p>TEDxIITIndore explores ideas worth spreading.</p>
      </section>
    </>
  );
}
