/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        theme: "#27ac1f",
        primary: "#12181e",
        temporary: "#85fe78",
        medium: "#fff",

        background: "#fbfbfb",
      },
      fontFamily: {
        merri: ["Merriweather", "serif"],
        comf: ["Comfortaa", "cursive"],
        right: ["Righteous", "cursive"],
      },
    },
  },
  plugins: [],
};
