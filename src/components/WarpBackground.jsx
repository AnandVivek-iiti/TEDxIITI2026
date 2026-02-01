import React, { useEffect, useRef } from 'react';

export default function WarpBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const particles = [];

    // Create speed lines
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 8 + 4,
        length: Math.random() * 100 + 50,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }

    const animate = () => {
      // Clear with fade effect
      ctx.fillStyle = 'rgba(5, 5, 5, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw speed lines
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(220, 40, 40, ${p.opacity})`;
        ctx.lineWidth = 1;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.length, p.y);
        ctx.stroke();

        // Update position
        p.x += p.speed;

        // Reset when off screen
        if (p.x > canvas.width + p.length) {
          p.x = -p.length;
          p.y = Math.random() * canvas.height;
        }
      });

      // Subtle glow
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.7,
        canvas.height * 0.4,
        0,
        canvas.width * 0.7,
        canvas.height * 0.4,
        400
      );
      gradient.addColorStop(0, 'rgba(220, 40, 40, 0.08)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
     <div className="fixed inset-0 -z-10 overflow-hidden">
    <canvas
      ref={canvasRef}
      // Changed 'absolute' to 'fixed' so it stays on screen while scrolling
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        background:
          'linear-gradient(135deg, hsl(0 0% 3%) 0%, hsl(0 0% 2%) 100%)',
      }}
    />
    </div>
  );
}