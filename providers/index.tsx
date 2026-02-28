import { ReactNode } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ContextProvider } from "./ContextProvider";
import { StyledProvider } from "./StyledProvider";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ContextProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StyledProvider>
          <SafeAreaProvider>{children}</SafeAreaProvider>
        </StyledProvider>
      </GestureHandlerRootView>
    </ContextProvider>
  );
};
