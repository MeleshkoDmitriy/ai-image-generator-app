import { useTheme } from "@/hooks";
import { ReactNode } from "react";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";

interface EmotionProviderProps {
  children: ReactNode;
}

export const EmotionProvider = ({ children }: EmotionProviderProps) => {
  const { theme } = useTheme();

  return <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>;
};
