import { Button, ScreenWrapper } from "@/components";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

export const HomeScreen = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const handleGenerateImages = () => {
    router.navigate("/(main)/(content)/generate-image");
  };

  const handleGallery = () => {
    router.navigate("/(main)/(content)/gallery");
  };

  return (
    <ScreenWrapper scrollable>
      <Button onPress={handleGenerateImages}>{t("screens.generateImage.generator")}</Button>
      <Button onPress={handleGallery}>{t("screens.gallery.gallery")}</Button>
    </ScreenWrapper>
  );
};
