const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or "media" or "class"
  theme: {
    extend: {
      colors: {
        "primary": "#ED1941",
        "secondary": "#EE931C",
        "alternative": "#41B7BB",
        "alternativeDarker": "#41BB86",
        "dark": "#2E2E2E"
      },
    },
    colors: {
      ...colors,
      gray: colors.trueGray,
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
