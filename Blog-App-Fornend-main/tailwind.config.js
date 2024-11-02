/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // TailwindCSS sınıflarını kullanacağınız dosyalar
  ],
  theme: {
    extend: {
      colors : {
        primary: '#1565d8',
        dark : {
          hard : "#0D2436",
          soft: '#183B56',
          light: '#5A7184'
        },
      },
      fontFamily : {
        opensans : ["'Open Sans'", "sans-serif"],
        roboto : ["'Roboto'", "sans-serif"]
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    base: false, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix : 'd-',
  },
};
