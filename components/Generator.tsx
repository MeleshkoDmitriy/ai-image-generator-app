import { CONFIG } from "@/config"
import { useState } from "react"
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native"

// const model = "flux-dev";
// const model = "sdxl-1.0";
// const model = "imagine-turbo";
const model = "realistic";
// const model = "flux-schnell";


// const aspect_ratio = "1:1"
// const aspect_ratio = "16:9"
const aspect_ratio = "9:16"


export const Generator = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [prompt, setPrompt] = useState("")

  const generateImage = async () => {
    try {
      const formData = new FormData()
      formData.append("prompt", prompt)
      formData.append("style", model)
      formData.append("aspect_ratio", aspect_ratio)

      const response = await fetch(CONFIG.AI_BASE_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${CONFIG.AI_TOKEN}`,
        },
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.warn("API Error:", { status: response.status, ...errorData })
        return
      }

      const blob = await response.blob()
      if (!blob.type.startsWith("image/")) {
        console.warn("Response is not an image:", blob.type)
        return
      }

      const fileReaderInstance = new FileReader()
      fileReaderInstance.readAsDataURL(blob)
      fileReaderInstance.onload = () => {
        const base64Data = fileReaderInstance.result as string
        setImageUrl(base64Data)
      }
    } catch (error) {
      console.warn("error generateImage", error)
    }
  }

  return (
    <View>
      <Text>Generator</Text>
      <TextInput value={prompt} onChangeText={setPrompt} style={{ backgroundColor: "red" }} />
      {imageUrl ? (
        <View style={{ width: 300, height: 300, marginVertical: 20 }}>
          <Image source={{ uri: imageUrl }} style={{ width: "100%", height: "100%" }} resizeMode="contain" />
        </View>
      ) : (
        <View style={{ width: 300, height: 300, marginVertical: 20, backgroundColor: "#f0f0f0", justifyContent: "center", alignItems: "center" }}>
          <Text>Изображение загружается...</Text>
        </View>
      )}
      <TouchableOpacity onPress={generateImage}>
        <Text>PUSH</Text>
      </TouchableOpacity>
    </View>
  )
}