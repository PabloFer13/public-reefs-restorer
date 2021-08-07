module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      textColor: {
        'default-link': '#61dafb',
      },
      backgroundColor: {
        'default-blue': '#282c34',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
      },
      backgroundImage: theme => ({
        'water-gradient': 'linear-gradient(0deg, #182848, #2980b9)',
      }),
    },
    fontFamily: {
      bubble: ['bubble', 'Helvetica', 'Arial', 'sans-serif'],
      pixel: ['pixel', 'Helvetica', 'Arial', 'sans-serif'],
      pixelart: ['Pixel-Art Regular'],
      atarian: ['atarian'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
