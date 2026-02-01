import React, { useEffect, useMemo, useRef, useCallback } from 'react';
import { useGesture } from '@use-gesture/react';
import { Link } from 'react-router-dom';

/** * ==========================================
 * 1. INTERNAL CSS
 * ==========================================
 */
const Styles = ({ navPadding }) => (
  <style>{`
    .sphere-root {
      position: relative;
      width: 100%;
      height: calc(100% - ${navPadding}); /* Adjust for navbar */
      margin-top: ${navPadding};
      --radius: 520px;
      --viewer-pad: 72px;
      --circ: calc(var(--radius) * 3.14);
      --rot-y: calc((360deg / var(--segments-x)) / 2);
      --rot-x: calc((360deg / var(--segments-y)) / 2);
      --item-width: calc(var(--circ) / var(--segments-x));
      --item-height: calc(var(--circ) / var(--segments-y));
    }

    .sphere-root * { box-sizing: border-box; }

    .sphere, .item, .item__image { transform-style: preserve-3d; }

    main.sphere-main {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      overflow: hidden;
      touch-action: none;
      user-select: none;
      -webkit-user-select: none;
      background: transparent;
      cursor: grab; /* Indicates it can be rotated */
    }
    
    main.sphere-main:active {
      cursor: grabbing;
    }

    .stage {
      width: 100%;
      height: 100%;
      display: grid;
      place-items: center;
      perspective: calc(var(--radius) * 2);
      perspective-origin: 50% 50%;
      contain: layout paint size;
    }

    @keyframes sphere-auto-rotate {
      from { transform: translateZ(calc(var(--radius) * -1)) rotateY(0deg); }
      to { transform: translateZ(calc(var(--radius) * -1)) rotateY(360deg); }
    }

    .sphere {
      transform: translateZ(calc(var(--radius) * -1));
      will-change: transform;
      /* Animation is still there, but drag will override/offset it if logic is applied */
      animation: sphere-auto-rotate 100s linear infinite;
    }

    .sphere-root[data-enlarging='true'] .sphere {
      animation-play-state: paused;
    }

    .overlay, .overlay--blur {
      position: absolute;
      inset: 0;
      margin: auto;
      z-index: 3;
      pointer-events: none;
    }

    .overlay {
      background-image: radial-gradient(
        rgba(235, 235, 235, 0) 65%,
        var(--overlay-blur-color, #060010) 100%
      );
    }

    .overlay--blur {
      mask-image: radial-gradient(rgba(235, 235, 235, 0) 70%, var(--overlay-blur-color, #060010) 90%);
      -webkit-mask-image: radial-gradient(rgba(235, 235, 235, 0) 70%, var(--overlay-blur-color, #060010) 90%);
      backdrop-filter: blur(3px);
    }

    .item {
      width: calc(var(--item-width) * var(--item-size-x));
      height: calc(var(--item-height) * var(--item-size-y));
      position: absolute;
      inset: -999px;
      margin: auto;
      transform-origin: 50% 50%;
      backface-visibility: hidden;
      transition: transform 300ms;
      transform:
        rotateY(calc(var(--rot-y) * (var(--offset-x) + ((var(--item-size-x) - 1) / 2)) + var(--rot-y-delta, 0deg)))
        rotateX(calc(var(--rot-x) * (var(--offset-y) - ((var(--item-size-y) - 1) / 2)) + var(--rot-x-delta, 0deg)))
        translateZ(var(--radius));
    }

    .item__image {
      position: absolute;
      display: block;
      inset: 10px;
      border-radius: var(--tile-radius, 12px);
      background: transparent;
      overflow: hidden;
      backface-visibility: hidden;
      transition: transform 300ms;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      touch-action: manipulation;
      pointer-events: auto;
      transform: translateZ(0);
    }

    .item__image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      pointer-events: none;
      filter: var(--image-filter, none);
    }

    .viewer {
      position: absolute;
      inset: 0;
      z-index: 20;
      pointer-events: none;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--viewer-pad);
    }

    .viewer .frame {
      height: 100%;
      aspect-ratio: 1;
      border-radius: var(--enlarge-radius, 32px);
      display: flex;
    }

    .viewer .scrim {
      position: absolute;
      inset: 0;
      z-index: 10;
      background: rgba(0, 0, 0, 0.6);
      pointer-events: none;
      opacity: 0;
      transition: opacity 500ms ease;
      backdrop-filter: blur(8px);
    }

    .sphere-root[data-enlarging='true'] .viewer .scrim {
      opacity: 1;
      pointer-events: all;
    }

    .viewer .enlarge {
      position: absolute;
      z-index: 30;
      border-radius: var(--enlarge-radius, 32px);
      overflow: hidden;
      transition: transform 500ms ease, opacity 500ms ease;
      transform-origin: top left;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }

    .viewer .enlarge img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .edge-fade {
      position: absolute;
      left: 0;
      right: 0;
      height: 120px;
      z-index: 5;
      pointer-events: none;
      background: linear-gradient(to bottom, transparent, var(--overlay-blur-color, #060010));
    }

    .edge-fade--top { top: 0; transform: rotate(180deg); }
    .edge-fade--bottom { bottom: 0; }

    .right-navbar {
      position: fixed;
      right: 2rem;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      z-index: 100;
    }

    .right-navbar a {
      color: white;
      text-decoration: none;
      font-family: 'Inter', sans-serif;
      font-size: 0.9rem;
      font-weight: 500;
      opacity: 0.6;
      transition: all 0.3s ease;
      text-align: right;
    }

    .right-navbar a:hover { opacity: 1; transform: translateX(-5px); }

    .dg-scroll-lock { overflow: hidden; }
  `}</style>
);

