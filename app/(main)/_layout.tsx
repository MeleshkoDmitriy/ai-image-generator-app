import { EnumIconName, Icon } from "@/components";
import { templates } from "@/styles";
import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components/native";

export default function MainTabs() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.textPrimary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(content)"
        options={{
          title: `${t("common.home")}`,
          tabBarIcon: ({ focused }) => (
            <Icon
              name={EnumIconName.Home}
              color={focused ? theme.colors.textPrimary : theme.colors.textSecondary}
              size={templates.icons.tabBarIconSize}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: `${t("common.settings")}`,
          tabBarIcon: ({ focused }) => (
            <Icon
              name={EnumIconName.Settings}
              color={focused ? theme.colors.textPrimary : theme.colors.textSecondary}
              size={templates.icons.tabBarIconSize}
            />
          ),
        }}
      />
    </Tabs>
  );
}
