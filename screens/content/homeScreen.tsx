import { ScreenWrapper } from "@/components";
import { useRouter } from "expo-router";
import { Button } from "react-native";

export const HomeScreen = () => {
  const router = useRouter();

  const handleGenerateImages = () => {
    router.navigate("/(main)/(content)/generate-image");
  };

  const handleGallery = () => {
    router.navigate("/(main)/(content)/gallery");
  };

  return (
    <ScreenWrapper scrollable>
      <Button title="Generate images" onPress={handleGenerateImages} />
      <Button title="Gallery" onPress={handleGallery} />
    </ScreenWrapper>
  );
};
