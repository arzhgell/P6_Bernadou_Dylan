/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        primary: '#911C1C',
        secondary: '#D3573C',
        tertiary: '#DB8876',
        darkGray: '#525252',
        gray: '#757575',
        lightGray: '#FAFAFA',
      },
      fontSize: {
        sm: '9px',
        base: '10px',
        lg: '13px',
        xl: '18px',
        '2xl': '24px',
        '3xl': '36px',
        '4xl': '64px',
      },
    },
  },
  plugins: [],
};
