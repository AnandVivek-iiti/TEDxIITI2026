import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Team from "./pages/Team.jsx";
import Sponsors from "./pages/Sponsors.jsx";
import Contact from "./pages/Contact.jsx";
import Speakers from "./pages/Speakers.jsx";
import Events from "./pages/Events/Events.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-lap-coffee text-lap-cream font-body bg-lap-noise">
      <Navbar />
      <main className="pb-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/speakers" element={<Speakers />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
