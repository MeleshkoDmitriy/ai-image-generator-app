import { Button, EnumIconName, Icon, ScreenWrapper, Typography } from "@/components";
import { useRouter } from "expo-router";

export const LoginScreen = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.replace("/(main)/(content)");
  };

  return (
    <ScreenWrapper>
      <Typography variant="title">LoginScreen</Typography>
      <Button onPress={handleLogin}>Login</Button>
      <Icon name={EnumIconName.Home} />
    </ScreenWrapper>
  );
};
