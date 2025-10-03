/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
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
