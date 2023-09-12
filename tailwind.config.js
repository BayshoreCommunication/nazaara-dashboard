/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "false",
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#F7F7FC',
        secondary: '#820000',
        'secondary-hover': '#5e0707',
        warning: '#D4AF37',
        info: '#50A4DC',
        basic: '#ffffff',
      },
    },
  },
  plugins: [require('daisyui')],
}
