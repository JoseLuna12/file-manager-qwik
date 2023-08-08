import { cva } from "~/styled-system/css";
// { background: "light", px: "10px", py: "py", rounded: "sm" }

export const inputR = cva({
  base: {
    background: "light",
    px: "10px",
    py: "py",
    rounded: "sm",
    _placeholder: { color: "neutral.gray" },
  },
});
