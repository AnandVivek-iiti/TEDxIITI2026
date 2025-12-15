import Section from "../components/Section.jsx";
import Button from "../components/Button.jsx";

export default function Contact() {
  return (
    <Section title="Contact Us" subtitle="Questions, partnerships, ideas — we’re listening.">
      <form className="max-w-xl space-y-4">
        <div>
          <label className="text-sm opacity-80">Name</label>
          <input className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2"
                 placeholder="Your name" />
        </div>
        <div>
          <label className="text-sm opacity-80">Email</label>
          <input type="email" className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2"
                 placeholder="you@example.com" />
        </div>
        <div>
          <label className="text-sm opacity-80">Message</label>
          <textarea rows={5} className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2"
                    placeholder="Tell us more..." />
        </div>
        <Button type="submit">Send</Button>
      </form>
    </Section>
  );
}
