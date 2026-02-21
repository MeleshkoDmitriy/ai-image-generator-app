import { ColorSchemeName } from "react-native";

export type TThemeVariant = Exclude<ColorSchemeName, null | undefined>;
// export type TThemeVariant = Extract<ColorSchemeName, "light" | "dark">;
