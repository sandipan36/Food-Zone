/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    
  ],
  mode: "jit",
  theme: {
    extend: {
      colors:{
        primary: '#00040f',
        secondary: " #00f6ff",
        dimwhite: " rgba(255, 255, 255, 0.7) ",
      },
      fontfamily: {
        poppins: ["poppins", "sans-serif"],
      }
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px"
    },
  },
  plugins: [],
}