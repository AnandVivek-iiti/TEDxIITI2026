import { Zap, ChevronRight, Play } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative z-10 pt-40 px-10 md:px-24">
      <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 border border-red-600/30 bg-red-600/5 text-red-500 text-[10px] font-black uppercase tracking-[0.4em]">
        <Zap className="w-3.5 h-3.5 fill-current" /> The Uncharted Lap
      </div>
      
      <h1 className="text-[4rem] md:text-[7rem] font-black leading-[0.85] italic tracking-tighter mb-8">
        IDEAS AT<br/>
        <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>300 KM/H</span><br/>
      <span className="bg-linear-to-r from-red-600 to-red-400 bg-clip-text text-transparent pr-4">
          IIT INDORE
        </span>
      </h1>

      <div className="flex flex-col md:flex-row gap-12 items-start">
        <p className="text-gray-400 max-w-sm text-sm font-medium leading-relaxed uppercase tracking-widest">
          The intersection of high-octane engineering and radical thought. Join us for a journey through the fast lane of innovation.
        </p>
        
        <div className="flex gap-6 items-center">
          <button className="h-14 px-10 bg-white text-black font-black text-xs italic flex items-center gap-3 hover:bg-red-600 hover:text-white transition-all transform hover:-translate-y-1">
            BUY TICKETS <ChevronRight className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 font-black text-[10px] tracking-[0.2em] border-b-2 border-red-600 pb-1 hover:text-red-500 transition-colors">
            <Play className="w-3 h-3 fill-current" /> WATCH TEASER
          </button>
        </div>
      </div>
    </div>
  );
}