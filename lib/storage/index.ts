import AsyncStorage from "@react-native-async-storage/async-storage";
import { ColorSchemeName } from "react-native";

export const enum EnumStorageKeys {
  AUTH = "auth",
  LANG = "lang",
  THEME = "theme",
}

export const enum EnumStorageLangsValues {
  EN = "en",
  RU = "ru",
}

export type TThemeObject = {
  mode: ColorSchemeName;
  system: boolean;
};

export type StorageKey = (typeof EnumStorageKeys)[keyof typeof EnumStorageKeys];

export type TStorageSchema = {
  [EnumStorageKeys.AUTH]: boolean;
  [EnumStorageKeys.LANG]: EnumStorageLangsValues;
  [EnumStorageKeys.THEME]: TThemeObject;
};

export const Storage = {
  getStorageItem: async <K extends StorageKey>(key: K): Promise<TStorageSchema[K] | null> => {
    const raw = await AsyncStorage.getItem(key);
    if (raw === null) return null;
    return JSON.parse(raw) as TStorageSchema[K];
  },

  setStorageItem: async <K extends StorageKey>(key: K, value: TStorageSchema[K]): Promise<void> => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },

  removeStorageItem: async (key: StorageKey): Promise<void> => {
    await AsyncStorage.removeItem(key);
  },
};
