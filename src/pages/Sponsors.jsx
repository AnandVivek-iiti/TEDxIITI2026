import React, { useEffect, useRef } from 'react';

const SPONSORS_DATA = {
  title: {
    name: "TITLE PARTNER",
    color: "var(--f1-red)",
    items: [{ id: 1, img: "https://www.shutterstock.com/image-illustration/sponsor-gold-text-on-black-260nw-512951308.jpg", edge: "gold-edge" }]
  },
  associate: {
    name: "ASSOCIATE PARTNERS",
    color: "var(--f1-blue)",
    items: [
      { id: 2, img: "https://via.placeholder.com/160x80", edge: "blue-edge" },
      { id: 3, img: "https://via.placeholder.com/160x80", edge: "blue-edge" },
      { id: 4, img: "https://via.placeholder.com/160x80", edge: "blue-edge" }
    ]
  },
  support: {
    name: "SUPPORT PARTNERS",
    color: "var(--f1-yellow)",
    items: [
      { id: 5, img: "https://via.placeholder.com/160x80", edge: "yellow-edge" },
      { id: 6, img: "https://via.placeholder.com/160x80", edge: "yellow-edge" }
    ]
  }
};

const SponsorCard = ({ img, edge, isHero }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateX(0) skewX(-2deg)";
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`sponsor-card ${edge}`}
      style={{
        opacity: 0,
        transform: "translateX(-50px) skewX(5deg)",
        transition: "all 0.6s ease-out"
      }}
    >
      <div className="card-glare"></div>
      <img src={img} alt="Sponsor" />
      {isHero && <div className="corner-detail top-right"></div>}
    </div>
  );
};

const SponsorsPage = () => {
  return (
    <div className="f1-sponsors-container">
      <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Inter:wght@300;400;600&display=swap');
        :root {
          --f1-red: #e10600;
          --f1-blue: #00c2ff;
          --f1-yellow: #ffb000;
          --carbon: #15151e;
          --surface: #1f1f27;
          --text-main: #ffffff;
        }

        .f1-sponsors-container {
          background-color: #0b0b0b;
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 40px 40px;
          color: var(--text-main);
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
        }

        .speed-lines {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent 95%, rgba(225,6,0,0.05) 95%);
          background-size: 200px 100%;
          z-index: 0;
          pointer-events: none;
        }

        .f1-header {
          position: relative;
          padding: 100px 8% 60px;
          border-bottom: 1px solid #333;
          background: linear-gradient(to right, rgba(225,6,0,0.1), transparent);
          z-index: 1;
        }

        .f1-header h1 {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 900;
          font-style: italic;
          line-height: 0.9;
          margin: 0;
        }

        .f1-header h1 span {
          color: transparent;
          -webkit-text-stroke: 1px var(--f1-red);
        }

        .grid-container {
          position: relative;
          z-index: 1;
          padding-bottom: 100px;
        }

        .tier-section {
          padding: 60px 8% 20px;
        }

        .tier-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 40px;
        }

        .tier-title {
          font-family: 'Orbitron';
          letter-spacing: 3px;
          font-size: 1.2rem;
        }

        .finish-line {
          height: 2px;
          flex-grow: 1;
          background: repeating-linear-gradient(90deg, #fff, #fff 10px, transparent 10px, transparent 20px);
          opacity: 0.3;
        }

        .sponsor-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 25px;
        }

        .sponsor-grid.hero {
          grid-template-columns: 1fr;
          max-width: 600px;
        }

        .sponsor-card {
          background: var(--surface);
          padding: 40px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #333;
          clip-path: polygon(0 0, 95% 0, 100% 25%, 100% 100%, 5% 100%, 0 75%);
          cursor: pointer;
        }

        .sponsor-card:hover {
          background: #2a2a35;
          border-color: #555;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .gold-edge { border-left: 5px solid var(--f1-red); }
        .blue-edge { border-left: 5px solid var(--f1-blue); }
        .yellow-edge { border-left: 5px solid var(--f1-yellow); }

        .sponsor-card img {
          max-width: 180px;
          height: auto;
          filter: grayscale(100%) brightness(1.5);
          transition: 0.4s;
        }

        .sponsor-card:hover img {
          filter: grayscale(0%) brightness(1);
        }

        .corner-detail {
          position: absolute;
          width: 20px;
          height: 20px;
          border-top: 2px solid var(--f1-red);
          border-right: 2px solid var(--f1-red);
          top: 10px;
          right: 10px;
        }

        @media (max-width: 768px) {
          .f1-header { padding-top: 60px; }
          .tier-section { padding: 40px 5%; }
        }
      `}</style>

      <div className="speed-lines"></div>

      <header className="f1-header">
        <div className="header-inner">
          <h1>OUR <span>SPONSORS</span></h1>
        </div>
      </header>

      <main className="grid-container">
        <section className="tier-section">
          <div className="tier-header">
            <h2 className="tier-title" style={{ color: SPONSORS_DATA.title.color }}>
              {SPONSORS_DATA.title.name}
            </h2>
            <div className="finish-line"></div>
          </div>
          <div className="sponsor-grid hero">
            {SPONSORS_DATA.title.items.map(s => (
              <SponsorCard key={s.id} img={s.img} edge={s.edge} isHero={true} />
            ))}
          </div>
        </section>
        <section className="tier-section">
          <div className="tier-header">
            <h2 className="tier-title" style={{ color: SPONSORS_DATA.associate.color }}>
              {SPONSORS_DATA.associate.name}
            </h2>
          </div>
          <div className="sponsor-grid">
            {SPONSORS_DATA.associate.items.map(s => (
              <SponsorCard key={s.id} img={s.img} edge={s.edge} />
            ))}
          </div>
        </section>
        <section className="tier-section">
          <div className="tier-header">
            <h2 className="tier-title" style={{ color: SPONSORS_DATA.support.color }}>
              {SPONSORS_DATA.support.name}
            </h2>
          </div>
          <div className="sponsor-grid small">
            {SPONSORS_DATA.support.items.map(s => (
              <SponsorCard key={s.id} img={s.img} edge={s.edge} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default SponsorsPage;
