import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

export default function ContentLayout() {
  const { t } = useTranslation();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackTitle: t("common.back"),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: t("common.home"),
        }}
      />
      <Stack.Screen
        name="generate-image"
        options={{ title: t("screens.generateImage.generate") }}
      />
      <Stack.Screen name="gallery" options={{ title: t("screens.gallery.gallery") }} />
      <Stack.Screen name="[image]" options={{ title: t("screens.imageDetails.imageDetails") }} />
    </Stack>
  );
}
