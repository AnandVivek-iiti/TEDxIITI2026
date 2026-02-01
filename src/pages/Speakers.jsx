import { useState } from "react";
import "../App.css";
import "../components/Navbar.css";
import Section from "../components/Section.jsx";
import TeamCards from "../components/TeamCards";

/* ---------------- INLINE NAVBAR ---------------- */
function SpeakerNavbar({ activeYear, setActiveYear }) {
  return (
    <nav className="right-navbar">
      <button onClick={() => setActiveYear(2026)}>2026</button>
      <button onClick={() => setActiveYear(2025)}>2025</button>
      <button onClick={() => setActiveYear(2024)}>2024</button>
      <button onClick={() => setActiveYear(2023)}>2023</button>
    </nav>
  );
}

/* ---------------- MAIN SPEAKERS PAGE ---------------- */
export default function Speakers() {
  const [activeYear, setActiveYear] = useState(2026);

  return (
    <>
      {/* 2026 */}
      {activeYear === 2026 && (
        <Section
          title="Speakers 2026"
          subtitle="Trailblazers taking the Uncharted Lap."
        >
          <div
            style={{
              height: "1050px",
              position: "relative",
              paddingLeft: "50px",
              paddingTop: "50px",
              paddingRight: "50px",
            }}
          >
            <div className="team-section">
              <TeamCards />
            </div>
          </div>
        </Section>
      )}

      {/* 2025 */}
      {activeYear === 2025 && (
        <Section title="Speakers 2025" subtitle="">
          <div
            style={{
              height: "1050px",
              position: "relative",
              paddingLeft: "50px",
              paddingTop: "50px",
              paddingRight: "50px",
            }}
          >
            <div className="team-section">
              <TeamCards />
            </div>
          </div>
        </Section>
      )}

      {/* 2024 */}
      {activeYear === 2024 && (
        <Section title="Speakers 2024" subtitle="">
          <div
            style={{
              height: "1050px",
              position: "relative",
              paddingLeft: "50px",
              paddingTop: "50px",
              paddingRight: "50px",
            }}
          >
            <div className="team-section">
              <TeamCards />
            </div>
          </div>
        </Section>
      )}

      {/* 2023 */}
      {activeYear === 2023 && (
        <Section title="Speakers 2023" subtitle="">
          <div
            style={{
              height: "1050px",
              position: "relative",
              paddingLeft: "50px",
              paddingTop: "50px",
              paddingRight: "50px",
            }}
          >
            <div className="team-section">
              <TeamCards />
            </div>
          </div>
        </Section>
      )}

      {/* NAVBAR */}
      <SpeakerNavbar
        activeYear={activeYear}
        setActiveYear={setActiveYear}
      />
    </>
  );
}
