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
    size: {
      fill: {
        flex: "1",
      },
      content: {
        flex: "none",
      },
    },
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
    flex: "1",
    "@media (max-width: 572px)": {
      flexDir: "column",
    },
  },
  variants: {
    overflow: {
      auto: {
        overflow: "auto",
      },
    },
    size: {
      fill: {
        flex: "1",
      },
      content: {
        flex: "none",
      },
    },
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

export const imgContainerR = cva({
  base: {
    p: "15px",
    h: "190px",
    w: "225px",
    overflowX: "clip",
    textWrap: "nowrap",
    textOverflow: "ellipsis",
    backgroundColor: "bg",
    borderRadius: "20px",
    transition: "ease-in-out, 0.3s",
    cursor: "pointer",
    borderWidth: "0.7px",
    borderColor: "complement",
    _hover: {
      borderWidth: "0.7px",
      borderColor: "normal",
    },
  },
  variants: {
    shadow: {
      selected: {
        shadow: "selectionShadow",
        borderWidth: "0.7px",
        borderColor: "normal",
      },
      unselected: {
        shadow: "none",
      },
    },
  },
});
