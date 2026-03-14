/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#1B2A41',
        secondary: '#F7F9F9',
        accent: '#2E8B57',
        gold: '#2E8B57',
        indigo: {
          300: '#2E8B57',
          400: '#1B2A41',
          500: '#1B2A41',
          600: '#719c67',
        },
        purple: {
          300: '#2E8B57',
          400: '#1B2A41',
          500: '#1B2A41',
          600: '#719c67',
        },
        slate: {
          50: '#1E1E1E',
          300: '#4B5563',
          400: '#4B5563',
          500: '#1B2A41',
          700: '#F7F9F9',
          800: '#F7F9F9',
          900: '#F7F9F9',
        },
        emerald: {
          300: '#2E8B57',
          400: '#2E8B57',
          500: '#2E8B57',
          600: '#2E8B57',
        },
        amber: {
          300: '#2E8B57',
          400: '#2E8B57',
          500: '#2E8B57',
        },
        cyan: {
          300: '#1B2A41',
          400: '#1B2A41',
          500: '#1B2A41',
        },
        blue: {
          400: '#1B2A41',
          500: '#1B2A41',
          600: '#719c67',
        }
      }
    },
  },
  plugins: [],
}
