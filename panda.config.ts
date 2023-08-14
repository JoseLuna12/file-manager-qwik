import { defineConfig } from "@pandacss/dev";
import { colors, semanticColors } from "~/pandaTokens/colors";
import { fontSizes, fontWeights, textStyles } from "~/pandaTokens/fonts";
import { semanticShadows, shadows } from "~/pandaTokens/shadows";
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
      "[data-image-view]": {
        borderRadius: "10px",
        position: "relative",
        w: "190px",
        h: "130px",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundColor: "child_bg",
        backgroundRepeat: "no-repeat",
        transition: "background-image 1s",
      },
      "[data-img-selected]": {
        boxShadow: "{shadows.light}",
      },
      "[data-img-selected]::before": {
        position: "absolute",
        top: "-5px",
        right: "-5px",
        w: "25px",
        h: "25px",
        backgroundImage: "imageSelectedSuccess",
        content: "' '",
      },
    },
  },
  conditions: {
    light: "[data-color-mode=light] &",
    dark: "[data-color-mode=dark] &",
    navLinkActive: "[data-activated] &",
  },
  theme: {
    tokens: {
      assets: {
        imageSelectedSuccess: {
          type: "url",
          value: "url('/svg/image-select-success.svg')",
        },
      },
      shadows: shadows,
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
      shadows: semanticShadows,
    },
  },
  // The output directory for your css system
  outdir: "src/styled-system",
});
