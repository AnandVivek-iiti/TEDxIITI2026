import React, { useEffect, useRef } from 'react';

const TedxAboutPage = () => {
  const telemetryRef = useRef(null);

  useEffect(() => {
    const animateCounters = () => {
      const counters = document.querySelectorAll('.stat-number');
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 1500; // 1.5 seconds
        const start = performance.now();

        const update = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 3); 
          counter.textContent = Math.floor(easedProgress * target);
          
          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            counter.textContent = target + "+";
          }
        };
        requestAnimationFrame(update);
      });
    };
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { 
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px" 
    });

    const cards = document.querySelectorAll('.f1-card');
    cards.forEach(card => cardObserver.observe(card));
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          statObserver.disconnect(); 
        }
      });
    }, { threshold: 0.5 });

    if (telemetryRef.current) {
      statObserver.observe(telemetryRef.current);
    }
    return () => {
      cardObserver.disconnect();
      statObserver.disconnect();
    };
  }, []);

  return (
    <div className="tedx-container">
      <style>{`
        
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;600&display=swap');

        :root {
    --f1-red: #e10600;
    --f1-blue: #00c2ff;
    --f1-yellow: #ffb000;
    --bg-dark: #0b0b0b;
    --text-muted: #bcbcbc;
}
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font: 'Orbitron'
}

body {
    font-family: 'Orbitron', sans-serif;
    background:
        radial-gradient(circle at 80% 10%, rgba(0,194,255,0.15), transparent 40%),
        linear-gradient(180deg, #0a0a0a, #0b0b0b);
    color: #fff;
}
.header {
    padding: 120px 8% 90px;
    background:
        linear-gradient(90deg, rgba(225,6,0,0.25), transparent 45%),
        repeating-linear-gradient(
            90deg,
            rgba(255,255,255,0.04),
            rgba(255,255,255,0.04) 1px,
            transparent 1px,
            transparent 60px
        );
    position: relative;
}

.about-content h1 {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(3rem, 7vw, 5rem);
    font-weight: 900;
    letter-spacing: 6px;
}

.about-content h1 span {
    color: var(--f1-red);
}

.about-content p {
    margin-top: 28px;
    max-width: 650px;
    line-height: 1.8;
    color: var(--text-muted);
}
.header::after {
    content: '';
    position: absolute;
    bottom: 40px;
    left: 8%;
    width: 140px;
    height: 4px;
    background: linear-gradient(90deg, var(--f1-red), var(--f1-blue));
}
.telemetry {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 40px;
    padding: 80px 8%;
}

.stat {
    text-align: center;
    padding: 35px;
    background: linear-gradient(180deg, #1a1a1a, #121212);
    border-top: 4px solid transparent;
}

.stat:nth-child(1) { border-color: var(--f1-red); }
.stat:nth-child(2) { border-color: var(--f1-blue); }
.stat:nth-child(3) { border-color: var(--f1-yellow); }

.stat-number {
    font-family: 'Orbitron', sans-serif;
    font-size: 4rem;
    font-weight: 900;
}

.stat-label {
    margin-top: 10px;
    font-family: 'Orbitron', sans-serif;
    letter-spacing: 4px;
    font-size: 0.75rem;
    color: var(--text-muted);
}

.about-grid {
    padding: 100px 8%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 40px;
}
.f1-card {
    position: relative;
    padding: 50px;
    background: linear-gradient(145deg, #1d1d1d, #141414);
    overflow: hidden;
    transform: translateX(-60px);
    opacity: 0;
    transition: transform 0.8s cubic-bezier(.25,.8,.25,1), opacity 0.8s;
}
.f1-card::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 6px;
    height: 100%;
    background: var(--f1-red);
}
.f1-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(225,6,0,0.25),
        transparent
    );
    opacity: 0;
    transition: 0.3s;
}

.f1-card:hover::before {
    opacity: 1;
}

.f1-card.visible {
    transform: translateX(0);
    opacity: 1;
}

.card-tag {
    font-family: 'Orbitron', sans-serif;
    font-size: 0.8rem;
    letter-spacing: 2px;
    color: var(--f1-yellow);
}

.f1-card h3 {
    margin: 20px 0 15px;
    font-family: 'Orbitron', sans-serif;
    text-transform: uppercase;
}

.f1-card p {
    color: var(--text-muted);
    line-height: 1.7;
p{
font:'Orbitron', Sans Serif;
}

      `}</style>

      <header className="header">
        <div className="about-content">
          <h1>ABOUT US</h1>
          <p>
            TEDxIITIndore is driven by ideas engineered for impact. 
            Inspired by Formula 1, we value precision, courage, 
            and relentless excellence.
          </p>
        </div>
      </header>

      <section className="telemetry" ref={telemetryRef}>
        <div className="stat">
          <span className="stat-number" data-target="12">0</span>
          <span className="stat-label">SPEAKERS</span>
        </div>
        <div className="stat">
          <span className="stat-number" data-target="800">0</span>
          <span className="stat-label">ATTENDEES</span>
        </div>
        <div className="stat">
          <span className="stat-number" data-target="15">0</span>
          <span className="stat-label">PARTNERS</span>
        </div>
      </section>

      <section className="about-grid">
        <article className="f1-card">
          <span className="card-tag">01 · ENGINE</span>
          <h3>Power of Ideas</h3>
          <p>
            Every great movement begins with ignition. 
            Our ideas are tuned for performance and purpose.
          </p>
        </article>

        <article className="f1-card">
          <span className="card-tag">02 · CIRCUIT</span>
          <h3>Navigating Complexity</h3>
          <p>
            The world is a high-speed circuit of uncertainty. 
            We decode its corners with clarity.
          </p>
        </article>
      </section>
    </div>
  );
};

export default TedxAboutPage;
