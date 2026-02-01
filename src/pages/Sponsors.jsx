import React, { useEffect, useRef, useState } from 'react';

// --- DATA CONFIGURATION ---
const sponsorsData = [
  {
    id: 'tier-1',
    title: 'TITLE PARTNER',
    theme: 'red',
    size: 'large',
    sponsors: [
      { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png' }
    ]
  },
  {
    id: 'tier-2',
    title: 'ASSOCIATE PARTNERS',
    theme: 'blue',
    size: 'medium',
    sponsors: [
      { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
      { name: 'Samsung', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/2560px-Samsung_Logo.svg.png' },
      { name: 'Netflix', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png' }
    ]
  },
  {
    id: 'tier-3',
    title: 'SUPPORT PARTNERS',
    theme: 'yellow',
    size: 'small',
    sponsors: [
      { name: 'Spotify', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png' },
      { name: 'Sony', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Sony_logo.svg/2560px-Sony_logo.svg.png' },
      { name: 'BMW', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/2048px-BMW.svg.png' },
      { name: 'Meta', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png' }
    ]
  }
];

// --- CUSTOM HOOK ---
const useOnScreen = (options) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, options]);

  return [ref, isVisible];
};

// --- SUB-COMPONENTS ---
const SponsorCard = ({ logo, name, theme, index }) => {
  const styleDelay = { transitionDelay: `${index * 100}ms` };
  return (
    <div className="sponsor-card" style={styleDelay}>
      <div className={`card-glow glow-${theme}`} />
      <img src={logo} alt={`${name} logo`} loading="lazy" />
    </div>
  );
};

const TierSection = ({ tier }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.15 });

  return (
    <section 
      ref={ref} 
      className={`sponsor-tier tier-${tier.theme} ${isVisible ? 'animate-in' : ''}`}
    >
      <div className="tier-header">
        <h2 className="tier-title">{tier.title}</h2>
        <div className="tier-line" />
      </div>
      <div className={`sponsor-grid ${tier.size}`}>
        {tier.sponsors.map((sponsor, index) => (
          <SponsorCard key={index} index={index} {...sponsor} theme={tier.theme} />
        ))}
      </div>
    </section>
  );
};

const Hero = () => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  return (
    <header ref={ref} className={`sponsors-header ${isVisible ? 'visible' : ''}`}>
      <div className="header-content">
        <h1><span>OUR</span> SPONSORS</h1>
        <div className="header-decoration" />
        <p>
          Behind every great race is a world-class team.<br />
          Our partners fuel the <strong>TEDxIITI</strong> journey.
        </p>
      </div>
    </header>
  );
};

// --- MAIN PAGE COMPONENT ---
const SponsorsPage = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;600&display=swap');

        :root {
          --f1-red: #ff1e00;
          --f1-blue: #00f0ff;
          --f1-yellow: #fff200;
          --bg-dark: #050505;
          --border-dim: rgba(255, 255, 255, 0.1);
        }

        .sponsors-page {
          font-family: 'Inter', sans-serif;
          background-color: var(--bg-dark);
          color: #fff;
          min-height: 100vh;
          overflow-x: hidden;
          position: relative;
        }

        /* --- Backgrounds --- */
        .grid-overlay {
          position: fixed;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          z-index: 0;
          mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
          pointer-events: none;
        }

        .speed-lines {
          position: fixed;
          inset: 0;
          background: repeating-linear-gradient(90deg, transparent 0, transparent 50px, rgba(255,255,255,0.02) 50px, rgba(255,255,255,0.02) 51px);
          z-index: 0;
          pointer-events: none;
        }

        /* --- Header --- */
        .sponsors-header {
          padding: 140px 8% 60px;
          position: relative;
          z-index: 1;
          opacity: 0;
          transform: translateX(-30px);
          transition: all 1s ease-out;
        }
        .sponsors-header.visible { opacity: 1; transform: translateX(0); }
        .sponsors-header.visible .header-decoration { width: 80px; }

        .header-content h1 {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -2px;
          margin-bottom: 20px;
          background: linear-gradient(180deg, #fff, #888);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .header-content h1 span {
          color: var(--f1-red);
          background: linear-gradient(180deg, var(--f1-red), #800000);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .header-decoration {
          width: 0px;
          height: 6px;
          background: var(--f1-red);
          margin-bottom: 25px;
          transform: skewX(-20deg);
          transition: width 0.8s ease 0.3s;
        }
        .header-content p {
          color: #888;
          font-size: 1.1rem;
          max-width: 500px;
          line-height: 1.6;
          border-left: 2px solid rgba(255,255,255,0.2);
          padding-left: 20px;
        }

        /* --- Tiers & Grids --- */
        .sponsor-tier { padding: 40px 8%; position: relative; z-index: 1; }
        .tier-header { display: flex; align-items: center; gap: 20px; margin-bottom: 40px; }
        .tier-title { font-family: 'Orbitron', sans-serif; font-size: 1.5rem; letter-spacing: 2px; white-space: nowrap; }
        .tier-line { flex-grow: 1; height: 1px; background: linear-gradient(90deg, var(--border-dim), transparent); }

        .tier-red .tier-title { color: var(--f1-red); text-shadow: 0 0 20px rgba(255, 30, 0, 0.4); }
        .tier-blue .tier-title { color: var(--f1-blue); text-shadow: 0 0 20px rgba(0, 240, 255, 0.4); }
        .tier-yellow .tier-title { color: var(--f1-yellow); text-shadow: 0 0 20px rgba(255, 242, 0, 0.4); }

        .sponsor-grid { display: grid; gap: 30px; }
        .sponsor-grid.large { grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); }
        .sponsor-grid.medium { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); }
        .sponsor-grid.small { grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); }

        /* --- Cards --- */
        .sponsor-card {
          position: relative;
          height: 160px;
          background: rgba(20, 20, 20, 0.6);
          clip-path: polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px);
          border: 1px solid var(--border-dim);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          
          /* Animation Init */
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* Animation Trigger */
        .animate-in .sponsor-card { opacity: 1; transform: translateY(0); }

        /* Hover Effects */
        .sponsor-card:hover {
          transform: translateY(-5px) scale(1.02) !important;
          background: rgba(30, 30, 30, 0.95);
          transition-delay: 0s !important;
        }
        .sponsor-card img {
          max-width: 60%;
          max-height: 50%;
          filter: grayscale(100%) brightness(0.7);
          transition: 0.4s ease;
          z-index: 2;
        }
        .sponsor-card:hover img { filter: grayscale(0) brightness(1.2); }

        /* Theme Borders & Glows */
        .tier-red .sponsor-card:hover { border-color: var(--f1-red); }
        .tier-blue .sponsor-card:hover { border-color: var(--f1-blue); }
        .tier-yellow .sponsor-card:hover { border-color: var(--f1-yellow); }

        .card-glow { position: absolute; inset: 0; z-index: 1; opacity: 0; transition: opacity 0.4s ease; }
        .sponsor-card:hover .card-glow { opacity: 0.2; }
        .glow-red { background: radial-gradient(circle at center, var(--f1-red), transparent 70%); }
        .glow-blue { background: radial-gradient(circle at center, var(--f1-blue), transparent 70%); }
        .glow-yellow { background: radial-gradient(circle at center, var(--f1-yellow), transparent 70%); }
      `}</style>

      <div className="sponsors-page">
        <div className="speed-lines" />
        <div className="grid-overlay" />
        <Hero />
        <main>
          {sponsorsData.map((tier) => (
            <TierSection key={tier.id} tier={tier} />
          ))}
        </main>
      </div>
    </>
  );
};

export default SponsorsPage;
