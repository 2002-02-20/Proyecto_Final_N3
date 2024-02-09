/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'base-color': '#1E213A',
        'background': '#100E1D',
        'blue-strong': '#3C47E9',
        'gray-sprite': '#E7E7EB',
        'gray-basic': '#A09FB1',
        'gray-down': '#6E707A',
        'yellow-figma': '#FFEC65'
      }
    },
    fontFamily: {
      sans: ['Raleway', 'sans-serif']
    }
  },
  plugins: [],
}