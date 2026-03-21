import { Button, ScreenWrapper, Typography } from "@/components";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

export const LoginScreen = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const handleLogin = () => {
    router.replace("/(main)/(content)");
  };

  return (
    <ScreenWrapper>
      <Typography variant="title">{t("screens.login.logIn")}</Typography>
      <Button onPress={handleLogin}>{t("screens.login.logIn")}</Button>
    </ScreenWrapper>
  );
};
