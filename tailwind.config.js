/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  variants: {
    fill: ['hover', 'focus'],
    visibility: ['group-hover', 'first'],
    display: ['first'],
  },
  plugins: [],
  darkMode: 'class',
};