/** * ==========================================
 * 2. UTILS
 * ==========================================
 */
const DEFAULT_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1755331039789-7e5680e26e8f?q=80&w=774&auto=format&fit=crop', alt: '1' },
  { src: 'https://images.unsplash.com/photo-1755569309049-98410b94f66d?q=80&w=772&auto=format&fit=crop', alt: '2' },
  { src: 'https://images.unsplash.com/photo-1755497595318-7e5e3523854f?q=80&w=774&auto=format&fit=crop', alt: '3' },
  { src: 'https://images.unsplash.com/photo-1755353985163-c2a0fe5ac3d8?q=80&w=774&auto=format&fit=crop', alt: '4' },
  { src: 'https://images.unsplash.com/photo-1745965976680-d00be7dc0377?q=80&w=774&auto=format&fit=crop', alt: '5' },
  { src: 'https://images.unsplash.com/photo-1752588975228-21f44630bb3c?q=80&w=774&auto=format&fit=crop', alt: '6' }
];

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const wrapAngle = deg => ((deg % 360) + 360) % 360;

function buildItems(pool, seg) {
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
  const evenYs = [-4, -2, 0, 2, 4];
  const oddYs = [-3, -1, 1, 3, 5];
  const coords = xCols.flatMap((x, c) => (c % 2 === 0 ? evenYs : oddYs).map(y => ({ x, y, sizeX: 2, sizeY: 2 })));
  return coords.map((c, i) => ({ ...c, ...pool[i % pool.length] }));
}

/** * ==========================================
 * 3. DOME GALLERY COMPONENT
 * ==========================================
 */
