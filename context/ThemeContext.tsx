import { createContext, ReactNode, useState } from "react";

export interface ThemeContextProps {
  currentTheme: string;
  toggleTheme: (newTheme: string) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  currentTheme: "light",
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme: theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
