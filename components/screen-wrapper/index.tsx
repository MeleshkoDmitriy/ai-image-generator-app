import { useTheme } from "@/hooks";
import { StatusBar, StatusBarProps } from "expo-status-bar";
import { ReactNode } from "react";
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ScreenWrapperProps {
  children: ReactNode;
  safeAreaTop?: boolean;
  safeAreaBottom?: boolean;
  scrollable?: boolean;
  keyboardAvoiding?: boolean;
  style?: View["props"]["style"];
  contentStyle?: View["props"]["style"];
}

export const ScreenWrapper = ({
  children,
  safeAreaTop = false,
  safeAreaBottom = false,
  scrollable = false,
  keyboardAvoiding = false,
  style,
  contentStyle,
}: ScreenWrapperProps) => {
  const insets = useSafeAreaInsets();
  const { currentTheme } = useTheme();
  const statusBarStyle = currentTheme === "dark" ? "light" : "dark";

  const containerStyle = [
    styles.container,
    {
      paddingTop: safeAreaTop ? insets.top : 0,
      paddingBottom: safeAreaBottom ? insets.bottom : 0,
      // backgroundColor: theme.colors.background.background,
      backgroundColor: "white",
    },
    style,
  ];

  const ChildrenWithStatusBar = () => (
    <>
      <StatusBar style={statusBarStyle} />
      {children}
    </>
  );

  const content = scrollable ? (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={[styles.scrollContent, contentStyle]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <ChildrenWithStatusBar />
    </ScrollView>
  ) : (
    <View style={[styles.content, contentStyle]}>
      <ChildrenWithStatusBar />
    </View>
  );

  if (keyboardAvoiding) {
    return (
      <KeyboardAvoidingView
        style={containerStyle}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={safeAreaTop ? insets.top : 0}
      >
        {content}
      </KeyboardAvoidingView>
    );
  }

  return <View style={containerStyle}>{content}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
