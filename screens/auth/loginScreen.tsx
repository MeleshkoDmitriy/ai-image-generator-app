import { EnumIconName, Icon, ScreenWrapper, Typography } from "@/components";
import { useRouter } from "expo-router";
import { Button } from "react-native";

export const LoginScreen = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.replace("/(main)/(content)");
  };

  return (
    <ScreenWrapper>
      <Typography variant="title">LoginScreen</Typography>
      <Button title="Login" onPress={handleLogin} />
      <Icon name={EnumIconName.Home} />
    </ScreenWrapper>
  );
};
