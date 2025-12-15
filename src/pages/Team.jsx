import Section from "../components/Section.jsx";
import { TeamCard } from "../components/Cards.jsx";

export default function Team() {
  return (
    <Section title="Team" subtitle="Volunteers steering the bend.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <TeamCard name="Your Name" role="Organizer" />
        <TeamCard name="Member #2" role="Curation" />
        <TeamCard name="Member #3" role="Production" />
        <TeamCard name="Member #4" role="Design" />
      </div>
    </Section>
  );
}
