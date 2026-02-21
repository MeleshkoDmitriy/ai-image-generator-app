import { TThemeVariant } from "@/types";

export type TThemeColors = {
  background: string;
  text: string;
  primary: string;
};

export type TTheme = {
  variant: TThemeVariant;
  colors: TThemeColors;
  // sizes: ,
  // spacings: ,
  // typography: ,
};
