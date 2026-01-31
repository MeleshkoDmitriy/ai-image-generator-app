import { useRouter } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_KEY = "isAuth";

export default function Index() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useLayoutEffect(() => {
    AsyncStorage.getItem(AUTH_KEY).then((value) => {
      setIsReady(true);

      if (value === "true") {
        router.replace("/(main)/(content)");
      } else {
        router.replace("/(auth)/login");
      }
    });
  }, []);

  if (!isReady) {
    return <ActivityIndicator />;
  }

  return null;
}
