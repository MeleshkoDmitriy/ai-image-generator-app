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
import { Dropdown } from "react-native-element-dropdown";
import { ScreenWrapper } from "@/components";
import { useTranslation } from "react-i18next";

// const model = "flux-dev";
// const model = "sdxl-1.0";
// const model = "imagine-turbo";
// const model = "realistic";
// const model = "flux-schnell";

const aiModels = [
  {
    label: "Flux Dev",
    value: "flux-dev",
  },
  {
    label: "SDXL 1.0",
    value: "sdxl-1.0",
  },
  {
    label: "Imagine Turbo",
    value: "imagine-turbo",
  },
  {
    label: "Realistic",
    value: "realistic",
  },
  {
    label: "Flux Schnell",
    value: "flux-schnell",
  },
];

const aspectRatios = [
  {
    label: "Square",
    value: "1:1",
  },
  {
    label: "Vertical",
    value: "9:16",
  },
  {
    label: "Horizontal",
    value: "16:9",
  },
];

const MAX_PREVIEW = 300;

function getPreviewSize(ratio: string): { width: number; height: number } {
  const [w, h] = ratio.split(":").map(Number);
  if (w >= h) return { width: MAX_PREVIEW, height: Math.round((MAX_PREVIEW * h) / w) };
  return { width: Math.round((MAX_PREVIEW * w) / h), height: MAX_PREVIEW };
}

export const GenerateImageScreen = () => {
  const [aiModel, setAiModel] = useState(aiModels[0].value);
  const [aspectRatio, setAspectRatio] = useState(aspectRatios[0].value);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const { t } = useTranslation();

  const generateImage = async () => {
    try {
      const formData = new FormData();
      formData.append("prompt", prompt);
      formData.append("style", aiModel);
      formData.append("aspect_ratio", aspectRatio);
      formData.append("variation", "txt2img");

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

  const parseImageDataUrl = (dataUrl: string): { base64: string; ext: string } | null => {
    const match = dataUrl.match(/^data:(image\/[a-z]+);base64,(.+)$/i);
    if (!match) return null;
    const mime = match[1].toLowerCase();
    const base64 = match[2];
    const ext = mime === "image/png" ? "png" : mime === "image/webp" ? "webp" : "jpeg";
    return { base64, ext };
  };

  const handleDownload = async () => {
    if (imageUrl === null) {
      Alert.alert("Image is null");
      return;
    }
    const parsed = parseImageDataUrl(imageUrl);
    if (!parsed) {
      Alert.alert("Error", "Invalid image data");
      return;
    }
    const date = moment().format("YYYYMMDDhhmmss");
    const filename = `${date}.${parsed.ext}`;
    try {
      const fileUri = writeImageToFile(parsed.base64, filename);
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
    const parsed = parseImageDataUrl(imageUrl);
    if (!parsed) {
      Alert.alert("Error", "Invalid image data");
      return;
    }
    const date = moment().format("YYYYMMDDhhmmss");
    const filename = `${date}.${parsed.ext}`;
    try {
      const fileUri = writeImageToFile(parsed.base64, filename);
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      Alert.alert("handleShare error");
      console.warn(error);
    }
  };

  return (
    <ScreenWrapper scrollable>
      <Text>Generator</Text>
      <View style={styles.box}>
        <TextInput value={prompt} onChangeText={setPrompt} style={{ backgroundColor: "red" }} />
        <Dropdown
          style={styles.dropdown}
          // placeholderStyle={styles.placeholderStyle}
          // selectedTextStyle={styles.selectedTextStyle}
          data={aiModels}
          maxHeight={300}
          labelField="label"
          valueField="value"
          // placeholder={!isFocus ? 'Select item' : '...'}
          value={aiModel}
          // onFocus={() => setIsFocus(true)}
          // onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setAiModel(item.value);
            // setIsFocus(false);
          }}
        />
        <Dropdown
          style={styles.dropdown}
          // placeholderStyle={styles.placeholderStyle}
          // selectedTextStyle={styles.selectedTextStyle}
          data={aspectRatios}
          maxHeight={300}
          labelField="label"
          valueField="value"
          // placeholder={!isFocus ? 'Select item' : '...'}
          value={aspectRatio}
          // onFocus={() => setIsFocus(true)}
          // onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setAspectRatio(item.value);
            // setIsFocus(false);
          }}
        />
      </View>
      {imageUrl ? (
        <View
          style={{
            ...getPreviewSize(aspectRatio),
            marginVertical: 20,
            alignSelf: "center",
          }}
        >
          <Image
            source={{ uri: imageUrl }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />
        </View>
      ) : (
        <View
          style={{
            ...getPreviewSize(aspectRatio),
            marginVertical: 20,
            backgroundColor: "blue",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <Text>Изображение загружается...</Text>
        </View>
      )}
      <View style={styles.box}>
        <TouchableOpacity onPress={generateImage} style={styles.button}>
          <Text style={styles.buttonText}>{t("screens.generateImage.generateImage")}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDownload} style={styles.button}>
          <Text style={styles.buttonText}>Download</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare} style={styles.button}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  box: {
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
  dropdown: {},
});
