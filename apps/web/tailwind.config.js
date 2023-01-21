/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/{pages,screens,components}/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      gridTemplateRows: {
        7: "repeat(7, minmax(0, 1fr))",
      },
      keyframes: {
        overlayShow: {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
        contentShow: {
          from: {
            opacity: 0,
            transform: "translate(-50%, -48%) scale(0.96)",
          },
          to: {
            opacity: 1,
            transform: "translate(-50%, -50%) scale(1)",
          },
        },
      },
      animation: {
        overlayShow: "overlayShow 150ms ease",
        contentShow: "contentShow 150ms ease",
      },
    },
  },
  plugins: [],
};
