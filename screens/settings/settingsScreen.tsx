import { useCallback, useRef, useState } from "react";
import { Button, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { ScreenWrapper, UIBottomSheet } from "@/components";
import { EnumStorageLangsValues } from "@/lib";
import { useLanguage } from "@/hooks";
import { useTranslation } from "react-i18next";

export const SettingsScreen = () => {
  const { locale, setLocale } = useLanguage();
  const { t } = useTranslation();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isLocaleOpen, setIsLocaleOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  const onSelectLang = (lang: EnumStorageLangsValues) => {
    setLocale(lang);
    bottomSheetRef.current?.close();
    setIsLocaleOpen(false);
  };

  const onSelectTheme = () => {
    bottomSheetRef.current?.close();
    setIsThemeOpen(false);
  };

  const handleLocalePress = useCallback(() => {
    bottomSheetRef.current?.snapToPosition(300);
    setIsLocaleOpen(true);
  }, []);

  const handleThemePress = useCallback(() => {
    bottomSheetRef.current?.snapToPosition(300);
    setIsThemeOpen(true);
  }, []);

  const localeContent = () => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => onSelectLang(EnumStorageLangsValues.RU)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Русский</Text>
          {locale === EnumStorageLangsValues.RU && <Text style={styles.buttonText}> ✓</Text>}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSelectLang(EnumStorageLangsValues.EN)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>English</Text>
          {locale === EnumStorageLangsValues.EN && <Text style={styles.buttonText}> ✓</Text>}
        </TouchableOpacity>
      </View>
    );
  };

  const themeContent = () => {
    return (
      <View>
        <TouchableOpacity onPress={onSelectTheme}>
          <Text>Dark Mode</Text> <Switch />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onSelectTheme}>
          <Text style={styles.buttonText}>Light</Text>
          {false && <Text style={styles.buttonText}> ✓</Text>}
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onSelectTheme}>
          <Text style={styles.buttonText}>Dark</Text>
          {false && <Text style={styles.buttonText}> ✓</Text>}
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onSelectTheme}>
          <Text style={styles.buttonText}>System</Text>
          {true && <Text style={styles.buttonText}> ✓</Text>}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScreenWrapper>
      <Text>{t("common.settings")}</Text>
      <Button title={t("common.language")} onPress={handleLocalePress} />

      <Button title="Theme" onPress={handleThemePress} />

      <UIBottomSheet ref={bottomSheetRef}>
        <>
          {isLocaleOpen && localeContent()}
          {isThemeOpen && themeContent()}
        </>
      </UIBottomSheet>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    flexDirection: "row",
  },
  buttonText: {
    color: "white",
  },
});
