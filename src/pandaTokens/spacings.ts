import { defineSemanticTokens, defineTokens } from "@pandacss/dev";

export const spacings = defineTokens.spacing({
  "2xl": { value: "40px" },
  xl: { value: "30px" },
  lg: { value: "18px" },
  md: { value: "11px" },
  sm: { value: "6px" },
});

export const sematincSpacings = defineSemanticTokens.spacing({
  px: {
    value: "{spacing.lg}",
  },
  py: {
    value: "{spacing.sm}",
  },
  containerPadding: { value: "{spacing.2xl}" },
});

export const radii = defineTokens.radii({
  sm: { value: "12px" },
  md: { value: "25px" },
  xl: { value: "40px" },
});
