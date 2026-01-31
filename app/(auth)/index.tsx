import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Register() {
  const router = useRouter();

  const handleRegister = () => {
    router.replace("/(main)/(content)");
  };

  return (
    <View>
      <Text>Register</Text>
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}
