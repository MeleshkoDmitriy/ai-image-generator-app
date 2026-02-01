import { ReactNode, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Localization from "expo-localization";
import i18n from "@/i18n";
import { EnumStorageKeys, EnumStorageLangsValues, Storage } from "@/lib";
import { LanguageProvider } from "./LanguageProvider";

function getDeviceLang(): EnumStorageLangsValues {
  const code = Localization.getLocales()[0]?.languageCode ?? "en";
  if (code.startsWith("ru")) return EnumStorageLangsValues.RU;
  return EnumStorageLangsValues.EN;
}

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  useEffect(() => {
    let cancelled = false;

    Storage.getStorageItem(EnumStorageKeys.LANG).then((savedLang) => {
      if (cancelled) return;
      const lang = savedLang !== null ? savedLang : getDeviceLang();
      i18n.changeLanguage(lang);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <LanguageProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>{children}</SafeAreaProvider>
      </GestureHandlerRootView>
    </LanguageProvider>
  );
};
