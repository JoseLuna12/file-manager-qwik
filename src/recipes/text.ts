import { cva } from "~/styled-system/css";
// import { defineRecipe } from "@pandacss/dev";

// export const imageSmallR = cva({
//   base: {
//     position: "relative",
//     w: "180px",
//     h: "120px",
//     backgroundSize: "contain",
//     backgroundPosition: "center",
//     backgroundRepeat: "no-repeat",
//     transition: "background-image 1s",
//     backgroundColor: "child_bg",
//     // transform(value: string) {
//     //   return {
//     //     backgroundImage: `url("${value}")`
//     //   }
//     // }
//   },
// });

export const textR = cva({
  base: {
    color: "text",
  },
  variants: {
    wrap: {
      wrap: {
        textOverflow: "ellipsis",
      },
      nowrap: {
        textWrap: "nowrap",
      },
    },
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
