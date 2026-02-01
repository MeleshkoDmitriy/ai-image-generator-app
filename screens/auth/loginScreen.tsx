import { ScreenWrapper } from "@/components";
import { useRouter } from "expo-router";
import { Button, Text } from "react-native";

export const LoginScreen = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.replace("/(main)/(content)");
  };

  return (
    <ScreenWrapper>
      <Text>Register</Text>
      <Button title="Register" onPress={handleLogin} />
    </ScreenWrapper>
  );
};
