import { colors } from "./colors";
import { TTheme } from "./types";
import { typography } from "./typography";

export * from "./types";

export const lightTheme: TTheme = {
  variant: "light",
  colors: colors["light"],
  typography: typography,
};

export const darkTheme: TTheme = {
  variant: "dark",
  colors: colors["dark"],
  typography: typography,
};

export const theme = {
  light: lightTheme,
  dark: darkTheme,
};
