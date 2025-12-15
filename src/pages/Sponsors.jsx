import Section from "../components/Section.jsx";
import { SponsorTile } from "../components/Cards.jsx";

export default function Sponsors() {
  return (
    <Section title="Sponsors" subtitle="Partners who help us take the long turn.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SponsorTile name="TBA Brand" tier="Title Partner" />
        <SponsorTile name="TBA Brand" tier="Gold Partner" />
        <SponsorTile name="TBA Brand" tier="Silver Partner" />
        <SponsorTile name="TBA Brand" tier="Community" />
      </div>
      <div className="mt-8 text-sm opacity-85">
        Interested in sponsoring? Email <a className="underline" href="mailto:sponsorship@tedxiiti.in">sponsorship@tedxiiti.in</a>.
      </div>
    </Section>
  );
}
