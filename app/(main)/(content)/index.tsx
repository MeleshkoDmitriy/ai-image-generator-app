import { useRouter } from "expo-router";
import { Button, View } from "react-native";

export default function Home() {
  const router = useRouter();

  const handleGenerateNewImages = () => {
    router.navigate("/(main)/(content)/generate-new");
  };

  const handleGallery = () => {
    router.navigate("/(main)/(content)/gallery");
  };

  return (
    <View>
      <Button title="Generate images" onPress={handleGenerateNewImages} />
      <Button title="Gallery" onPress={handleGallery} />
    </View>
  );
}
