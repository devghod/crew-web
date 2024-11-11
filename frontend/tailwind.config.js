import fluid, { extract } from 'fluid-tailwind';
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: {
    files: ['./src/**/*.{js,jsx,ts,tsx}'],
    extract,
  },
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
    fontFamily: {
      satoshi: ['Satoshi', 'sans-serif'],
      inter: ['Inter', 'sans-serif'],
    },
  },
  plugins: [fluid],
};
