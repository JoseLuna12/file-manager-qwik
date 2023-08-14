import { cva } from "~/styled-system/css";

export const buttonR = cva({
  base: {
    px: "px",
    py: "py",
    borderRadius: "sm",
    minW: "100px",
    transition: "ease-in, 0.3s",
    cursor: "pointer",
    _disabled: {
      cursor: "not-allowed",
      pointerEvents: "none",
    },
  },
  variants: {
    colors: {
      text: {
        background: "none",
        color: "text",
        borderWidth: "0px",
        _hover: {
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "text",
        },
      },
      outline: {
        borderWidth: "1px",
        borderColor: "normal",
        color: "normal",
        _hover: {
          "&:not([disabled])": {
            borderColor: "primary.400",
            color: "primary.400",
          },
        },
        _active: {
          "&:not([disabled])": {
            borderColor: "primary.300",
            color: "primary.300",
          },
        },
        _disabled: {
          borderColor: "gray",
          color: "primary.gray",
        },
      },
      primary: {
        background: "normal",
        color: "primary.100",
        _hover: {
          "&:not([disabled])": {
            bg: "primary.400",
          },
        },
        _active: {
          "&:not([disabled])": { bg: "primary.300" },
        },
        _disabled: {
          bg: "gray",
        },
      },
      danger: {
        background: "danger",
        color: "red.100",
        _hover: {
          "&:not([disabled])": { bg: "red.600" },
        },
        _active: {
          "&:not([disabled])": { bg: "red.400" },
        },
        _disabled: {
          bg: "gray",
        },
      },
      success: {
        background: "success",
        color: "green.100",
        _hover: {
          "&:not([disabled])": { bg: "green.700" },
        },
        _active: {
          "&:not([disabled])": { bg: "green.600" },
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
