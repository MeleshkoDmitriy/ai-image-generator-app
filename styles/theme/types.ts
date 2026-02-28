import { TThemeVariant } from "@/types";
import { DefaultTheme } from "styled-components";

export type TAccentColors = {
  primary: string;
  secondary: string;
  white: string;
  black: string;
};

export type TThemeColors = {
  background: string;
  item: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  shadow: string;
} & TAccentColors;

export type TTheme = {
  variant: TThemeVariant;
  colors: TThemeColors;
  // sizes: ,
  // spacings: ,
  // typography: ,
};
