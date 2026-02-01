import AsyncStorage from "@react-native-async-storage/async-storage";

export const enum EnumStorageKeys {
  AUTH = "auth",
  LANG = "lang",
}

export const enum EnumStorageLangsValues {
  EN = "en",
  RU = "ru",
}

export type StorageKey = (typeof EnumStorageKeys)[keyof typeof EnumStorageKeys];

export type TStorageSchema = {
  [EnumStorageKeys.AUTH]: boolean;
  [EnumStorageKeys.LANG]: EnumStorageLangsValues;
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
