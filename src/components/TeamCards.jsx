import React from "react";
const TeamCards = () => {
  const cards = [
    {
      img: "https://images.pexels.com/photos/2746187/pexels-photo-2746187.jpeg",
      name: "Aarav Sharma",
      role: "Creative Designer",
      social: {
        facebook: "https://facebook.com/aarav",
        twitter: "https://twitter.com/aarav",
        instagram: "https://instagram.com/aarav",
      },
    },
    {
      img: "https://images.pexels.com/photos/381843/pexels-photo-381843.jpeg",
      name: "Riya Verma",
      role: "UI Developer",
      social: {
        facebook: "https://facebook.com/riya",
        twitter: "https://twitter.com/riya",
        instagram: "https://instagram.com/riya",
      },
    },
    {
      img: "https://images.pexels.com/photos/139829/pexels-photo-139829.jpeg",
      name: "Kabir Singh",
      role: "Product Designer",
      social: {
        facebook: "https://facebook.com/kabir",
        twitter: "https://twitter.com/kabir",
        instagram: "https://instagram.com/kabir",
      },
    },
    {
      img: "https://images.pexels.com/photos/2746187/pexels-photo-2746187.jpeg",
      name: "Neha Patel",
      role: "Marketing Lead",
      social: {
        facebook: "https://facebook.com/neha",
        twitter: "https://twitter.com/neha",
        instagram: "https://instagram.com/neha",
      },
    },
    {
      img: "https://images.pexels.com/photos/381843/pexels-photo-381843.jpeg",
      name: "Arjun Mehta",
      role: "Frontend Engineer",
      social: {
        facebook: "https://facebook.com/arjun",
        twitter: "https://twitter.com/arjun",
        instagram: "https://instagram.com/arjun",
      },
    },
    {
      img: "https://images.pexels.com/photos/139829/pexels-photo-139829.jpeg",
      name: "Simran Kaur",
      role: "UX Researcher",
      social: {
        facebook: "https://facebook.com/simran",
        twitter: "https://twitter.com/simran",
        instagram: "https://instagram.com/simran",
      },
    },
  ];

  return (
    <div className="mt-5">
      <div className="grid grid-cols-1 gap-5 justify-items-center sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <div
            key={index}
            className="group relative w-[320px] h-[400px] rounded-[22px] overflow-hidden cursor-pointer bg-black shadow-[0_8px_25px_rgba(0,0,0,0.35)]
                       transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                       hover:-translate-y-3 hover:scale-[1.035]
                       hover:shadow-[0_30px_70px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.15)]
                       mb-10"
          >
            {/* IMAGE */}
            <div className="w-full h-full">
              <img
                src={card.img}
                alt={card.name}
                className="w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                           group-hover:scale-110"
              />
            </div>

            {/* GLASS CONTENT */}
            <div
              className="absolute left-0 -bottom-[180px] w-full min-h-[150px] py-[18px] text-white
                         bg-[rgba(255,255,255,0.14)]
                         backdrop-blur-[14px] backdrop-saturate-[120%]
                         transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                         group-hover:bottom-0
                         group-hover:bg-[rgba(255,255,255,0.28)]
                         group-hover:backdrop-blur-[22px]
                         group-hover:backdrop-saturate-[140%]"
            >
              <h4
                className="text-center text-[1.1rem] tracking-[2px]
                           opacity-0 -translate-y-[18px]
                           transition-all duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                           group-hover:opacity-100 group-hover:translate-y-0"
              >
                {card.name}
              </h4>

              <h5
                className="text-center text-[0.85rem] font-light tracking-[1.5px]
                           opacity-0 -translate-y-[18px]
                           transition-all duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                           group-hover:opacity-100 group-hover:translate-y-0"
              >
                {card.role}
              </h5>

              {/* SOCIAL ICONS */}
              <ul className="flex justify-center mt-3">
                {[
                  { icon: "fa-facebook-f", link: card.social.facebook, i: 1 },
                  { icon: "fa-twitter", link: card.social.twitter, i: 2 },
                  { icon: "fa-instagram", link: card.social.instagram, i: 3 },
                ].map((item) => (
                  <li
                    key={item.i}
                    style={{ transitionDelay: `${0.12 * item.i}s` }}
                    className="mx-2 opacity-0 translate-y-[30px] scale-90
                               transition-all duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                               group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100"
                  >
                    <a href={item.link} target="_blank" rel="noreferrer">
                      <span
                        className={`fa-brands ${item.icon} text-[1.3rem]
                                   transition-all duration-300
                                   hover:text-shadow-[0_0_12px_rgba(0,255,120,0.7)]`}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamCards;
