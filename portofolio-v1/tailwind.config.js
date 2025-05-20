/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lightBg: '#fefae0',
        lightText: '#252422',
        darkBg: '#1a1a2e',
        darkText: '#f0f0f0',
        accent: '#ff6b6b',
        soft: '#eaeaea'
      },
    },
  },
  plugins: [],
};
