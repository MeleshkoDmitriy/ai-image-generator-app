import { Button, ScreenWrapper } from "@/components";
import { useRouter } from "expo-router";

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
      <Button onPress={handleGenerateImages}>Generate images</Button>
      <Button onPress={handleGallery}>Gallery</Button>
    </ScreenWrapper>
  );
};
