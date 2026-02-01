import React, { useState, useRef, useEffect } from 'react';
import { MapPin, ChevronRight } from 'lucide-react';

export default function Venue() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-4 md:px-24 bg-[#0a0a0a] z-20 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-red-600 to-transparent"
            style={{
              top: `${(i / 15) * 100}%`,
              left: 0,
              right: 0,
              animation: `slide-left ${2 + i * 0.2}s linear infinite`,
              animationDelay: `${i * 0.1}s`
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className={`space-y-8 text-center lg:text-left transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-red-600/30 bg-red-600/5 text-red-500 text-[10px] font-black uppercase tracking-[0.4em]">
              <MapPin className="w-3.5 h-3.5" /> Circuit Location
            </div>

            <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-[0.85]">
              THE STARTING{' '}
              <span className="relative inline-block">
                <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>
                  GRID
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-purple-600"></div>
              </span>
            </h2>

            <div className="space-y-4">
              <p className="text-xl text-gray-300 uppercase tracking-wider font-medium leading-relaxed">
                In the campus of IIT Indore, Khandwa road, Simrol
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { label: 'Elevation', value: '583M' },
                  { label: 'Track Type', value: 'STREET' }
                ].map((stat, i) => (
                  <div key={i} className="border-l-4 border-red-600 pl-4 hover:border-purple-600 transition-colors duration-300">
                    <div className="text-3xl font-black italic text-red-600">{stat.value}</div>
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6">
              <button className="h-14 px-10 bg-white text-black font-black text-xs italic flex items-center justify-center gap-3 hover:bg-red-600 hover:text-white transition-all transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-600/50">
                GET DIRECTIONS <ChevronRight className="w-4 h-4" />
              </button>
              <button className="h-14 px-10 border-2 border-red-600/50 text-white font-black text-xs italic hover:border-red-600 hover:bg-red-600/10 transition-all transform hover:-translate-y-1">
                VIEW CAMPUS MAP
              </button>
            </div>
          </div>

          <div className={`relative transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-red-600 via-purple-600 to-red-600 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
              
              <div className="relative bg-black rounded-2xl overflow-hidden border-2 border-red-600/50 group-hover:border-red-600 transition-colors duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none"></div>
                <iframe
                  title="IIT Indore Location"
                  className="w-full aspect-video relative z-0"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.5687000720456!2d75.92073997594073!3d22.52035967952932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962efcccbce7145%3A0x784e8cb69818596b!2sIIT%20Indore!5e0!3m2!1sen!2sin!4v1709667547144!5m2!1sen!2sin"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
              
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-red-600 to-purple-600 rounded-full flex items-center justify-center border-4 border-black shadow-2xl shadow-red-600/50 group-hover:scale-110 transition-transform duration-300">
                <div className="text-center text-white">
                  <MapPin className="w-10 h-10 mx-auto mb-2" />
                  <div className="text-[10px] font-black tracking-wider">FINISH<br/>LINE</div>
                </div>
              </div>

              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-purple-600 to-transparent opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
      
      <style jsx>{`
        @keyframes slide-left {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </section>
  )
}