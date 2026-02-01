import React from "react";

// Navigation items
const NAV_ITEMS = [
  ["/", "Home"],
  ["/speakers", "Speakers"],
  // ["/events", "Events"],
  ["/team", "Team"],
  ["/talk", "Talk"],
  ["/sponsors", "Sponsors"],
  ["/gallery", "Gallery"],
  ["/contact", "Contact"],
];

// Nav links component
const NavLinks = ({ items }) => {
  return (
    <div className="hidden md:flex gap-10 text-[10px] font-black tracking-[0.3em] text-gray-400">
      {items.map(([path, label]) => (
        <a
          key={path}
          href={path}
          className="hover:text-red-500 transition-colors"
        >
          {label.toUpperCase()}
        </a>
      ))}
    </div>
  );
};

// Main Navbar
const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/5 bg-black/40">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-4 sm:py-6 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-baseline gap-1 md:-ml-6">
          <span className="text-xl sm:text-2xl font-black italic">
            TED<span className="text-red-600">x</span>
          </span>
          <span className="text-xl sm:text-2xl font-black italic">
            IIT INDORE
          </span>
        </div>

        {/* Navigation */}
        <NavLinks items={NAV_ITEMS} />

      </div>
    </nav>
  );
};

export default Navbar;
