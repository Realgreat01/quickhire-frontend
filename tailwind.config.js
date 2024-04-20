/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#066ff9',
          50: '#f2fbff',
          100: '#e6f7ff',
          200: '#c2eaff',
          300: '#9ad5fc',
          400: '#4ea8fc',
          500: '#066ff9',
          600: '#0460e0',
          700: '#0249ba',
          800: '#023696',
          900: '#012470',
          950: '#011547',
        },

        dark: {
          DEFAULT: '#1e1e1e',
          50: '#f5f5f5',
          100: '#e8e8e8',
          200: '#c7c7c7',
          300: '#a6a6a6',
          400: '#616161',
          500: '#1e1e1e',
          600: '#1c1919',
          700: '#171111',
          800: '#120b0b',
          900: '#0d0606',
          950: '#080202',
        },
      },
    },
  },
  plugins: [],
};
