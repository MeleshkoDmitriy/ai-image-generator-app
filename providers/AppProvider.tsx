import { ReactNode } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ContextProvider } from "./ContextProvider";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ContextProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>{children}</SafeAreaProvider>
      </GestureHandlerRootView>
    </ContextProvider>
  );
};
