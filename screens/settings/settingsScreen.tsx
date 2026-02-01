import { useCallback, useRef } from "react";
import { Button, StyleSheet, Text, TouchableOpacity } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { ScreenWrapper, UIBottomSheet } from "@/components";
import { EnumStorageLangsValues } from "@/lib";
import { useLanguage } from "@/hooks";
import { useTranslation } from "react-i18next";

export const SettingsScreen = () => {
  const { locale, setLocale } = useLanguage();
  const { t } = useTranslation();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const onSelectLang = (lang: EnumStorageLangsValues) => {
    setLocale(lang);
    bottomSheetRef.current?.close();
  };

  const handleSnapPress = useCallback(() => {
    bottomSheetRef.current?.snapToPosition(300);
  }, []);

  return (
    <ScreenWrapper>
      <Text>{t("common.settings")}</Text>
      <Button title={t("common.language")} onPress={handleSnapPress} />

      {/* <Button title="Theme" onPress={handleSnapPress} /> */}

      <UIBottomSheet ref={bottomSheetRef}>
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
