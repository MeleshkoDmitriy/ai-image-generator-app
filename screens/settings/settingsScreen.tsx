import { useCallback, useRef, useState } from "react";
import { Button, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { ScreenWrapper, Typography, AppBottomSheet, Icon, EnumIconName } from "@/components";
import { EnumStorageLangsValues, TThemeObject } from "@/lib";
import { useLanguageContext, useThemeContext } from "@/hooks";
import { useTranslation } from "react-i18next";

export const SettingsScreen = () => {
  const { locale, setLocale } = useLanguageContext();
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

  const { currentTheme, toggleTheme, useSystemTheme, isSystemTheme } = useThemeContext();

  const handleThemeSwitch = () => {
    toggleTheme(currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <ScreenWrapper>
      <Typography>{t("common.settings")}</Typography>
      <Button title={t("common.language")} onPress={handleLocalePress} />

      <Button title={t("common.theme")} onPress={handleThemePress} />

      <AppBottomSheet ref={bottomSheetRef}>
        <>
          <View>
            <TouchableOpacity
              onPress={() => onSelectLang(EnumStorageLangsValues.RU)}
              style={styles.button}
            >
              <Typography>{t("screens.settings.language.russian")}</Typography>
              {locale === EnumStorageLangsValues.RU && <Icon name={EnumIconName.Check} />}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onSelectLang(EnumStorageLangsValues.EN)}
              style={styles.button}
            >
              <Typography>{t("screens.settings.language.english")}</Typography>
              {locale === EnumStorageLangsValues.EN && <Icon name={EnumIconName.Check} />}
            </TouchableOpacity>
          </View>
          <View>
            <View>
              <Text>Dark Mode</Text>
              <Switch value={currentTheme === "dark"} onValueChange={handleThemeSwitch} />
            </View>
            <TouchableOpacity style={styles.button} onPress={() => onSelectTheme(currentTheme)}>
              <Text style={styles.buttonText}>{t("screens.settings.theme.light")}</Text>
              {!isSystemTheme && currentTheme === "light" && <Icon name={EnumIconName.Check} />}
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => onSelectTheme(currentTheme)}>
              <Text style={styles.buttonText}>{t("screens.settings.theme.dark")}</Text>
              {!isSystemTheme && currentTheme === "dark" && <Icon name={EnumIconName.Check} />}
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={useSystemTheme}>
              <Text style={styles.buttonText}>{t("screens.settings.theme.system")}</Text>
              {isSystemTheme && <Icon name={EnumIconName.Check} />}
            </TouchableOpacity>
          </View>
        </>
      </AppBottomSheet>
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
