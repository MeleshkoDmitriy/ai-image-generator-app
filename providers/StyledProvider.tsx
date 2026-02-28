import { useThemeContext } from "@/hooks";
import { ReactNode } from "react";
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components/native";

interface StyledProviderProps {
  children: ReactNode;
}

export const StyledProvider = ({ children }: StyledProviderProps) => {
  const { theme } = useThemeContext();

  return <StyledComponentsThemeProvider theme={theme}>{children}</StyledComponentsThemeProvider>;
};
