/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0C056D",   // The blue color you want
        secondary: "#dedcff",
        accent: "#433bff",
        background: "#fbfbfe",
        text: "#050315",
      },
      fontFamily: {
        // Add your custom font here. 
        // If you've loaded Poppins from Google Fonts or similar, it will be recognized here.
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};