const { config } = require("tailwind-config-custom");

module.exports = {
  ...config,
  theme: {
    extend: {
      fontFamily: {
        thin: "Inter_100Thin",
        extralight: "Inter_200ExtraLight",
        light: "Inter_300Light",
        regular: "Inter_400Regular",
        medium: "Inter_500Medium",
        semibold: "Inter_600SemiBold",
        bold: "Inter_700Bold",
        extrabold: "Inter_800ExtraBold",
        black: "Inter_900Black",
      },
    },
  },
};
