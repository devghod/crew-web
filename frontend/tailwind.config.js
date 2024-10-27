import fluid, { extract } from 'fluid-tailwind';
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    files: ['./src/**/*.{js,jsx,ts,tsx}'],
    extract,
  },
  theme: {
    extend: {},
    fontFamily: {
      satoshi: ['Satoshi', 'sans-serif'],
      inter: ['Inter', 'sans-serif'],
    },
  },
  plugins: [fluid],
};
