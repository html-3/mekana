/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: { primary: '#FB923C', secondary: '#FACC15', alt: '#1C1917', main: '#F5F5F4' },
      fontFamily: {
        bebas: ['Bebas\\ Neue', 'sans-serif'],
        electrolize: ['Electrolize', 'sans-serif'],
        roboto: ['Roboto\\ Condensed', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
