import React, { useState, useEffect } from "react";

const ContactFormFinal = () => {
  const [messageData, setMessageData] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Parallax Effect Logic
  const handleMouseMove = (e) => {
    setMousePos({
      x: (e.clientX - window.innerWidth / 2) / 50,
      y: (e.clientY - window.innerHeight / 2) / 50,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => setIsSending(false), 2000);
  };

  const isFormValid = Object.values(messageData).every((val) => val !== "");

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#020202] flex items-center justify-center py-20 px-4 font-sans antialiased text-white overflow-hidden relative"
    >
      {/* 1. Animated Tech Grid Background */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none transition-transform duration-200 ease-out"
        style={{ 
          backgroundImage: `linear-gradient(#ff4d00 1px, transparent 1px), linear-gradient(90deg, #ff4d00 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          transform: `translate(${mousePos.x}px, ${mousePos.y}px) scale(1.1)`
        }}
      />
      
      {/* 2. Floating Cyber Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[150px] animate-pulse delay-700" />

      <div className="relative w-full max-w-[650px] group">
        
        {/* 3. Outer Frame Boundary - Industrial Look */}
        <div className="absolute -inset-[3px] bg-gradient-to-r from-orange-600 via-transparent to-orange-600 opacity-30 group-hover:opacity-100 transition-opacity duration-700"
             style={{ clipPath: 'polygon(10% 0, 90% 0, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0 90%, 0 10%)' }} />

        {/* 4. Main HUD Container */}
        <div 
          className="relative bg-[#0a0a0a] p-10 md:p-16 overflow-hidden border border-white/5"
          style={{ clipPath: 'polygon(10% 0, 90% 0, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0 90%, 0 10%)' }}
        >
          {/* Scanning Laser Animation */}
          <div className="absolute inset-0 z-20 pointer-events-none group-hover:block">
            <div className="w-full h-[2px] bg-orange-500 shadow-[0_0_15px_#ff4d00] opacity-40 animate-[laserScan_4s_infinite_linear]" />
          </div>

          {/* Glitch Header */}
          <div className="mb-12 text-center relative z-30">
            <p className="text-orange-500 font-mono text-[9px] tracking-[0.6em] uppercase mb-3 opacity-70">
              Protocol // 0x442_Secure_Link
            </p>
            <h2 className="text-5xl font-black uppercase tracking-tighter italic relative inline-block group-hover:animate-[glitch_1s_infinite]">
              ESTABLISH <span className="text-orange-600">LINK</span>
              {/* Pseudo-element for Glitch effect */}
              <span className="absolute top-0 left-0 -z-10 text-red-500 opacity-0 group-hover:opacity-70 group-hover:animate-[glitchCopy_0.4s_infinite] clip-path-glitch">ESTABLISH LINK</span>
            </h2>
            <div className="mt-6 flex justify-center items-center gap-3">
              <div className="h-[1px] w-20 bg-orange-600/50 group-hover:w-32 transition-all duration-700" />
              <div className="w-2 h-2 bg-orange-600 rotate-45 animate-ping" />
              <div className="h-[1px] w-20 bg-orange-600/50 group-hover:w-32 transition-all duration-700" />
            </div>
          </div>

          {/* Cyber Inputs */}
          <form onSubmit={handleSubmit} className="space-y-8 relative z-30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative group/input">
                <label className="text-[9px] font-mono text-neutral-500 mb-1 block tracking-widest uppercase">Member_ID</label>
                <input
                  type="text"
                  placeholder="FULL NAME"
                  value={messageData.name}
                  onChange={(e) => setMessageData({ ...messageData, name: e.target.value })}
                  className="w-full bg-neutral-900/50 border-b-2 border-neutral-800 px-0 py-3 font-mono text-xs uppercase tracking-[0.2em] text-orange-400 outline-none focus:border-orange-600 transition-all placeholder:text-neutral-700"
                />
              </div>

              <div className="relative group/input">
                <label className="text-[9px] font-mono text-neutral-500 mb-1 block tracking-widest uppercase">Return_Address</label>
                <input
                  type="email"
                  placeholder="EMAIL@CORE.COM"
                  value={messageData.email}
                  onChange={(e) => setMessageData({ ...messageData, email: e.target.value })}
                  className="w-full bg-neutral-900/50 border-b-2 border-neutral-800 px-0 py-3 font-mono text-xs uppercase tracking-[0.2em] text-orange-400 outline-none focus:border-orange-600 transition-all placeholder:text-neutral-700"
                />
              </div>
            </div>

            <div className="relative group/input">
              <label className="text-[9px] font-mono text-neutral-500 mb-1 block tracking-widest uppercase">Encrypted_Message</label>
              <textarea
                rows={4}
                placeholder="INPUT DATA STREAM..."
                value={messageData.message}
                onChange={(e) => setMessageData({ ...messageData, message: e.target.value })}
                className="w-full bg-neutral-900/50 border border-neutral-800 p-4 font-mono text-xs uppercase tracking-[0.2em] text-orange-400 outline-none focus:border-orange-600 transition-all resize-none placeholder:text-neutral-700"
              />
            </div>

            {/* High-Octane Submit Button */}
            <button
              disabled={!isFormValid || isSending}
              type="submit"
              className={`group/btn relative w-full py-5 font-black uppercase tracking-[0.4em] italic transition-all duration-500 
                ${isFormValid 
                  ? "bg-orange-600 text-black hover:bg-white hover:text-black hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]" 
                  : "bg-neutral-900 text-neutral-600 opacity-40 cursor-not-allowed"}`}
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 75%, 90% 100%, 0 100%)' }}
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {isSending ? "DATA UPLOAD IN PROGRESS..." : "Execute Transmission"}
              </span>
              {/* Button Hover Slide Effect */}
              <div className="absolute inset-0 bg-white -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500 ease-out z-0" />
            </button>
          </form>

          {/* Decorative Corner Hardware */}
          <div className="absolute top-4 left-4 w-6 h-6 border-l-4 border-t-4 border-orange-600/40 group-hover:border-orange-600 transition-colors duration-500" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-r-4 border-b-4 border-orange-600/40 group-hover:border-orange-600 transition-colors duration-500" />
          
          {/* Side Status Indicators */}
          <div className="absolute top-1/2 left-3 -translate-y-1/2 flex flex-col gap-2">
            {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 bg-orange-600 animate-pulse" />)}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes laserScan {
          0% { top: 0; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        @keyframes glitchCopy {
          0% { opacity: 1; transform: translate(0); }
          50% { opacity: 1; transform: translate(5px, -5px); }
          100% { opacity: 0; transform: translate(0); }
        }
      `}} />
    </section>
  );
};

export default ContactFormFinal;