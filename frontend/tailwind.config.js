/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'radial-green-tl': 'radial-gradient(circle at top left, rgba(99, 255, 132, 0.5), rgba(0, 0, 0, 0))',
        'radial-green-br': 'radial-gradient(circle at bottom right, rgba(99, 255, 132, 0.5), rgba(0, 0, 0, 0))',
        'dark-green-to-black': 'linear-gradient(to bottom right, #0c0d0d, #000000)',

      },
    },
  },
  plugins: [],
}

