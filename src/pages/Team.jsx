import React from 'react';
import { FaLinkedinIn, FaInstagram } from 'react-icons/fa';
// Import the background component
import WarpBackground from '../components/WarpBackground'; 

/**
 * 1. TEAM CARD COMPONENT
 * Uses 'group/card' to isolate hover effects to this specific card
 */
const TeamCard = ({ name, role, image, linkedin, instagram }) => {
  return (
    <div className="group/card relative h-[420px] w-72 shrink-0 p-4 transition-all duration-500 mx-6">
      
      {/* Outer Neon Glow Boundary */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-700 opacity-10 blur-md group-hover/card:opacity-100 group-hover/card:blur-2xl transition-all duration-700"
        style={{
          clipPath: 'polygon(12% 0, 88% 0, 100% 12%, 100% 88%, 88% 100%, 12% 100%, 0 88%, 0 12%)'
        }}
      />

      {/* Main Tech Frame */}
      <div
        className="relative h-full w-full overflow-hidden bg-[#0d0d0d] border border-orange-500/20 group-hover/card:border-orange-500/60 transition-colors duration-500 shadow-2xl"
        style={{
          clipPath: 'polygon(12% 0, 88% 0, 100% 12%, 100% 88%, 88% 100%, 12% 100%, 0 88%, 0 12%)'
        }}
      >
        {/* Scanning Line Animation (Hover Only) */}
        <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover/card:opacity-100">
          <div className="h-1/2 w-full bg-gradient-to-b from-orange-500/20 to-transparent absolute top-[-50%] animate-[scan_2s_linear_infinite]" />
        </div>

        {/* Profile Avatar Area */}
        <div className="relative z-10 flex flex-col items-center pt-10">
          <div className="relative p-1.5 rounded-full border-2 border-orange-500/30 group-hover/card:border-orange-500 group-hover/card:shadow-[0_0_25px_rgba(249,115,22,0.5)] transition-all duration-700">
            <img
              src={image}
              alt={name}
              className="h-28 w-28 rounded-full object-cover grayscale group-hover/card:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>

        {/* Info & Socials Content */}
        <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col items-center text-center">
          <div className="mb-4 w-12 h-0.5 bg-orange-500/20 group-hover/card:w-32 group-hover/card:bg-orange-500 transition-all duration-700" />

          <h3 className="text-2xl font-black text-orange-500 uppercase tracking-tighter leading-none transition-all group-hover/card:scale-110">
            {name}
          </h3>

          <p className="mt-2 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500 group-hover/card:text-white transition-colors">
            {role}
          </p>

          <div className="mt-8 flex gap-4 opacity-0 translate-y-6 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-700">
            <a href={linkedin} target="_blank" rel="noreferrer"
              className="p-2 border border-orange-500/30 hover:bg-orange-500 hover:text-black transition-all text-orange-500">
              <FaLinkedinIn size={18} />
            </a>
            <a href={instagram} target="_blank" rel="noreferrer"
              className="p-2 border border-orange-500/30 hover:bg-orange-500 hover:text-black transition-all text-orange-500">
              <FaInstagram size={18} />
            </a>
          </div>
        </div>

        {/* Decorative Side HUD Bars */}
        <div className="absolute top-1/2 left-2 -translate-y-1/2 w-[2px] h-16 bg-orange-500 opacity-20 group-hover/card:opacity-100 group-hover/card:shadow-[0_0_10px_#f97316] transition-all" />
        <div className="absolute top-1/2 right-2 -translate-y-1/2 w-[2px] h-16 bg-orange-500 opacity-20 group-hover/card:opacity-100 group-hover/card:shadow-[0_0_10px_#f97316] transition-all" />
      </div>

      {/* Card Specific Keyframes */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes scan {
          0% { top: -50%; }
          100% { top: 100%; }
        }
      `}} />
    </div>
  );
};

/**
 * 2. MARQUEE COMPONENT
 * Uses 'group/marquee' to control the scroll pause
 */
const Marquee = ({ children, speed = 40 }) => {
  return (
    <div className="relative w-full overflow-hidden group/marquee">
      {/* Gradient Masks */}
      <div className="absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none" />
      
      {/* The Moving Container - Pauses when group/marquee is hovered */}
      <div 
        className="flex w-max animate-marquee group-hover/marquee:![animation-play-state:paused]"
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="flex">
          {children}
        </div>
        <div className="flex">
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * 3. MAIN SECTION COMPONENT
 */
const TeamSection = () => {
  
  // 1. Level 1: Core Leadership (Top 3)
  const coreLeadership = [
    { name: "Dhruv Ruhela", role: "Organiser", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
    { name: "Suryansh Nagar", role: "Co-Organiser", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
    { name: "Yagyaparna Mandwale", role: "Production Head", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
  ];

  // 2. Level 2: Team Heads/Leads
  const teamHeads = [
    { name: "Vedant Yerekar", role: "Curator", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
    { name: "Shivkesh Meena", role: "Outreach Head", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
    { name: "Swarad Mahajan", role: "Marketing Head", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
    { name: "Siddharth Singh Jadon", role: "PR Head", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
    { name: "Mayank Bisaria", role: "Creatives Head", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
    { name: "Kapil Bansal", role: "Social Media Head", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
    { name: "Ayush Varun", role: "Video Production Head", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
    { name: "Harsh Pathak", role: "Social Media Co-Head", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
    { name: "Abhay Lodhi", role: "Web Development Head", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
  ];

  // 3. Level 3: Department Associates
  const departments = [
    {
      title: "Web Development",
      description: "Building robust, scalable digital infrastructures.",
      members: [
        { name: "Abhishek Kumar Verma", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
        { name: "Abhijeet", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
        { name: "Anand Vivek", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
        { name: "Ashu Newatia", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
        { name: "Harshith Pasupuleti", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" }
      ]
    },
    {
      title: "Video Production",
      description: "Capturing and editing visual stories.",
      members: [
        { name: "Mohit Jain", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
        { name: "Sanchit Goyal", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
        { name: "Sanchit Kumar Bharti", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
        { name: "Rachit Thakur", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
        { name: "Anvit Jayesh Tambe", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
        { name: "Anuj Kumar", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" }
      ]
    },
    {
      title: "Creatives",
      description: "Visual design and artistic direction.",
      members: [
        { name: "Mayuri Deokar", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
        { name: "Shreya Lahane", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
        { name: "Param Pandya", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
        { name: "Harshwardhan Mukhedkar", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
        { name: "Sakshi Deshpande", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
        { name: "Shreyanshi Tulsyan", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
        { name: "Arushi Jain", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" }
      ]
    },
    {
      title: "Marketing",
      description: "Amplifying our voice across all channels.",
      members: [
        { name: "Shrawani Jadhav", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
        { name: "Jainesh Roy", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
        { name: "Sancheti Aagam Sudhirkumar", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
        { name: "Harshvardhan Bapna", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
        { name: "Ronak yadav", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
        { name: "Tanuj Jog", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
        { name: "Anshumaan Agrawal", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
        { name: "Atul", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
        { name: "Monish R", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
        { name: "Mandar Bhalerao", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
        { name: "Pushpendra Bansal", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
        { name: "Tijil Sawala", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" }
      ]
    },
    {
      title: "Outreach & PR",
      description: "Connecting solutions with the people who need them.",
      members: [
        { name: "Vaghela Krutarth Yogeshkumar", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
        { name: "Ansh Yadav", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
        { name: "Anshuman Nema", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
        { name: "Sushmita Patil", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
        { name: "Mannath Jain", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
        { name: "TIRTHANKAR DAS", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
        { name: "Vanshika Poddar", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
        { name: "Rishika Goyal", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
        { name: "Pritish Dutta", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
        { name: "Samarth MN", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
        { name: "Aninda Pratim Roy", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
        { name: "Chetan Yogbharti", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
        { name: "Sadhana Warrier", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" },
        { name: "Devanshi Agrawal", role: "Associate", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80", linkedin: "#", instagram: "#" }
      ]
    }
  ];

  return (
    // Replaced 'bg-[#050505]' with 'relative' and added WarpBackground
    <section className="relative min-h-screen py-24 px-4 font-sans text-white overflow-hidden">
      
      {/* Background Component */}
      <WarpBackground />

      {/* Content Container with z-10 to sit above background */}
      <div className="relative z-10 container mx-auto max-w-7xl">

        {/* Global Keyframes for Marquee */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              animation: marquee linear infinite;
            }
          `
        }} />

        {/* Page Header */}
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">
            <span className="text-orange-600 drop-shadow-[0_0_15px_rgba(234,88,12,0.4)]">The</span> Squad
          </h2>
          <div className="mt-10 flex justify-center items-center gap-4">
            <div className="h-[1px] w-24 bg-orange-600/50" />
            <div className="h-2 w-2 rounded-full bg-orange-600 animate-ping" />
            <div className="h-[1px] w-24 bg-orange-600/50" />
          </div>
        </div>

        {/* --- SECTION 1: CORE LEADERSHIP (Static/Centered) --- */}
        <div className="mb-40">
           <div className="flex flex-col items-center text-center mb-16">
            <h3 className="text-4xl font-black text-white uppercase tracking-tight relative pb-4">
              Core Leadership
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-600 to-transparent" />
            </h3>
            <p className="mt-6 text-neutral-500 max-w-xl text-xs font-mono uppercase tracking-[0.2em] leading-relaxed">
              Steering the ship.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-10">
            {coreLeadership.map((member, idx) => (
              <TeamCard key={idx} {...member} />
            ))}
          </div>
        </div>

        {/* --- SECTION 2: TEAM HEADS (Marquee) --- */}
        <div className="mb-40">
           <div className="flex flex-col items-center text-center mb-16">
            <h3 className="text-4xl font-black text-white uppercase tracking-tight relative pb-4">
              Team Leaders
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-600 to-transparent" />
            </h3>
            <p className="mt-6 text-neutral-500 max-w-xl text-xs font-mono uppercase tracking-[0.2em] leading-relaxed">
              Orchestrating excellence across all domains.
            </p>
          </div>

          <Marquee speed={35}>
            {teamHeads.map((member, idx) => (
              <TeamCard key={idx} {...member} />
            ))}
          </Marquee>
        </div>

        {/* --- SECTION 3: DEPARTMENTS (Marquee) --- */}
        <div className="flex flex-col gap-40">
          {departments.map((dept, idx) => (
            <div key={idx} className="w-full">

              <div className="flex flex-col items-center text-center mb-16">
                <h3 className="text-4xl font-black text-white uppercase tracking-tight relative pb-4">
                  {dept.title}
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-600 to-transparent" />
                </h3>
                <p className="mt-6 text-neutral-500 max-w-xl text-xs font-mono uppercase tracking-[0.2em] leading-relaxed">
                  {dept.description}
                </p>
              </div>

              {/* Marquee Wrapper */}
              <Marquee speed={40 + (idx * 5)}>
                {dept.members.map((member, mIdx) => (
                  <TeamCard key={mIdx} {...member} />
                ))}
              </Marquee>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;   