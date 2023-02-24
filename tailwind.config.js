/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        primary: '#911C1C',
        secondary: '#D3573C',
        tertiary: '#DB8876',
        gray: '#757575',
      },
      fontSize: {
        sm: '9px',
        base: '10px',
        lg: '13px',
        xl: '36px',
      },
    },
  },
  plugins: [],
};
