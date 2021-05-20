const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or "media" or "class"
  theme: {
    extend: {
      colors: {
        "primary": "#ED1941",
        "secondary": "#EE931C",
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
