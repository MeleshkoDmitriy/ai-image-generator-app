import { ScreenWrapper, Typography } from "@/components";
import { useTranslation } from "react-i18next";

export const ImageDetailsScreen = () => {
  const { t } = useTranslation();

  return (
    <ScreenWrapper>
      <Typography>{t("screens.imageDetails.imageDetails")}</Typography>
    </ScreenWrapper>
  );
};
