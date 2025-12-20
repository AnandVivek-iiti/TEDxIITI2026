import React, { useState, useRef, useEffect } from 'react';
import { Zap } from 'lucide-react';

export default function WhatIsTedx() {
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
    <section ref={sectionRef} className="relative py-32 px-4 md:px-24 overflow-hidden bg-black z-20">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(220, 40, 40, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(220, 40, 40, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          animation: 'grid-flow 20s linear infinite'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          <div className={`lg:col-span-2 space-y-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-red-600/30 bg-red-600/5 text-red-500 text-[10px] font-black uppercase tracking-[0.4em]">
              <Zap className="w-3.5 h-3.5 fill-current" /> The Movement
            </div>

            <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-[0.9]">
              <span className="text-white">What is </span>
              <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">TED</span>
              <sup className="text-red-600 text-4xl">x</sup>
            </h2>

            <div className="flex items-baseline gap-3 border-l-4 border-red-600 pl-6">
              <span className="text-6xl font-black italic text-red-600">x</span>
              <span className="text-xl font-black text-gray-400 uppercase tracking-widest">
                = Independently organized event
              </span>
            </div>

            <div className="space-y-6 text-gray-400 leading-relaxed">
              <p className="text-sm uppercase tracking-wider font-medium border-l-2 border-gray-700 pl-6 hover:border-red-600 transition-colors duration-300">
                TEDx was created in 2009 in the spirit of TED's mission, "Ideas worth spreading". It supports
                independent organizers who want to create TED-like event in their own community.
              </p>
              <p className="text-sm uppercase tracking-wider font-medium border-l-2 border-gray-700 pl-6 hover:border-red-600 transition-colors duration-300">
                In the spirit of ideas worth spreading, TEDx is a program of local, self-organized events that bring
                people together to share a TED-like experience. At a TEDx event, TEDTalks video and live speakers
                combine to spark deep discussion and connection in a small group.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              {[
                { label: 'Communities', value: '3000+' },
                { label: 'Countries', value: '170+' },
                { label: 'Events', value: '5000+' }
              ].map((stat, i) => (
                <div key={i} className="group">
                  <div className="text-4xl font-black italic text-red-600 mb-1 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`lg:col-span-1 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-red-600 via-purple-600 to-red-600 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
              <div className="relative bg-black rounded-2xl overflow-hidden border-2 border-red-600/50 group-hover:border-red-600 transition-colors duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <iframe
                  className="w-full aspect-video relative z-10"
                  src="https://www.youtube.com/embed/d0NHOpeczUU"
                  title="What is TEDx?"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="absolute -bottom-3 -right-3 w-32 h-32 border-4 border-red-600 rounded-full opacity-30 group-hover:scale-110 group-hover:opacity-60 transition-all duration-300"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
      
      <style jsx>{`
        @keyframes grid-flow {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
      `}</style>
    </section>
  )
}