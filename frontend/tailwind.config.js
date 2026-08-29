/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest:  '#163A2A',
        sage:    '#4F8A5B',
        amber:   '#E8A83E',
        cream:   '#F7F5EF',
        ink:     '#1D2520',
        stone:   '#7A8078',
        surface: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.03em',
        tight:   '-0.015em',
      },
    },
  },
  plugins: [],
}
