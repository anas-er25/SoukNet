/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-200": "#F18C31", // Orange clair
        "primary-100": "#FFB84D", // Jaune doré plus doux
        "secondary-200": "#21B1B5", // Teal
        "secondary-100": "#63D5D9", // Teal clair
      },
      spacing: {
        12: "3rem",
      },
    },
  },
  plugins: [],
};
