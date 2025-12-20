"use client";
import React, { useEffect, useRef } from 'react';

export default function WarpBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let w, h;

    // Configuration
    const starCount = 400;
    const speed = 15;
    const stars = [];

    const initStars = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      
      stars.length = 0;
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * w - w / 2,
          y: Math.random() * h - h / 2,
          z: Math.random() * w,
          px: 0,
          py: 0
        });
      }
    };

    const draw = () => {
      // Create a slight trail effect by not fully clearing the canvas
      ctx.fillStyle = 'rgba(5, 5, 5, 0.2)'; 
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      stars.forEach(s => {
        s.z -= speed;

        // Reset star if it passes the screen
        if (s.z <= 0) {
          s.z = w;
          s.x = Math.random() * w - w / 2;
          s.y = Math.random() * h - h / 2;
        }

        // Project 3D coordinates to 2D
        const x = (s.x / s.z) * w + cx;
        const y = (s.y / s.z) * w + cy;

        if (s.px !== 0) {
          const opacity = Math.min(1, (1 - s.z / w) * 1.5);
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.lineWidth = (1 - s.z / w) * 3;
          ctx.lineCap = 'round';
          
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(s.px, s.py); // Draw line from previous position to current
          ctx.stroke();
        }

        s.px = x;
        s.py = y;
      });

      animationId = requestAnimationFrame(draw);
    };

    initStars();
    draw();

    window.addEventListener('resize', initStars);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', initStars);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none opacity-60"
      style={{ filter: 'contrast(1.2) brightness(0.8)' }}
    />
  );
}