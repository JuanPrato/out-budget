/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    "before:bottom-[0%]",
    "before:bottom-[10%]",
    "before:bottom-[20%]",
    "before:bottom-[30%]",
    "before:bottom-[40%]",
    "before:bottom-[50%]",
    "before:bottom-[60%]",
    "before:bottom-[70%]",
    "before:bottom-[80%]",
    "before:bottom-[90%]",
    "before:bottom-[100%]",
    "after:bottom-[0%]",
    "after:bottom-[10%]",
    "after:bottom-[20%]",
    "after:bottom-[30%]",
    "after:bottom-[40%]",
    "after:bottom-[50%]",
    "after:bottom-[60%]",
    "after:bottom-[70%]",
    "after:bottom-[80%]",
    "after:bottom-[90%]",
    "after:bottom-[100%]",
    "bg-good",
    "bg-warning",
    "bg-danger",
    "bg-dead"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'bg-gradient-to-b from-lime-400 to-lime-800',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        good: '#3ae374',
        warning: '#fff200',
        danger: '#ff3838',
        dead: '#3d3d3d',
        glass: 'rgb(184 163 242)',
        borderGlass: 'rgb(169 186 244)',
        glassBack: '#b9a3f3'
      }
    },
  },
  plugins: [],
}
