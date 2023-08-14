import { defineTokens, defineSemanticTokens } from "@pandacss/dev";

export const shadows = defineTokens.shadows({
  light: {
    value: [
      {
        color: "{colors.shadowColor}",
        blur: 20,
        offsetX: 0,
        offsetY: 4,
        spread: 0,
      },
    ],
  },
  dark: {
    value: [
      {
        color: "{colors.shadowColor}",
        blur: 20,
        offsetY: 4,
        offsetX: 0,
        spread: 0,
      },
    ],
  },
});

export const semanticShadows = defineSemanticTokens.shadows({
  selectionShadow: {
    value: {
      base: "{shadows.light}",
      _dark: "{shadows.dark}",
    },
  },
});
