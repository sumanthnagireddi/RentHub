/** @type {import('tailwindcss').Config} */
// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#4f46e5",
        secondary: "#088395",
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
};
