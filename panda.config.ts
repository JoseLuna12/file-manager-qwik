import { defineConfig } from "@pandacss/dev";
import { colors, semanticColors } from "~/pandaTokens/colors";
import { fontSizes, fontWeights, textStyles } from "~/pandaTokens/fonts";
import { radii, sematincSpacings, spacings } from "~/pandaTokens/spacings";

export default defineConfig({
  jsxFramework: "qwik",

  // Whether to use css reset
  preflight: true,
  watch: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],
  globalCss: {
    body: {
      fontFamily: "outfit",
    },
  },

  // Useful for theme customization
  theme: {
    tokens: {
      colors: colors,
      fontSizes: fontSizes,
      fontWeights: fontWeights,
      spacing: spacings,
      radii: radii,
    },
    textStyles: textStyles,
    semanticTokens: {
      colors: semanticColors,
      spacing: sematincSpacings,
    },
  },
  // The output directory for your css system
  outdir: "src/styled-system",
});
