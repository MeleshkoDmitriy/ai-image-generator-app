import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Login() {
  const router = useRouter();

  const handleLogin = () => {
    router.replace("/(main)/(content)");
  };

  return (
    <View>
      <Text>Register</Text>
      <Button title="Register" onPress={handleLogin} />
    </View>
  );
}
