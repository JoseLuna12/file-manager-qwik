import { cva } from "~/styled-system/css";
// import { defineRecipe } from "@pandacss/dev";

export const textR = cva({
  base: {
    color: "text",
  },
  variants: {
    size: {
      "2xl": {
        textStyle: "xlHeader",
      },
      xl: {
        textStyle: "header",
      },
      lg: {
        textStyle: "subtitle",
      },
      md: {
        textStyle: "body",
      },
      sm: {
        textStyle: "text",
      },
    },
    weight: {
      bold: {
        fontWeight: "bold",
      },
      regular: {
        fontWeight: "regular",
      },
    },
  },
  defaultVariants: {
    weight: "regular",
    size: "md",
  },
});
