import { ThemeContext, ThemeContextValue } from "@/context";
import { use } from "react";

export function useTheme(): ThemeContextValue {
  const context = use(ThemeContext);

  if (!context) throw new Error("useTheme must be used within ThemeProvider");

  return context;
}
