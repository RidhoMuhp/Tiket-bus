/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#16222A',
        mint: '#DDF5E8',
        coral: '#F46A4E',
        cream: '#F8F7F4',
      },
      boxShadow: { soft: '0 18px 50px rgba(22, 34, 42, .08)' },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
