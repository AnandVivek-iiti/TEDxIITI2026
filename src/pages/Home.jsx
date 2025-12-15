import Section from "../components/Section.jsx";
import LapStripe from "../components/LapStripe.jsx";
import Button from "../components/Button.jsx";
import { EventCard } from "../components/Cards.jsx";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            The <span className="text-lap-amber">Uncharted Lap</span>
          </h1>
          <p className="mt-3 max-w-2xl text-balance opacity-90">
            A TEDx IIT Indore experience that bends the track and celebrates
            detours — where ideas accelerate past the familiar.
          </p>
          <div className="mt-6 flex gap-3">
            <Button as={Link} to="/events">Get Tickets</Button>
            <Button as={Link} to="/speakers" className="bg-transparent border border-white/15 hover:bg-white/10">
              Meet the Speakers
            </Button>
          </div>
        </div>
        <LapStripe className="h-20 mx-4 mb-8 rounded-3xl" />
      </section>

      <Section title="Upcoming" subtitle="Don’t blink — you might miss a turn.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <EventCard name="Main Conference" when="Feb 15, 2026" where="Auditorium, IIT Indore"
            desc="Talks, performances, and conversations that take the long way around." />
          <EventCard name="Salon: Pit Stop" when="Jan 28, 2026" where="LT-101"
            desc="Short-format talks exploring near-misses and lucky breaks." />
          <EventCard name="Workshop: Story Pit" when="Feb 1, 2026" where="Innovation Lab"
            desc="Craft your arc: narrative techniques for powerful talks." />
        </div>
      </Section>
    </>
  );
}
