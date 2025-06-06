/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        slowZoom: 'slowZoom 20s ease-in-out infinite',
        fadeInUp: 'fadeInUp 1s ease-out forwards',
        marquee: 'marquee 15s linear infinite', // Added marquee animation
      },
      keyframes: {
        slowZoom: {
          '0%, 100%': { transform: 'scale(1.05)' },
          '50%': { transform: 'scale(1.1)' },
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        marquee: { // Added marquee keyframes
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
  darkMode: 'class',
}
