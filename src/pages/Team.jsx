import React from 'react';
import { FaLinkedinIn, FaInstagram } from 'react-icons/fa';

/**
 * TeamCard Component
 * Style: Cyber-Industrial Orange HUD
 * Features: React Icons, Geometric Clipping, Scanning Animation
 */
const TeamCard = ({ name, role, image, linkedin, instagram }) => {
  return (
    <div className="group relative h-[420px] w-72 shrink-0 p-4 transition-all duration-500">
      
      {/* 1. Outer Neon Glow Boundary */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-700 opacity-10 blur-md group-hover:opacity-100 group-hover:blur-2xl transition-all duration-700"
        style={{ 
          clipPath: 'polygon(12% 0, 88% 0, 100% 12%, 100% 88%, 88% 100%, 12% 100%, 0 88%, 0 12%)' 
        }}
      />

      {/* 2. Main Tech Frame */}
      <div 
        className="relative h-full w-full overflow-hidden bg-[#0d0d0d] border border-orange-500/20 group-hover:border-orange-500/60 transition-colors duration-500 shadow-2xl"
        style={{ 
          clipPath: 'polygon(12% 0, 88% 0, 100% 12%, 100% 88%, 88% 100%, 12% 100%, 0 88%, 0 12%)' 
        }}
      >
        {/* Scanning Line Animation (Hover Only) */}
        <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100">
            <div className="h-1/2 w-full bg-gradient-to-b from-orange-500/20 to-transparent absolute top-[-50%] animate-[scan_2s_linear_infinite]" />
        </div>

        {/* Profile Avatar Area */}
        <div className="relative z-10 flex flex-col items-center pt-10">
          <div className="relative p-1.5 rounded-full border-2 border-orange-500/30 group-hover:border-orange-500 group-hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] transition-all duration-700">
             <img 
              src={image} 
              alt={name} 
              className="h-28 w-28 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>

        {/* Info & Socials Content */}
        <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col items-center text-center">
          <div className="mb-4 w-12 h-0.5 bg-orange-500/20 group-hover:w-32 group-hover:bg-orange-500 transition-all duration-700" />
          
          <h3 className="text-2xl font-black text-orange-500 uppercase tracking-tighter leading-none transition-all group-hover:scale-110">
            {name}
          </h3> 
          
          <p className="mt-2 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500 group-hover:text-white transition-colors">
            {role}
          </p>

          {/* Social Icons using React Icons */}
          <div className="mt-8 flex gap-4 opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700">
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
        <div className="absolute top-1/2 left-2 -translate-y-1/2 w-[2px] h-16 bg-orange-500 opacity-20 group-hover:opacity-100 group-hover:shadow-[0_0_10px_#f97316] transition-all" />
        <div className="absolute top-1/2 right-2 -translate-y-1/2 w-[2px] h-16 bg-orange-500 opacity-20 group-hover:opacity-100 group-hover:shadow-[0_0_10px_#f97316] transition-all" />
      </div>
      
      {/* Scanline Animation Keyframes (CSS-in-JS or global CSS) */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { top: -50%; }
          100% { top: 100%; }
        }
      `}} />
    </div>
  );
};

/**
 * Main Team Section Component
 */
const TeamSection = () => {
  const departments = [
    {
      title: "Web Development",
      description: "Building robust, scalable digital infrastructures.",
      members: [
        { name: "David Chen", role: "Lead Full Stack", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400", linkedin: "#", instagram: "#" },
        { name: "Sarah Jenkins", role: "Frontend Specialist", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400", linkedin: "#", instagram: "#" }
      ]
    },
    {
      title: "Creative Production",
      description: "Visual storytelling that captures attention.",
      members: [
        { name: "Marcus Cole", role: "Head of Video", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400", linkedin: "#", instagram: "#" },
        { name: "Alex Rivera", role: "Editor & VFX", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400", linkedin: "#", instagram: "#" }
      ]
    },
    {
      title: "Marketing & PR",
      description: "Amplifying our voice across all channels.",
      members: [
        { name: "Elena Rodriguez", role: "Marketing Director", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400", linkedin: "#", instagram: "#" },
        { name: "Jessica Wu", role: "Social Media Mgr", image: "https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?w=400", linkedin: "#", instagram: "#" }
      ]
    },
    {
        title: "Sales & Outreach",
        description: "Connecting solutions with the people who need them.",
        members: [
          { name: "Michael Ross", role: "Head of Sales", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400", linkedin: "#", instagram: "#" },
          { name: "Emily Blunt", role: "Outreach Lead", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400", linkedin: "#", instagram: "#" }
        ]
      }
  ];

  return (
    <section className="min-h-screen bg-[#050505] py-24 px-4 font-sans text-white overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        
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

        {/* Section Mapping */}
        <div className="flex flex-col gap-40">
          {departments.map((dept, idx) => (
            <div key={idx} className="w-full">
              
              <div className="flex flex-col items-center text-center mb-20">
                <h3 className="text-4xl font-black text-white uppercase tracking-tight relative pb-4">
                  {dept.title}
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-600 to-transparent" />
                </h3>
                <p className="mt-6 text-neutral-500 max-w-xl text-xs font-mono uppercase tracking-[0.2em] leading-relaxed">
                  {dept.description}
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-14">
                {dept.members.map((member, mIdx) => (
                  <TeamCard key={mIdx} {...member} />
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;


// import Section from "../components/Section.jsx";
// import { TeamCard } from "../components/Cards.jsx";

// export default function Team() {
//   return (
//     <Section title="Team" subtitle="Volunteers steering the bend.">
//       <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <TeamCard name="Your Name" role="Organizer" />
//         <TeamCard name="Member #2" role="Curation" />
//         <TeamCard name="Member #3" role="Production" />
//         <TeamCard name="Member #4" role="Design" />
//       </div>
//     </Section>
//   );
// }
// import React from 'react';

// // --- Card Component (Unchanged) ---
// const TeamCardEnhanced = ({ name, role, image, linkedin, instagram }) => {
//   return ( 
//     <div className="group relative h-96 w-72 shrink-0 overflow-hidden rounded-2xl bg-neutral-900 shadow-xl transition-all duration-500 hover:shadow-[0_20px_50px_-20px_rgba(235,0,40,0.5)]">
      
//       <div className="h-full w-full"> 
//         <img src={image} 
//           alt={name} 
//           className="h-full w-full object-cover transition-all duration-700 ease-in-out grayscale group-hover:scale-110 group-hover:grayscale-0"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
//       </div>
//       <div className="absolute bottom-0 left-0 w-full translate-y-12 p-6 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:translate-y-0">
//         <div className="absolute inset-0 -z-10 translate-y-full bg-white/10 backdrop-blur-md transition-all duration-500 ease-out group-hover:translate-y-0 rounded-t-2xl border-t border-white/20"></div>
//         <div className="relative z-10">
//           <h3 className="font-sans text-2xl font-bold text-white tracking-tight">
//             {name}
//           </h3> 
//           <span className="mt-1 block font-sans text-xs font-bold uppercase tracking-widest text-[#eb0028] transition-all duration-300 group-hover:text-[#ff1f48] group-hover:drop-shadow-[0_0_8px_rgba(235,0,40,0.8)]">
//             {role}
//           </span>
//         </div> 
//         <div className="mt-5 flex items-center gap-4 opacity-0 transition-all duration-500 ease-out translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 group-hover:delay-200">
//           <a href={linkedin} 
//             target="_blank" rel="noreferrer"  
//             className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#eb0028] hover:shadow-lg"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
//           </a> 
//           <a href={instagram} target="_blank" rel="noreferrer" 
//             className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all duration-300 delay-75 hover:-translate-y-1 hover:bg-[#eb0028] hover:shadow-lg"
//           >
//              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// // --- Main Section ---
// const TeamSectionEnhanced = () => {
    
//     // Categorized Data Structure
//     const departments = [
//       {
//         title: "Web Development",
//         description: "Building robust, scalable digital infrastructures.",
//         members: [
//           {
//             name: "David Chen",
//             role: "Lead Full Stack",
//             image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
//             linkedin: "#", instagram: "#"
//           },
//           {
//             name: "Sarah Jenkins",
//             role: "Frontend Specialist",
//             image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=1061&q=80",
//             linkedin: "#", instagram: "#"
//           }
//         ]
//       },
//       {
//         title: "Creative & Video Production",
//         description: "Visual storytelling that captures attention.",
//         members: [
//           {
//             name: "Marcus Cole",
//             role: "Head of Video",
//             image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80",
//             linkedin: "#", instagram: "#"
//           },
//           {
//             name: "Sophie Turner",
//             role: "Creative Director",
//             image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=928&q=80",
//             linkedin: "#", instagram: "#"
//           },
//           {
//             name: "Alex Rivera",
//             role: "Editor & VFX",
//             image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80",
//             linkedin: "#", instagram: "#"
//           }
//         ]
//       },
//       {
//         title: "Marketing, PR & Social Media",
//         description: "Amplifying your voice across all channels.",
//         members: [
//           {
//             name: "Elena Rodriguez",
//             role: "Marketing Director",
//             image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=776&q=80",
//             linkedin: "#", instagram: "#"
//           },
//           {
//             name: "Jessica Wu",
//             role: "Social Media Mgr",
//             image: "https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1771&q=80",
//             linkedin: "#", instagram: "#"
//           },
//           {
//             name: "Thomas Wright",
//             role: "PR Specialist",
//             image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80",
//             linkedin: "#", instagram: "#"
//           }
//         ]
//       },
//       {
//         title: "Sales & Outreach",
//         description: "Connecting solutions with the people who need them.",
//         members: [
//           {
//             name: "Michael Ross",
//             role: "Head of Sales",
//             image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80",
//             linkedin: "#", instagram: "#"
//           },
//           {
//             name: "Emily Blunt",
//             role: "Outreach Lead",
//             image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
//             linkedin: "#", instagram: "#"
//           }
//         ]
//       }
//     ];

//     return (
//       <section className="bg-[#050505] py-20 px-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900 via-[#050505] to-[#050505]">
//         <div className="container mx-auto">
          
//           {/* Main Page Title */}
//           <div className="mb-20 text-center">
//              <h5 className="text-[#eb0028] font-bold uppercase tracking-widest mb-2">Our Departments</h5>
//             <h2 className="text-4xl md:text-5xl font-bold text-white">
//               Meet The <span className="text-[#eb0028] underline decoration-[#eb0028]/30 underline-offset-8">Squad</span>
//             </h2>
//           </div>
          
//           {/* Mapping through Departments */}
//           <div className="flex flex-col gap-24">
//             {departments.map((dept, index) => (
//               <div key={index} className="w-full">
                
//                 {/* Department Heading - CENTERED */}
//                 <div className="flex flex-col items-center text-center mb-10">
//                   <h3 className="text-3xl font-bold text-white relative inline-block">
//                     {dept.title}
//                     {/* Decorative accent line below the title */}
//                     <span className="absolute -bottom-2 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-[#eb0028]"></span>
//                   </h3>
//                   <p className="mt-4 text-gray-400 max-w-xl text-lg">{dept.description}</p>
//                 </div>

//                 {/* The Row of Cards for this Department - CENTERED */}
//                 <div className="flex flex-wrap justify-center gap-8">
//                   {dept.members.map((member, mIndex) => (
//                     <TeamCardEnhanced key={mIndex} {...member} />
//                   ))}
//                 </div>

//               </div>
//             ))}
//           </div>

//         </div>
//       </section>
//     );
// };

// export default TeamSectionEnhanced;

// import React, { useEffect, useState } from 'react';

// // --- 1. Team Card Component with Shimmer Effect ---
// const TeamCardUltra = ({ name, role, image, linkedin, instagram, delay }) => {
//   // We use the 'delay' prop to stagger the entrance animation
//   return (
//     <div 
//       className="group relative h-96 w-72 rounded-2xl bg-neutral-900 opacity-0 animate-fade-in-up"
//       style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
//     >
//       {/* Animated Border/Glow Container */}
//       <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-b from-[#eb0028]/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-sm" />
      
//       {/* Main Card Container */}
//       <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#0a0a0a] ring-1 ring-white/10">
        
//         {/* Shimmer Effect (The moving shine) */}
//         <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:animate-shimmer" />

//         {/* Image Layer */}
//         <div className="h-full w-full">
//           <img 
//             src={image} 
//             alt={name} 
//             className="h-full w-full object-cover transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] grayscale filter group-hover:scale-110 group-hover:grayscale-0"
//           />
//           {/* Gradient Overlay */}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-60" />
//         </div>

//         {/* Content Layer (Text) */}
//         <div className="absolute bottom-0 left-0 w-full translate-y-10 p-6 transition-transform duration-500 ease-out group-hover:translate-y-0">
          
//           {/* Text Content */}
//           <div className="relative z-10">
//             <h3 className="font-sans text-2xl font-bold text-white tracking-tight drop-shadow-lg">
//               {name}
//             </h3>
//             <span className="mt-1 inline-block border-l-2 border-[#eb0028] pl-2 font-sans text-xs font-bold uppercase tracking-widest text-[#eb0028] transition-all duration-300 group-hover:bg-[#eb0028] group-hover:text-white group-hover:pr-2">
//               {role}
//             </span>
//           </div>

//           {/* Social Icons (Pop up effect) */}
//           <div className="mt-5 flex items-center gap-4 opacity-0 transition-all duration-500 delay-100 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4">
//             <SocialIcon href={linkedin} icon="linkedin" delay="0ms" />
//             <SocialIcon href={instagram} icon="instagram" delay="100ms" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Helper Component for Icons
// const SocialIcon = ({ href, icon, delay }) => (
//   <a 
//     href={href}
//     target="_blank" 
//     rel="noreferrer"
//     style={{ transitionDelay: delay }}
//     className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#eb0028] hover:shadow-[0_0_15px_rgba(235,0,40,0.6)]"
//   >
//     {icon === 'linkedin' ? (
//       <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
//     ) : (
//       <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
//     )}
//   </a>
// );

// // --- 2. Main Section with Background Animation ---
// const TeamSectionAnimated = () => {
//   const teamMembers = [
//     { name: "Aarav Patel", role: "Organizer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
//     { name: "Sarah Chen", role: "Curator", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
//     { name: "Rohan Kumar", role: "Tech Lead", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
//     { name: "Maya Singh", role: "Design Head", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" }
//   ];

//   return (
//     <>
//       {/* Inline Styles for Custom Animations */}
//       <style>{`
//         @keyframes fadeInUp {
//           from { opacity: 0; transform: translateY(40px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes shimmer {
//           100% { transform: translateX(100%); }
//         }
//         @keyframes rotateSlow {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//         .animate-fade-in-up {
//           animation-name: fadeInUp;
//           animation-duration: 0.8s;
//           animation-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
//         }
//         .animate-shimmer {
//           animation: shimmer 1.5s infinite;
//         }
//         .animate-rotate-slow {
//           animation: rotateSlow 20s linear infinite;
//         }
//       `}</style>

//       <section className="relative min-h-screen w-full overflow-hidden bg-black py-20 px-4">
        
//         {/* --- DYNAMIC BACKGROUND --- */}
//         {/* Giant Red X - Top Right */}
//         <div className="pointer-events-none absolute -top-20 -right-20 opacity-10">
//            <svg className="h-[500px] w-[500px] text-[#eb0028] animate-rotate-slow" viewBox="0 0 100 100" fill="currentColor">
//              <rect x="45" y="0" width="10" height="100" rx="2" />
//              <rect x="0" y="45" width="100" height="10" rx="2" />
//            </svg>
//         </div>

//         {/* Giant White X - Bottom Left */}
//         <div className="pointer-events-none absolute -bottom-20 -left-20 opacity-5">
//            <svg className="h-[400px] w-[400px] text-white animate-rotate-slow" style={{animationDirection: 'reverse', animationDuration: '30s'}} viewBox="0 0 100 100" fill="currentColor">
//              <rect x="45" y="0" width="10" height="100" rx="2" />
//              <rect x="0" y="45" width="100" height="10" rx="2" />
//            </svg>
//         </div>

//         <div className="container mx-auto relative z-10">
//           {/* Header Text */}
//           <div className="mb-20 text-center animate-fade-in-up">
//             <h5 className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#eb0028]">
//               Behind the Scenes
//             </h5>
//             <h2 className="text-5xl font-extrabold text-white md:text-6xl tracking-tight">
//               Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Team</span>
//             </h2>
//             <div className="mx-auto mt-4 h-1 w-20 rounded bg-[#eb0028]"></div>
//           </div>
          
//           {/* Cards Grid */}
//           <div className="flex flex-wrap justify-center gap-8 md:gap-12">
//             {teamMembers.map((member, index) => (
//               <TeamCardUltra 
//                 key={index} 
//                 {...member} 
//                 delay={index * 150} // 150ms delay between each card
//               />
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default TeamSectionAnimated;

// import React from 'react';

// const TeamCardArchitectural = ({ name, role, image, linkedin, instagram }) => {
//   return (
//     // MAIN CONTAINER
//     // Removed rounded corners for a sharper, more architectural look.
//     // Added a subtle border that turns red on hover.
//     <div className="group relative h-[420px] w-72 bg-black overflow-hidden border border-neutral-800 transition-all duration-500 hover:border-[#eb0028]">
      
//       {/* --- IMAGE LAYER --- */}
//       <div className="h-full w-full overflow-hidden">
//         {/* ANIMATION KEY: group-hover:scale-95
//            On hover, the image shrinks slightly. This creates depth, 
//            as if pushing the image "back" into the card.
//         */}
//         <img 
//           src={image} 
//           alt={name} 
//           className="h-full w-full object-cover transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] grayscale group-hover:scale-95 group-hover:brightness-75 group-hover:grayscale-0"
//         />
//       </div>

//       {/* --- CONTENT OVERLAY --- */}
//       {/* A strong gradient at the bottom to ensure text readability */}
//       <div className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />

//       {/* --- TEXT CONTENT --- */}
//       <div className="absolute bottom-0 left-0 w-full p-6">
//         <div className="relative flex items-start">
          
//           {/* RED ACCENT LINE */}
//           {/* A vertical bar that grows in height on hover */}
//           <div className="mr-4 h-0 w-1 bg-[#eb0028] transition-all duration-500 ease-out group-hover:h-16"></div>
          
//           <div>
//             {/* NAME - Always visible */}
//             <h3 className="font-sans text-2xl font-bold uppercase leading-none text-white tracking-tight mb-1">
//               {name.split(' ')[0]} <br/> {/* Splitting name for stacked look */}
//               <span className="text-neutral-400 group-hover:text-white transition-colors">{name.split(' ')[1]}</span>
//             </h3>

//             {/* ROLE & SOCIALS CONTAINER - Reveals on hover */}
//             {/* We use overflow-hidden on this container to mask the entrance animation */}
//             <div className="overflow-hidden h-0 transition-all duration-500 group-hover:h-20">
//                  {/* ROLE */}
//                 <span className="block font-sans text-sm font-bold uppercase tracking-widest text-[#eb0028] opacity-0 translate-y-4 transition-all duration-500 delay-100 group-hover:opacity-100 group-hover:translate-y-0">
//                   {role}
//                 </span>

//                 {/* SOCIAL ICONS */}
//                 <div className="mt-3 flex gap-4 opacity-0 translate-y-4 transition-all duration-500 delay-200 group-hover:opacity-100 group-hover:translate-y-0">
//                   <SocialLink href={linkedin}>LINKEDIN</SocialLink>
//                   <span className="text-neutral-600">/</span>
//                   <SocialLink href={instagram}>INSTAGRAM</SocialLink>
//                 </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Minimalist text-based social link instead of icons for this style
// const SocialLink = ({ href, children }) => (
//   <a 
//     href={href} 
//     target="_blank" 
//     rel="noreferrer"
//     className="text-xs font-bold text-neutral-400 hover:text-white transition-colors tracking-widest relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-[#eb0028] after:transition-all hover:after:w-full"
//   >
//     {children}
//   </a>
// );


// // --- Example Usage Section ---
// const TeamSectionArchitectural = () => {
//   const teamMembers = [
//     {
//       name: "Aarav Patel",
//       role: "Lead Organizer",
//       // Using clearer portraits for this style
//       image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80",
//       linkedin: "#",
//       instagram: "#"
//     },
//     {
//       name: "Sarah Chen",
//       role: "Curator",
//       image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=764&q=80",
//       linkedin: "#",
//       instagram: "#"
//     },
//     {
//       name: "Marcus Reid",
//       role: "Production",
//       image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80",
//       linkedin: "#",
//       instagram: "#"
//     }
//   ];

//   return (
//     <section className="min-h-screen bg-[#111111] py-24 px-4">
//       <div className="container mx-auto">
//         <div className="mb-16 border-b border-neutral-800 pb-4">
//             <h2 className="text-4xl font-black text-white uppercase tracking-tighter">
//                 Core <span className="text-[#eb0028]">Team</span>.
//             </h2>
//         </div>
        
//         {/* Flex container for the grid */}
//         <div className="flex flex-wrap justify-center gap-6">
//           {teamMembers.map((member, index) => (
//             <TeamCardArchitectural key={index} {...member} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TeamSectionArchitectural;

// import React from 'react';

// const TeamCardArchitectural = ({ name, role, image, linkedin, instagram }) => {
//   return (
//     // MAIN CONTAINER
//     // Removed rounded corners for a sharper, more architectural look.
//     // Added a subtle border that turns red on hover.
//     <div className="group relative h-[420px] w-72 bg-black overflow-hidden border border-neutral-800 transition-all duration-500 hover:border-[#eb0028]">
      
//       {/* --- IMAGE LAYER --- */}
//       <div className="h-full w-full overflow-hidden">
//         {/* ANIMATION KEY: group-hover:scale-95
//            On hover, the image shrinks slightly. This creates depth, 
//            as if pushing the image "back" into the card.
//         */}
//         <img 
//           src={image} 
//           alt={name} 
//           className="h-full w-full object-cover transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] grayscale group-hover:scale-95 group-hover:brightness-75 group-hover:grayscale-0"
//         />
//       </div>

//       {/* --- CONTENT OVERLAY --- */}
//       {/* A strong gradient at the bottom to ensure text readability */}
//       <div className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />

//       {/* --- TEXT CONTENT --- */}
//       <div className="absolute bottom-0 left-0 w-full p-6">
//         <div className="relative flex items-start">
          
//           {/* RED ACCENT LINE */}
//           {/* A vertical bar that grows in height on hover */}
//           <div className="mr-4 h-0 w-1 bg-[#eb0028] transition-all duration-500 ease-out group-hover:h-16"></div>
          
//           <div>
//             {/* NAME - Always visible */}
//             <h3 className="font-sans text-2xl font-bold uppercase leading-none text-white tracking-tight mb-1">
//               {name.split(' ')[0]} <br/> {/* Splitting name for stacked look */}
//               <span className="text-neutral-400 group-hover:text-white transition-colors">{name.split(' ')[1]}</span>
//             </h3>

//             {/* ROLE & SOCIALS CONTAINER - Reveals on hover */}
//             {/* We use overflow-hidden on this container to mask the entrance animation */}
//             <div className="overflow-hidden h-0 transition-all duration-500 group-hover:h-20">
//                  {/* ROLE */}
//                 <span className="block font-sans text-sm font-bold uppercase tracking-widest text-[#eb0028] opacity-0 translate-y-4 transition-all duration-500 delay-100 group-hover:opacity-100 group-hover:translate-y-0">
//                   {role}
//                 </span>

//                 {/* SOCIAL ICONS */}
//                 <div className="mt-3 flex gap-4 opacity-0 translate-y-4 transition-all duration-500 delay-200 group-hover:opacity-100 group-hover:translate-y-0">
//                   <SocialLink href={linkedin}>LINKEDIN</SocialLink>
//                   <span className="text-neutral-600">/</span>
//                   <SocialLink href={instagram}>INSTAGRAM</SocialLink>
//                 </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Minimalist text-based social link instead of icons for this style
// const SocialLink = ({ href, children }) => (
//   <a 
//     href={href} 
//     target="_blank" 
//     rel="noreferrer"
//     className="text-xs font-bold text-neutral-400 hover:text-white transition-colors tracking-widest relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-[#eb0028] after:transition-all hover:after:w-full"
//   >
//     {children}
//   </a>
// );


// // --- Example Usage Section ---
// const TeamSectionArchitectural = () => {
//   const teamMembers = [
//     {
//       name: "Aarav Patel",
//       role: "Lead Organizer",
//       // Using clearer portraits for this style
//       image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80",
//       linkedin: "#",
//       instagram: "#"
//     },
//     {
//       name: "Sarah Chen",
//       role: "Curator",
//       image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=764&q=80",
//       linkedin: "#",
//       instagram: "#"
//     },
//     {
//       name: "Marcus Reid",
//       role: "Production",
//       image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80",
//       linkedin: "#",
//       instagram: "#"
//     }
//   ];

//   return (
//     <section className="min-h-screen bg-[#111111] py-24 px-4">
//       <div className="container mx-auto">
//         <div className="mb-16 border-b border-neutral-800 pb-4">
//             <h2 className="text-4xl font-black text-white uppercase tracking-tighter">
//                 Core <span className="text-[#eb0028]">Team</span>.
//             </h2>
//         </div>
        
//         {/* Flex container for the grid */}
//         <div className="flex flex-wrap justify-center gap-6">
//           {teamMembers.map((member, index) => (
//             <TeamCardArchitectural key={index} {...member} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TeamSectionArchitectural;