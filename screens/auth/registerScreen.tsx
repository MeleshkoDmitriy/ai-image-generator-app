import { ScreenWrapper } from "@/components";
import { useRouter } from "expo-router";
import { Button, Text } from "react-native";

export const RegisterScreen = () => {
  const router = useRouter();

  const handleRegister = () => {
    router.replace("/(main)/(content)");
  };

  return (
    <ScreenWrapper>
      <Text>Register</Text>
      <Button title="Register" onPress={handleRegister} />
    </ScreenWrapper>
  );
};
