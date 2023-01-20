/** @type {import('tailwindcss').Config} */

const chroma = require('chroma-js');
const R = require('ramda');

const colors = {
  base: '#a3bbad',
  primary: "#0e3b43",
  secondary: "#357266",

  light: "#FFFFFF",
  dark: "#000000"
}

const colorModifier = {
  light: 1,
  dark: 1
}

const toLight = (color) => chroma(color).brighten(colorModifier.light).hex()
const toDark = (color) => chroma(color).darken(colorModifier.dark).hex()

const getContentColor = (color) => chroma.contrast(color, colors.light) > 4.5 ? colors.light : colors.dark

module.exports = {
  content: ["./src/**/*.{html,tsx,jsx,ts,js}"],
  theme: {
    extend: {
      colors: {
        ...Object.keys(colors).reduce((acc, color) => {
          const currentColor = R.prop(color, colors);

          return R.compose(
            R.assoc(color, currentColor),
            R.assoc(`${color}-focus`, toLight(currentColor)),
            R.assoc(`${color}-lighten`, toLight(currentColor)),
            R.assoc(`${color}-darken`, toDark(currentColor)),
            R.assoc(`${color}-content`, getContentColor(currentColor)),
          )(acc)
        }, {}),
      }
    },
  },
  plugins: [require("daisyui")],
}