/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5ACCCC',
        secondary: '#F76434',
      },
      fontFamily: {
        mulish: ['Mulish', 'sans-serif'],
      },
    },
  },
  plugins: [],
};