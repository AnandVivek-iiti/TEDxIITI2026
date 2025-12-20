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
      <div className="h-2 w-full relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-red-600 via-purple-600 to-red-600"
          style={{ animation: 'shimmer 3s linear infinite' }}
        ></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-16 relative">
        <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
          <div className="grid grid-cols-8 grid-rows-8 h-full">
            {Array.from({ length: 64 }).map((_, i) => (
              <div 
                key={i} 
                className={`${(Math.floor(i / 8) + i) % 2 === 0 ? 'bg-white' : 'bg-black'}`}
              ></div>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-12 justify-between items-start relative">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-4xl font-black italic tracking-tighter">
                TED<span className="text-red-600">x</span>
                <span className="text-xl font-bold tracking-[0.3em] text-gray-500">IITINDORE</span>
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

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row gap-6 justify-between items-center text-center md:text-left">
          <div className="space-y-2">
            <p className="text-sm font-bold text-gray-400">
              © {new Date().getFullYear()} TEDxIITIndore. All rights reserved.
            </p>
            <p className="text-[10px] uppercase tracking-widest text-gray-600">
              This independent TEDx event is operated under license from TED.
            </p>
          </div>
          
          <div className="flex gap-6 text-xs text-gray-500 font-medium">
            <a href="#" className="hover:text-red-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-red-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-red-600 transition-colors">Code of Conduct</a>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-red-600/20 to-transparent rounded-tl-full"></div>
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