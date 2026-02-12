/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        anton: ["var(--font-anton)", "sans-serif"],
      },
      colors: {
        balak: {
          50: '#f7fbe7',
          100: '#eef8ca',
          200: '#e0f29a',
          300: '#d0eb66',
          400: '#c4e646',
          500: '#bfe23a',
          600: '#a6c92f',
          700: '#86a827',
          800: '#6a8422',
          900: '#586b20',
          950: '#2b3610',
        },
        charcoal: {
          50: '#f5f6f7',
          100: '#e6e7ea',
          200: '#cfd2d7',
          300: '#a9aeb6',
          400: '#7d848e',
          500: '#5a6068',
          600: '#3f444b',
          700: '#2c3036',
          800: '#1f2226',
          900: '#16181b',
          950: '#0f1012',
        },
        'balak-orange': {
          50: '#fef7ed',
          100: '#fdeed5',
          200: '#fbd9aa',
          300: '#f8c174',
          400: '#f4a83c',
          500: '#ECA74B',
          600: '#d8942e',
          700: '#b87725',
          800: '#965c1f',
          900: '#7a4d1b',
          950: '#43280e',
        },
        'balak-red': {
          50: '#fdf2f2',
          100: '#fce2e2',
          200: '#f9caca',
          300: '#f4a5a5',
          400: '#ec7a7a',
          500: '#C37474',
          600: '#b05f5f',
          700: '#924d4d',
          800: '#753f3f',
          900: '#5f3434',
          950: '#341c1c',
        },
      },
      height: {
        '35': '8.75rem', // 140px
        '50': '12.5rem', // 200px
        '70': '17.5rem', // 280px
        '96': '24rem',   // 384px
        '15': '3.75rem', // 60px
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/nesting'),
  ],
}
