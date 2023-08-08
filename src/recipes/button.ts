import { cva } from "~/styled-system/css";

export const buttonR = cva({
  base: {
    px: "px",
    py: "py",
    borderRadius: "sm",
    minW: "100px",
    transition: "ease-in, 0.3s",
  },
  variants: {
    colors: {
      primary: {
        background: "normal",
        color: "primary.100",
        _hover: {
          bg: "primary.600",
        },
        _active: {
          bg: "primary.400",
        },
        _disabled: {
          bg: "gray",
        },
      },
      danger: {
        background: "danger",
        color: "red.100",
        _hover: {
          bg: "red.600",
        },
        _active: {
          bg: "red.400",
        },
        _disabled: {
          bg: "gray",
        },
      },
      success: {
        background: "success",
        color: "green.100",
        _hover: {
          bg: "green.700",
        },
        _active: {
          bg: "green.600",
        },
        _disabled: {
          bg: "gray",
        },
      },
    },
  },
  defaultVariants: {
    colors: "primary",
  },
});
