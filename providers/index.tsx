import { ReactNode } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ContextProvider } from "./ContextProvider";
import { EmotionProvider } from "./EmotionProvider";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ContextProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <EmotionProvider>
          <SafeAreaProvider>{children}</SafeAreaProvider>
        </EmotionProvider>
      </GestureHandlerRootView>
    </ContextProvider>
  );
};
