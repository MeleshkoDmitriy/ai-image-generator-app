import { ScreenWrapper, Typography } from "@/components";
import { useRouter } from "expo-router";
import { Button } from "react-native";

export const RegisterScreen = () => {
  const router = useRouter();

  const handleRegister = () => {
    router.replace("/(main)/(content)");
  };

  return (
    <ScreenWrapper>
      <Typography fontWeight="strong">Registe</Typography>
      <Button title="Register" onPress={handleRegister} />
    </ScreenWrapper>
  );
};
