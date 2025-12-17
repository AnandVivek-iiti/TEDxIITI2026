import EventCard from "./Eventcard.jsx";
import { eventsData } from "../../data/EventData";

export default function Events() {
  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,#101828,#020617)] py-16 px-6">

      <h1 className="text-center text-4xl md:text-5xl font-extrabold
        text-white tracking-wider mb-14">
        <span className="text-red-600 font-futuristic">EVENTS</span>
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2
        lg:grid-cols-4 gap-10 font-futuristic">
        {eventsData.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
