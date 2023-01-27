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
        popoverShow: {
          from: {
            opacity: 0,
            transform: "scale(0.96)",
          },
          to: {
            opacity: 1,
            transform: "scale(1)",
          },
        },
        hide: {
          from: {
            opacity: 1,
          },
          to: {
            opacity: 0,
          },
        },
        slideIn: {
          from: {
            transform: "translateX(calc(100% + 1.5rem))",
          },
          to: {
            transform: "translateX(0)",
          },
        },
        swipeOut: {
          from: {
            transform: "translateX(var(--radix-toast-swipe-end-x))",
          },
          to: {
            transform: "translateX(calc(100% + 1.5rem))",
          },
        },
      },
      animation: {
        overlayShow: "overlayShow 150ms ease",
        contentShow: "contentShow 150ms ease",
        popoverShow: "popoverShow 150ms ease",
        hide: "hide 100ms ease-in",
        slideIn: "slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        swipeOut: "swipeOut 100ms ease-out",
      },
    },
  },
  plugins: [],
};
