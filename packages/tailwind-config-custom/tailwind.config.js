const colors = require("tailwindcss/colors");

/** @type {import("tailwindcss").Config} */
const config = {
  content: ["./src/{pages,screens,components}/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      gridTemplateRows: {
        7: "repeat(7, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};

module.exports = {
  colors,
  config,
};
