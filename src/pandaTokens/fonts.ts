import { defineTokens, defineTextStyles } from "@pandacss/dev";

export const fontSizes = defineTokens.fontSizes({
  xl: { value: "68px" },
  lg: { value: "42px" },
  md: { value: "26px" },
  body: { value: "16px" },
  sm: { value: "10px" },
});

export const fontWeights = defineTokens.fontWeights({
  regular: { value: "400" },
  bold: { value: "700" },
});

export const textStyles = defineTextStyles({
  xlHeader: {
    value: {
      fontWeight: "700",
      fontSize: "64px",
    },
  },
  header: {
    value: {
      // fontFamily: "Outfit, sans-serif",
      fontWeight: "bold",
      fontSize: "42px",
    },
  },
  subtitle: {
    value: {
      // fontFamily: "Outfit, sans-serif",
      fontWeight: "bold",
      fontSize: "26px",
    },
  },
  body: {
    value: {
      // fontFamily: "Outfit, sans-serif",
      fontWeight: "regular",
      fontSize: "16px",
    },
  },
  text: {
    value: {
      // fontFamily: "Outfit, sans-serif",
      fontWeight: "regular",
      fontSize: "10px",
    },
  },
});
