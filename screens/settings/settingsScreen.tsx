import { useCallback, useRef, useState } from "react";
import { Button, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { ScreenWrapper, Typography, UIBottomSheet } from "@/components";
import { EnumStorageLangsValues, TThemeObject } from "@/lib";
import { useLanguageContext, useThemeContext } from "@/hooks";
import { useTranslation } from "react-i18next";
import styled from "@emotion/native";

export const SettingsScreen = () => {
  const { locale, setLocale } = useLanguageContext();
  const { toggleTheme } = useThemeContext();
  const { t } = useTranslation();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isLocaleOpen, setIsLocaleOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  const onSelectLang = (lang: EnumStorageLangsValues) => {
    setLocale(lang);
    bottomSheetRef.current?.close();
    setIsLocaleOpen(false);
  };

  const onSelectTheme = (theme: TThemeObject["mode"]) => {
    toggleTheme(theme === "dark" ? "light" : "dark");
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

  const LocaleContent = () => {
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

  const ThemeContent = () => {
    const { currentTheme, toggleTheme, useSystemTheme, isSystemTheme } = useThemeContext();

    const handleThemeSwitch = () => {
      toggleTheme(currentTheme === "dark" ? "light" : "dark");
    };

    return (
      <View>
        <View>
          <Text>Dark Mode</Text>
          <Switch value={currentTheme === "dark"} onValueChange={handleThemeSwitch} />
        </View>
        <TouchableOpacity style={styles.button} onPress={() => onSelectTheme(currentTheme)}>
          <Text style={styles.buttonText}>Light</Text>
          {!isSystemTheme && currentTheme === "light" && <Text style={styles.buttonText}> ✓</Text>}
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onSelectTheme(currentTheme)}>
          <Text style={styles.buttonText}>Dark</Text>
          {!isSystemTheme && currentTheme === "dark" && <Text style={styles.buttonText}> ✓</Text>}
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={useSystemTheme}>
          <Text style={styles.buttonText}>System</Text>
          {isSystemTheme && <Text style={styles.buttonText}> ✓</Text>}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScreenWrapper>
      <Typography>{t("common.settings")}</Typography>
      <Button title={t("common.language")} onPress={handleLocalePress} />

      <Button title={t("common.theme")} onPress={handleThemePress} />

      <TestBox />

      <UIBottomSheet ref={bottomSheetRef}>
        <>
          {isLocaleOpen && LocaleContent()}
          {isThemeOpen && ThemeContent()}
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
  themeBox: {
    width: 200,
    height: 200,
  },
});

const TestBox = styled.View(({ theme }) => ({
  width: 300,
  height: 200,
  backgroundColor: theme.colors.primary,
}));
