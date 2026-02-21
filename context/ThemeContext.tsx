import { EnumStorageKeys, Storage, TThemeObject } from "@/lib";
import { theme, TTheme } from "@/styles";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

export interface ThemeContextValue {
  theme: TTheme;
  currentTheme: TThemeObject["mode"];
  statusBarTheme: TThemeObject["mode"];
  toggleTheme: (newTheme: TThemeObject["mode"]) => void;
  useSystemTheme: () => void;
  isSystemTheme: boolean;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: theme["light"],
  currentTheme: "light",
  statusBarTheme: "dark",
  isSystemTheme: false,
  toggleTheme: () => {},
  useSystemTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [currentTheme, setCurrentTheme] = useState<TThemeObject["mode"]>("light");
  const [systemTheme, setSystemTheme] = useState<TThemeObject["system"]>(false);
  const colorScheme = useColorScheme();
  const statusBarTheme = currentTheme === "dark" ? "light" : "dark";
  const themeObject = theme[currentTheme];

  const persistUpdatedTheme = async (
    mode: TThemeObject["mode"],
    system: TThemeObject["system"]
  ) => {
    const themeObject = {
      mode,
      system,
    };

    setCurrentTheme(mode);
    setSystemTheme(system);
    await Storage.setStorageItem(EnumStorageKeys.THEME, themeObject);
  };

  useEffect(() => {
    const getTheme = async () => {
      try {
        const savedThemeObject = await Storage.getStorageItem(EnumStorageKeys.THEME);

        if (!!savedThemeObject) {
          setCurrentTheme(savedThemeObject.mode);
          setSystemTheme(savedThemeObject.system);
        }
      } catch (error) {
        console.log("getTheme error:", error);
      }
    };

    getTheme();
  }, []);

  useEffect(() => {
    if (colorScheme && systemTheme) {
      (async () => {
        await persistUpdatedTheme(colorScheme, true);
      })();
    }
  }, [colorScheme, systemTheme]);

  const toggleTheme = async (newTheme: TThemeObject["mode"]) => {
    await persistUpdatedTheme(newTheme, false);
  };

  const useSystemTheme = async () => {
    if (colorScheme) {
      await persistUpdatedTheme(colorScheme, true);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: themeObject,
        statusBarTheme,
        currentTheme,
        isSystemTheme: systemTheme,
        toggleTheme,
        useSystemTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
