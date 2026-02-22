import { colors } from "./colors";
import { TTheme } from "./types";

export * from "./types";

export const lightTheme: TTheme = {
  variant: "light",
  colors: colors["light"],
};

export const darkTheme: TTheme = {
  variant: "dark",
  colors: colors["dark"],
};

export const theme = {
  light: lightTheme,
  dark: darkTheme,
};
