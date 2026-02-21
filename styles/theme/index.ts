// import { colors } from './colors'
import { TTheme } from "./types";
export * from "./types";

// export const theme = { colors };

// primary: '#1DA1F2',
// primaryDark: '#177fc0',

const lightTheme: TTheme = {
  variant: "light",
  colors: {
    background: "#fff",
    text: "#000",
    primary: "blue",
  },
};

const darkTheme: TTheme = {
  variant: "dark",
  colors: {
    background: "#000",
    text: "#fff",
    primary: "red",
  },
};

export const theme = {
  light: lightTheme,
  dark: darkTheme,
};
