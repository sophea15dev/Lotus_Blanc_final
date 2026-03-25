/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#ff7043',
          navy: '#1e3a8a',
          slate: '#94a3b8',
        }
      }
    },
  },
  plugins: [],
}