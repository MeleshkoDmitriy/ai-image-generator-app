import { EnumStorageKeys, Storage, TThemeObject } from "@/lib";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

export interface ThemeContextValue {
  currentTheme: TThemeObject["mode"];
  toggleTheme: (newTheme: TThemeObject["mode"]) => void;
  useSystemTheme: () => void;
  isSystemTheme: boolean;
}

export const ThemeContext = createContext<ThemeContextValue>({
  currentTheme: "light",
  toggleTheme: () => {},
  useSystemTheme: () => {},
  isSystemTheme: false,
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<TThemeObject["mode"]>("light");
  const colorScheme = useColorScheme();
  const [systemTheme, setSystemTheme] = useState<TThemeObject["system"]>(false);

  const persistUpdatedTheme = async (
    mode: TThemeObject["mode"],
    system: TThemeObject["system"]
  ) => {
    const themeObject = {
      mode,
      system,
    };

    setTheme(mode);
    setSystemTheme(system);
    await Storage.setStorageItem(EnumStorageKeys.THEME, themeObject);
  };

  useEffect(() => {
    const getTheme = async () => {
      try {
        const savedThemeObject = await Storage.getStorageItem(EnumStorageKeys.THEME);

        if (!!savedThemeObject) {
          setTheme(savedThemeObject.mode);
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
      value={{ currentTheme: theme, toggleTheme, useSystemTheme, isSystemTheme: systemTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
