import { NavLink, Link } from "react-router-dom";

const linkBase =
  "px-3 py-2 rounded-xl transition hover:bg-white/10 text-sm tracking-wide";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-lap-coffee/80 border-b border-white/10">
      <div className="lap-stripe h-2 w-full" />
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-6">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="h-9 w-9 rounded-xl bg-lap-red grid place-items-center shadow-soft">
            <span className="font-black text-lap-cream">x</span>
          </div>
          <div className="leading-tight">
            <p className="font-bold uppercase tracking-wider">
              TED<span className="text-lap-red">x</span> IIT Indore
            </p>
            <p className="text-xs opacity-80">The Uncharted Lap</p>
          </div>
        </Link>
        <nav className="ml-auto flex gap-1">
          {[
            ["/", "Home"],
            ["/speakers", "Speakers"],
            ["/events", "Events"],
            ["/team", "Team"],
            ["/sponsors", "Sponsors"],
            ["/contact", "Contact"],
          ].map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `${linkBase} ${isActive ? "bg-white/15" : "text-lap-cream/90"}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
