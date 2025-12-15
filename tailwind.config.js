/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lap: {
          coffee: "#562717", // deep brown
          red:    "#C21717",
          flame:  "#E76219",
          amber:  "#FEA712",
          cream:  "#FDDCA9",
        },
      },
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.15)",
      },
      backgroundImage: {
        "lap-noise":
          "radial-gradient(circle at 20% 10%, rgba(255,255,255,0.06) 0, transparent 40%), radial-gradient(circle at 80% 0%, rgba(0,0,0,0.18) 0, transparent 50%)",
      },
    },
  },
  plugins: [],
};
