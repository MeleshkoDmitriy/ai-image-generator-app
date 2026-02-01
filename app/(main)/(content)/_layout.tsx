import { Stack } from "expo-router";

export default function ContentLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackTitle: "Назад",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Контент",
          headerShown: false,
        }}
      />
      <Stack.Screen name="generate-image" options={{ title: "Генерация" }} />
      <Stack.Screen name="gallery" options={{ title: "Галерея" }} />
      <Stack.Screen name="[image]" options={{ title: "Детали" }} />
    </Stack>
  );
}
