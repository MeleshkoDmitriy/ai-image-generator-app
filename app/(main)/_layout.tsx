import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";

export default function MainTabs() {
  const { t } = useTranslation();

  return (
    <Tabs>
      <Tabs.Screen name="(content)" options={{ title: "Контент" }} />
      <Tabs.Screen name="settings" options={{ title: `${t("common.settings")}` }} />
    </Tabs>
  );
}