const DomeGallery = ({
  images = DEFAULT_IMAGES,
  fit = 1,
  minRadius = 1000,
  maxVerticalRotationDeg = 3,
  dragSensitivity = 15, // Lower is faster
  segments = 35,
  overlayBlurColor = '#060010',
  grayscale = false
}) => {
  const rootRef = useRef(null);
  const mainRef = useRef(null);
  const sphereRef = useRef(null);
  const viewerRef = useRef(null);
  const frameRef = useRef(null);
  
  const rotation = useRef({ x: 0, y: 0 });
  const items = useMemo(() => buildItems(images, segments), [images, segments]);

  const applyTransform = useCallback(() => {
    if (sphereRef.current) {
      sphereRef.current.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${rotation.current.x}deg) rotateY(${rotation.current.y}deg)`;
    }
  }, []);

  // UseGesture handles both Mouse and Touch
  useGesture({
    onDrag: ({ offset: [x, y], memo = rotation.current }) => {
      // Logic to rotate based on cursor/finger movement
      rotation.current.y = wrapAngle(x / dragSensitivity);
      rotation.current.x = clamp(-y / dragSensitivity, -maxVerticalRotationDeg, maxVerticalRotationDeg);
      
      applyTransform();
    }
  }, { 
    target: mainRef,
    drag: {
      from: () => [rotation.current.y * dragSensitivity, -rotation.current.x * dragSensitivity],
    }
  });

  useEffect(() => {
    const root = rootRef.current;
    const ro = new ResizeObserver(entries => {
      const { width: w, height: h } = entries[0].contentRect;
      const basis = Math.min(w, h);
      root.style.setProperty('--radius', `${Math.round(basis * fit || minRadius)}px`);
      applyTransform();
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [fit, minRadius, applyTransform]);

  const openItem = (el) => {
    const frameR = frameRef.current.getBoundingClientRect();
    const mainR = mainRef.current.getBoundingClientRect();
    const overlay = document.createElement('div');
    overlay.className = 'enlarge';
    overlay.style.cssText = `left:${frameR.left - mainR.left}px; top:${frameR.top - mainR.top}px; width:${frameR.width}px; height:${frameR.height}px; opacity:0;`;
    const img = document.createElement('img');
    img.src = el.querySelector('img').src;
    overlay.appendChild(img);
    viewerRef.current.appendChild(overlay);
    setTimeout(() => {
      overlay.style.opacity = '1';
      rootRef.current.setAttribute('data-enlarging', 'true');
    }, 10);
  };

  const closeItem = () => {
    const overlay = viewerRef.current.querySelector('.enlarge');
    if (overlay) overlay.remove();
    rootRef.current.removeAttribute('data-enlarging');
  };

  return (
    <div ref={rootRef} className="sphere-root" style={{ '--segments-x': segments, '--segments-y': segments, '--overlay-blur-color': overlayBlurColor, '--image-filter': grayscale ? 'grayscale(1)' : 'none' }}>
      <main ref={mainRef} className="sphere-main">
        <div className="stage">
          <div ref={sphereRef} className="sphere">
            {items.map((it, i) => (
              <div key={i} className="item" style={{ '--offset-x': it.x, '--offset-y': it.y, '--item-size-x': it.sizeX, '--item-size-y': it.sizeY }}>
                <div className="item__image" onClick={(e) => openItem(e.currentTarget)}>
                  <img src={it.src} alt={it.alt} draggable={false} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="overlay" /><div className="overlay--blur" />
        <div className="edge-fade edge-fade--top" /><div className="edge-fade edge-fade--bottom" />
        <div className="viewer" ref={viewerRef}>
          <div className="scrim" onClick={closeItem} />
          <div ref={frameRef} className="frame" />
        </div>
      </main>
    </div>
  );
};

/** * ==========================================
 * 4. MAIN EXPORT
 * ==========================================
 */
const Gallery = () => {
  // Set this value to the height of your actual navbar (e.g., '80px')
  const NAVBAR_HEIGHT = '70px';

  return (
    <>
      <Styles navPadding={NAVBAR_HEIGHT} />
      
      {/* Container background matches the sphere overlay color */}
      <div style={{ width: '100vw', height: '100vh', backgroundColor: '#060010', overflow: 'hidden' }}>
        <DomeGallery
          fit={1.6}
          minRadius={1100}
          maxVerticalRotationDeg={5}
          grayscale={false}
        />
      </div>
    </>
  );
};

export default Gallery;