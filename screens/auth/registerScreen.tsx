import { ScreenWrapper, Typography, Button } from "@/components";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

export const RegisterScreen = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const handleRegister = () => {
    router.replace("/(main)/(content)");
  };

  return (
    <ScreenWrapper>
      <Typography variant="title">{t("screens.login.signUp")}</Typography>
      <Button onPress={handleRegister}>{t("screens.login.signUp")}</Button>
    </ScreenWrapper>
  );
};
