const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './assets/**/*.{json,html}',
  ],
  theme: {
    extend: {
      colors: {
      }
    }
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        body: {
          'font-family': 'Roboto',
        },
      })
    })
  ],
};
