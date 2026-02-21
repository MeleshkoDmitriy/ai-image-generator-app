import { Text, TextProps } from "react-native";
import styled from "@emotion/native";

interface TypographyProps extends TextProps {
  children: string;
}

export const Typography = ({ children }: TypographyProps) => {
  return <StyledText>{children}</StyledText>;
};

const StyledText = styled(Text)(({ theme }) => ({
  color: theme.colors.text,
}));
