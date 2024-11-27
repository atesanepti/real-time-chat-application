/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        dark: "#141416",
        "dark-primary": "#1C1D22",
        "dark-surface": "#26272D",
        "green-soft": "#BDD2B6",
        "green-hard": "#A2CA71",
        "green-deep": "#36383A",
        "gray-deep": "#37393B",
        "gray-light": "#A4A5A7",
      },
    },
  },
  plugins: [],
};
