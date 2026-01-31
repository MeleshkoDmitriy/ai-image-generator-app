import { Tabs } from "expo-router";

export default function MainTabs() {
  return (
    <Tabs>
      <Tabs.Screen name="(content)" options={{ title: "Контент" }} />
      <Tabs.Screen name="settings" options={{ title: "Настройки" }} />
    </Tabs>
  );
}
