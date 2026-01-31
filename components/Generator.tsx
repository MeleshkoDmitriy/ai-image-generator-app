import { CONFIG } from "@/config";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { File, Paths } from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import moment from "moment";

// const model = "flux-dev";
// const model = "sdxl-1.0";
// const model = "imagine-turbo";
const model = "realistic";
// const model = "flux-schnell";

// const aspect_ratio = "1:1"
// const aspect_ratio = "16:9"
const aspect_ratio = "9:16";

export const Generator = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");

  const generateImage = async () => {
    try {
      const formData = new FormData();
      formData.append("prompt", prompt);
      formData.append("style", model);
      formData.append("aspect_ratio", aspect_ratio);

      const response = await fetch(CONFIG.AI_BASE_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${CONFIG.AI_TOKEN}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.warn("API Error:", { status: response.status, ...errorData });
        return;
      }

      const blob = await response.blob();
      if (!blob.type.startsWith("image/")) {
        console.warn("Response is not an image:", blob.type);
        return;
      }

      const fileReaderInstance = new FileReader();
      fileReaderInstance.readAsDataURL(blob);
      fileReaderInstance.onload = () => {
        const base64Data = fileReaderInstance.result as string;
        setImageUrl(base64Data);
        console.log(base64Data);
      };
    } catch (error) {
      console.warn("error generateImage", error);
    }
  };

  const base64ToUint8Array = (base64: string): Uint8Array => {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  };

  const writeImageToFile = (base64Code: string, filename: string): string => {
    const file = new File(Paths.document, filename);
    file.create({ overwrite: true });
    file.write(base64ToUint8Array(base64Code));
    return file.uri;
  };

  const handleDownload = async () => {
    if (imageUrl === null) {
      Alert.alert("Image is null");
      return;
    }

    const base64Code = imageUrl.split("data:image/jpeg;base64,")[1];
    if (!base64Code) {
      Alert.alert("Error", "Invalid image data");
      return;
    }

    const date = moment().format("YYYYMMDDhhmmss");
    const filename = `${date}.jpeg`;

    try {
      const fileUri = writeImageToFile(base64Code, filename);
      await MediaLibrary.saveToLibraryAsync(fileUri);
      Alert.alert("Image downloaded successfully");
    } catch (error) {
      Alert.alert("handleDownload error");
      console.warn(error);
    }
  };

  const handleShare = async () => {
    if (imageUrl === null) {
      Alert.alert("Image is null");
      return;
    }

    const base64Code = imageUrl.split("data:image/jpeg;base64,")[1];
    if (!base64Code) {
      Alert.alert("Error", "Invalid image data");
      return;
    }

    const date = moment().format("YYYYMMDDhhmmss");
    const filename = `${date}.jpeg`;

    try {
      const fileUri = writeImageToFile(base64Code, filename);
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      Alert.alert("handleShare error");
      console.warn(error);
    }
  };

  return (
    <ScrollView>
      <Text>Generator</Text>
      <TextInput
        value={prompt}
        onChangeText={setPrompt}
        style={{ backgroundColor: "red" }}
      />
      {imageUrl ? (
        <View style={{ width: 300, height: 300, marginVertical: 20 }}>
          <Image
            source={{ uri: imageUrl }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />
        </View>
      ) : (
        <View
          style={{
            width: 300,
            height: 300,
            marginVertical: 20,
            backgroundColor: "blue",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Изображение загружается...</Text>
        </View>
      )}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={generateImage} style={styles.button}>
          <Text style={styles.buttonText}>PUSH</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDownload} style={styles.button}>
          <Text style={styles.buttonText}>Download</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare} style={styles.button}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    gap: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "blue",
    maxWidth: 200,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
