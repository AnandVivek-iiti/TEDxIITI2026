import React from 'react';

// 1. Define the data structure
const NAV_ITEMS = [
  ["/", "Home"],
  ["/speakers", "Speakers"],
  ["/events", "Events"],
  ["/team", "Team"],
  ["/sponsors", "Sponsors"],
  ["/contact", "Contact"],
];

// 2. Separate Component for the Links
const NavLinks = ({ items }) => {
  return (
    <div className="hidden md:flex gap-10 text-[10px] font-black tracking-[0.3em] text-gray-400">
      {items.map(([path, label]) => (
        <a 
          key={path} 
          href={path} 
          className="hover:text-red-500 transition-colors"
        >
          {/* Transforming to uppercase to match original design style */}
          {label.toUpperCase()}
        </a>
      ))}
    </div>
  );
};

// 3. Main Navbar Component
const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b cursor-none border-white/5 bg-black/40">
      <div className="max-w-7xl mx-auto px-10 py-6 flex justify-between items-center">
        
        {/* Logo Section */}
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-black italic">
            TED<span className="text-red-600 ">x</span>
          </span>
          <span className="text-2xl italic font-black">
            IIT INDORE
          </span>
        </div>

        {/* Navigation Links Component */}
        <NavLinks items={NAV_ITEMS} />
        
      </div>
    </nav>
  );
};

export default Navbar;