import { useRouter } from "expo-router";
import { Button, View } from "react-native";

export const HomeScreen = () => {
  const router = useRouter();

  const handleGenerateImages = () => {
    router.navigate("/(main)/(content)/generate-image");
  };

  const handleGallery = () => {
    router.navigate("/(main)/(content)/gallery");
  };

  return (
    <View>
      <Button title="Generate images" onPress={handleGenerateImages} />
      <Button title="Gallery" onPress={handleGallery} />
    </View>
  );
};
