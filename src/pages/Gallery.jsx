import Section from "../components/Section.jsx";
import { SpeakerCard } from "../components/Cards.jsx";

export default function Speakers() {
  return (
    <Section title="Speakers" subtitle="Trailblazers taking the Uncharted Lap.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <SpeakerCard name="TBA #1" title="Founder, Unknown Labs" tag="Keynote" />
        <SpeakerCard name="TBA #2" title="Roboticist" />
        <SpeakerCard name="TBA #3" title="Artist & Researcher" />
      </div>
    </Section>
  );
}
