import { cva } from "~/styled-system/css";

export const columnR = cva({
  base: {
    display: "flex",
    flexDir: "column",
    justifyContent: "center",
    alignItems: "start",
    gap: "1px",
    height: "full",
    width: "full",
  },
  variants: {
    gap: {
      sm: {
        gap: "sm",
      },
      md: {
        gap: "md",
      },
      lg: {
        gap: "lg",
      },
      none: {
        gap: "0px",
      },
    },
    mainAxisAlignment: {
      start: {
        justifyContent: "start",
      },
      center: {
        justifyContent: "center",
      },
      end: {
        justifyContent: "end",
      },
      between: {
        justifyContent: "space-between",
      },
      around: {
        justifyContent: "space-around",
      },
      evenly: {
        justifyContent: "space-evenly",
      },
    },
    crossAxisAligment: {
      start: {
        alignItems: "flex-start",
      },
      center: {
        alignItems: "center",
      },
      end: {
        alignItems: "flex-end",
      },
      stretch: {
        alignItems: "stretch",
      },
      baseline: {
        alignItems: "baseline",
      },
    },
  },
});

export const rowR = cva({
  base: {
    display: "flex",
    flexDir: "row",
    justifyContent: "center",
    alignItems: "start",
    gap: "1px",
  },
  variants: {
    gap: {
      sm: {
        gap: "sm",
      },
      md: {
        gap: "md",
      },
      lg: {
        gap: "lg",
      },
      none: {
        gap: "0px",
      },
    },
    mainAxisAlignment: {
      start: {
        justifyContent: "start",
      },
      center: {
        justifyContent: "center",
      },
      end: {
        justifyContent: "end",
      },
      between: {
        justifyContent: "space-between",
      },
      around: {
        justifyContent: "space-around",
      },
      evenly: {
        justifyContent: "space-evenly",
      },
    },
    crossAxisAligment: {
      start: {
        alignItems: "flex-start",
      },
      center: {
        alignItems: "center",
      },
      end: {
        alignItems: "flex-end",
      },
      stretch: {
        alignItems: "stretch",
      },
      baseline: {
        alignItems: "baseline",
      },
    },
  },
});
