import { TAccentColors } from "./types";

export const accentColors: TAccentColors = {
  primary: "#1DA1F2",
  secondary: "#177fc0",
  white: "#FFFFFF",
  black: "#000000",
};

export const colors = {
  light: {
    primary: accentColors.primary,
    secondary: accentColors.secondary,
    white: accentColors.white,
    black: accentColors.black,
    background: "#F7F8FB",
    item: "#FFFFFF",
    textPrimary: "#0F172A",
    textSecondary: "#64748B",
    border: "#E5E7EB",
    shadow: "rgba(15,23,42,0.08)",
  },
  dark: {
    primary: accentColors.primary,
    secondary: accentColors.secondary,
    white: accentColors.white,
    black: accentColors.black,
    background: "#0B1220",
    item: "#0F172A",
    textPrimary: "#E5E7EB",
    textSecondary: "#9AA7BF",
    border: "#1E293B",
    shadow: "rgba(0,0,0,0.6)",
  },
};
