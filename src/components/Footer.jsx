import React from 'react';
import { Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { icon: Twitter, label: 'Twitter' },
    { icon: Instagram, label: 'Instagram' },
    { icon: Linkedin, label: 'LinkedIn' },
    { icon: Youtube, label: 'YouTube' }
  ];

  return (
    <footer className="relative z-20 bg-black text-white overflow-hidden">
      
      <div className="max-w-8xl mx-auto px-4 py-6 relative">
        
        {/* --- MODIFIED SECTION: Full Width Pattern --- */}
        {/* Changed from right-0/w-64 to left-0/w-full. 
            Used inline SVG for a perfect infinite checkerboard without 1000+ divs. */}
        <div className="absolute top-0 left-0 w-full h-64 opacity-5 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="checkerboard" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                {/* 4 squares to create the tile: TopL, TopR, BotL, BotR */}
                <rect x="0" y="0" width="20" height="20" fill="white" />
                <rect x="20" y="0" width="20" height="20" fill="black" />
                <rect x="0" y="20" width="20" height="20" fill="black" />
                <rect x="20" y="20" width="20" height="20" fill="white" />
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#checkerboard)" />
          </svg>
        </div>
        {/* ------------------------------------------- */}

        <div className="flex flex-col md:flex-row gap-12 px-15 justify-between items-start relative">
          <div className="space-y-6 ">
            <div className="space-y-2">
              <h3 className="text-4xl font-black italic tracking-tighter">
                TED<span className="text-red-600">x</span>
                <span className="text-4xl font-black italic tracking-tighter">IITINDORE</span>
              </h3>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-gray-600">
                The Uncharted Lap
              </p>
            </div>
            
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, label }, i) => (
                <button 
                  key={i}
                  aria-label={label}
                  className="w-12 h-12 border-2 border-red-600/30 hover:border-red-600 bg-red-600/5 hover:bg-red-600/20 rounded-full flex items-center justify-center text-red-600 transition-all transform hover:-translate-y-1"
                >
                  <Icon size={20} strokeWidth={2.5} />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { title: 'Event', links: ['Speakers', 'Schedule', 'Tickets', 'Sponsors'] },
              { title: 'About', links: ['Team', 'Contact', 'FAQ', 'Press'] },
              { title: 'Connect', links: ['Newsletter', 'Volunteer', 'Partner', 'Donate'] }
            ].map((section, i) => (
              <div key={i} className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600 border-b-2 border-red-600/30 pb-2">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <a 
                        href="#" 
                        className="text-sm text-gray-400 hover:text-white transition-colors font-medium tracking-wide hover:translate-x-1 inline-block"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        

        <div className="absolute bottom-0 right-0 w-32 h-32 bg-linear-to-tl from-red-600/20 to-transparent rounded-tl-full"></div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </footer>
  );
}