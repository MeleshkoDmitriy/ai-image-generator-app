import { CONFIG } from "@/config"
import { useState } from "react"
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native"

const model = 'stabilityai/stable-diffusion-xl-base-1.0'


export const Generator = () => {
  const width = 512
  const height = 512
  const [imageUrl, setImageUrl] = useState<any>('');
  const [prompt, setPrompt] = useState('')

    const generateImage = async () => {
      try {
        const response = await fetch(`${CONFIG.AI_BASE_URL}/${model}`, {

          headers: {
            Authorization: `Bearer ${CONFIG.AI_TOKEN}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            inputs: prompt,
            parameters: {
              width,
              height,
              num_inference_steps: 28,
              guidance_scale: 7.5,
            }
          })
        }) 

        
        if (!response.ok) {
          console.warn('response', JSON.stringify(response, null, 2));
        }
        const blob = await response.blob();

        const fileReaderInstance = new FileReader();
        fileReaderInstance.readAsDataURL(blob);
        fileReaderInstance.onload = () => {
          const base64Data = fileReaderInstance.result;
          setImageUrl(base64Data);
        }

      } catch (error) {
        console.warn('error generateImage', error)
      }
    }

    console.log('imageUrl', imageUrl)

    return (
        <View>
            <Text>Generator</Text>
            <TextInput value={prompt} onChangeText={text => setPrompt(text)} style={{ backgroundColor: 'red' }} />
            {imageUrl ? (
              <View style={{ width: 300, height: 300, marginVertical: 20 }}>
                <Image 
                  source={{ uri: imageUrl }} 
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="contain"
                />
              </View>
            ) : (
              <View style={{ width: 300, height: 300, marginVertical: 20, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }}>
                <Text>Изображение загружается...</Text>
              </View>
            )}
            <TouchableOpacity onPress={() => generateImage()} ><Text>PUSH</Text></TouchableOpacity> 
        </View>
    )
}