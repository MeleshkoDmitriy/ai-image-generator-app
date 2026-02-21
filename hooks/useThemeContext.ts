import { ThemeContext, ThemeContextValue } from "@/context";
import { use } from "react";

export function useThemeContext(): ThemeContextValue {
  const context = use(ThemeContext);

  if (!context) throw new Error("useThemeContext must be used within ThemeProvider");

  return context;
}
