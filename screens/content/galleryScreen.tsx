import { ScreenWrapper, Typography } from "@/components";
import { useTranslation } from "react-i18next";

export const GalleryScreen = () => {
  const { t } = useTranslation();

  return (
    <ScreenWrapper>
      <Typography>{t("screens.gallery.gallery")}</Typography>
    </ScreenWrapper>
  );
};
