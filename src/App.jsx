import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Team from "./pages/Team.jsx";
import Sponsors from "./pages/Sponsors.jsx";
import Contact from "./pages/Contact.jsx";
import Speakers from "./pages/Speakers.jsx";
import CustomCursor from "./components/CustomCursor";
// import Events from "./pages/Events/Events.jsx";
import Talk from "./pages/Talks/Talk.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-lap-coffee cursor-none text-lap-cream font-body bg-lap-noise">
      <CustomCursor />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/speakers" element={<Speakers />} />
          {/* <Route path="/events" element={<Events />} /> */}
          <Route path="/talk" element={<Talk />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
