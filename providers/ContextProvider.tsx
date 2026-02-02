import { ReactNode, useEffect } from "react";
import * as Localization from "expo-localization";
import i18n from "@/i18n";
import { EnumStorageKeys, EnumStorageLangsValues, Storage } from "@/lib";
import { LanguageProvider } from "@/context";

function getDeviceLang(): EnumStorageLangsValues {
  const code = Localization.getLocales()[0]?.languageCode ?? "en";
  if (code.startsWith("ru")) return EnumStorageLangsValues.RU;
  return EnumStorageLangsValues.EN;
}

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider = ({ children }: ContextProviderProps) => {
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

  return <LanguageProvider>{children}</LanguageProvider>;
};
