import React, { useEffect, useRef } from 'react';

const SPONSOR_CONFIG = [
  {
    id: 't1',
    tierName: "Main Sponsor",
    tierNumber: "01",
    layoutClass: "pole-position",
    members: [
      { id: 's1', name: "Title Sponsor", img: "https://via.placeholder.com/400x150/1a0c07/FDDCA9?text=TITLE+SPONSOR" }
    ]
  },
  {
    id: 't2',
    tierName: "Primary Sponsors",
    tierNumber: "02",
    layoutClass: "primary-grid",
    members: [
      { id: 's2', name: "Engine A", img: "https://via.placeholder.com/250x100/1a0c07/FDDCA9?text=ENGINE+A" },
      { id: 's3', name: "Engine B", img: "https://via.placeholder.com/250x100/1a0c07/FDDCA9?text=ENGINE+B" }
    ]
  },
  {
    id: 't3',
    tierName: "Secondary Sponsors",
    tierNumber: "03",
    layoutClass: "secondary-grid",
    members: [
      { id: 's4', name: "Tech", img: "https://via.placeholder.com/200x80/1a0c07/FDDCA9?text=TECH" },
      { id: 's5', name: "Travel", img: "https://via.placeholder.com/200x80/1a0c07/FDDCA9?text=TRAVEL" },
      { id: 's6', name: "Food", img: "https://via.placeholder.com/200x80/1a0c07/FDDCA9?text=FOOD" }
    ]
  }
];

const SponsorCard = ({ sponsor, index }) => (
  <div
    className="sponsor-card"
    style={{ transitionDelay: `${index * 0.15}s` }}
  >
    <div className="card-accent" />
    <img src={sponsor.img} alt={sponsor.name} loading="lazy" />
    <div className="telemetry-tag">LVL_{index + 1} // {sponsor.id.toUpperCase()}</div>
  </div>
);

const TierSection = React.forwardRef(({ tier }, ref) => (
  <section className={`tier-section ${tier.layoutClass}`} ref={ref}>
    <div className="tier-header">
      <span className="race-number">{tier.tierNumber}</span>
      <h2 className="tier-name">{tier.tierName}</h2>
    </div>
    <div className="grid-container">
      {tier.members.map((sponsor, idx) => (
        <SponsorCard key={sponsor.id} sponsor={sponsor} index={idx} />
      ))}
    </div>
  </section>
));

const SponsorsPage = () => {
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('reveal');
        });
      },
      { threshold: 0.15 }
    );

    sectionRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="f1-sponsors-wrapper">
      <Styles />
      <div className="container">
        <header className="page-header">
          <h1 className="f1-title">Our Sponsors</h1>
          <p className="subtitle">Official Partners 2025 // TEDxIITIndore</p>
        </header>

        <main>
          {SPONSOR_CONFIG.map((tier, idx) => (
            <TierSection
              key={tier.id}
              tier={tier}
              ref={el => sectionRefs.current[idx] = el}
            />
          ))}
        </main>
      </div>
    </div>
  );
};

const Styles = () => (
  <style>{`
    :root {
      --red: #C21717; --orange: #E76219; --gold: #FEA712;
      --brown: #562717; --cream: #FDDCA9; --black: #1a0c07;
    }

    .f1-sponsors-wrapper {
      background: radial-gradient(circle at 50% 50%, var(--brown) 0%, var(--black) 100%);
      background-attachment: fixed;
      color: var(--cream);
      font-family: 'Orbitron', sans-serif;
      min-height: 100vh;
      overflow-x: hidden;
    }

    .container { max-width: 1100px; margin: 0 auto; padding: 80px 20px; }

    /* Header */
    .page-header {
      border-left: 8px solid var(--red);
      padding-left: 25px;
      margin-bottom: 100px;
      position: relative;
    }
    .page-header::before {
      content: "GRID_READY // STATUS: OK";
      font-size: 0.65rem; color: var(--gold); letter-spacing: 3px;
      position: absolute; top: -20px;
    }
    .f1-title { font-size: clamp(2.5rem, 7vw, 4.5rem); text-transform: uppercase; font-style: italic; font-weight: 900; }
    .subtitle { color: var(--orange); letter-spacing: 4px; font-weight: bold; font-size: 0.9rem; }

    /* Sections */
    .tier-section { margin-bottom: 120px; opacity: 0.3; transition: opacity 0.8s ease; }
    .tier-section.reveal { opacity: 1; }

    .tier-header { display: flex; align-items: center; gap: 15px; margin-bottom: 40px; }
    .race-number { font-size: 2.5rem; color: var(--red); font-weight: 900; font-style: italic; }
    .tier-name { text-transform: uppercase; letter-spacing: 4px; border-bottom: 2px solid var(--brown); font-size: 1.2rem; }

    /* Grids */
    .grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 25px;
    }
    .pole-position .grid-container { grid-template-columns: 1fr; max-width: 800px; margin: 0 auto; }

    /* Cards */
    .sponsor-card {
      background: rgba(86, 39, 23, 0.4);
      height: 220px;
      position: relative;
      display: flex; align-items: center; justify-content: center;
      clip-path: polygon(0 0, 100% 0, 100% 85%, 90% 100%, 0 100%);
      border: 1px solid rgba(255,255,255,0.05);
      transform: translateX(100px); opacity: 0;
      transition: all 0.8s cubic-bezier(0.2, 1, 0.3, 1);
    }
    .reveal .sponsor-card { transform: translateX(0); opacity: 1; }
    .tier-section:nth-child(even) .sponsor-card { transform: translateX(-100px); }

    .pole-position .sponsor-card { height: 320px; background: var(--brown); border-left: 6px solid var(--red); }

    .card-accent { position: absolute; top: 0; left: 0; width: 40px; height: 40px; background: var(--red); clip-path: polygon(0 0, 100% 0, 0 100%); }
    .telemetry-tag { position: absolute; bottom: 15px; right: 20px; font-size: 0.55rem; color: var(--gold); letter-spacing: 1px; }
    .sponsor-card img { max-width: 70%; filter: grayscale(0.2) brightness(1.1); transition: 0.3s; }
    .sponsor-card:hover img { filter: grayscale(0) scale(1.05); }

    @media (max-width: 768px) {
      .sponsor-card { transform: none !important; opacity: 1 !important; clip-path: none; }
      .container { padding: 40px 15px; }
    }
  `}</style>
);

export default SponsorsPage;
