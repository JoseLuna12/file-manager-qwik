import { defineTokens, defineSemanticTokens } from "@pandacss/dev";

export const colors = defineTokens.colors({
  primary: {
    100: { value: "#E3EAFC" },
    200: { value: "#A4BAF3" },
    300: { value: "#759BF5" },
    400: { value: "#487DFB" },
    500: { value: "#1057FF" },
    600: { value: "#2057D7" },
    700: { value: "#2851B1" },
    800: { value: "#153582" },
    900: { value: "#060E23" },
  },
  green: {
    100: { value: "#EAF8DA" },
    200: { value: "#CBF29D" },
    300: { value: "#B8F26E" },
    400: { value: "#A5FD36" },
    500: { value: "#96FF10" },
    600: { value: "#87DA1E" },
    700: { value: "#65A316" },
    800: { value: "#4A7812" },
    900: { value: "#1D3006" },
  },
  red: {
    100: { value: "#F9CFCC" },
    200: { value: "#F8AFAA" },
    300: { value: "#F58E87" },
    400: { value: "#F5473C" },
    500: { value: "#FF1E10" },
    600: { value: "#D62317" },
    700: { value: "#971D15" },
    800: { value: "#7B1F21" },
    900: { value: "#490B07" },
  },
  yellow: {
    100: { value: "#FDF0C1" },
    200: { value: "#EEDB96" },
    300: { value: "#EFD476" },
    400: { value: "#EFC739" },
    500: { value: "#FFCA10" },
    600: { value: "#DEBB1B" },
    700: { value: "#A18711" },
    800: { value: "#857118" },
    900: { value: "#5F4C09" },
  },
  blue: {
    100: { value: "#D4F1FD" },
    200: { value: "#A0D6ED" },
    300: { value: "#73CDF3" },
    400: { value: "#33B9F1" },
    500: { value: "#10B7FF" },
    600: { value: "#1498CF" },
    700: { value: "#1E769B" },
    800: { value: "#245A72" },
    900: { value: "#053144" },
  },
  neutral: {
    white: { value: "#FEFEFF" },
    gray: { value: "#DCDCE1" },
    darkgray: { value: "#494951" },
    black: { value: "#11111C" },
  },
  white: { value: "#FFFEFF" },
  light: { value: "#F5F5FA" },
  gray: { value: "#3F3F47" },
  dark: { value: "#040415" },
});

export const semanticColors = defineSemanticTokens.colors({
  normal: {
    value: { base: "{colors.primary.500}", _dark: "{colors.green.500}" },
  },
  success: {
    value: { base: "{colors.green.600}", _dark: "{colors.green.500}" },
  },
  danger: {
    value: { base: "{colors.red.500}", _dark: "{colors.green.400}" },
  },
  bg: {
    value: { base: "{colors.light}", _dark: "{colors.dark}" },
  },
  child_bg: {
    value: { base: "{colors.primary.100}", _dark: "{colors.primary.800}" },
  },
  complement: {
    value: { base: "{colors.white}", _dark: "{colors.gray}" },
  },
  text: {
    value: { base: "{colors.neutral.black}", _dark: "{colors.neutral.white}" },
  },
});
