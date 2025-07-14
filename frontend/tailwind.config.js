const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
             "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '18': 'repeat(18, minmax(0, 1fr))',
      }
    },
  },
  plugins: [],
};
