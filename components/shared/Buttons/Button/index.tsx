import { TouchableOpacityProps } from "react-native";
import { styled, useTheme } from "styled-components/native";
import { Typography } from "../../Typography";
import { scaledPixels } from "@/utils";

interface ButtonProps extends TouchableOpacityProps {
  children: string;
}

export const Button = ({ children, onPress }: ButtonProps) => {
  const theme = useTheme();

  return (
    <StyledTouchableOpacity onPress={onPress}>
      <Typography color={theme.colors.white} variant="button">
        {children}
      </Typography>
    </StyledTouchableOpacity>
  );
};

const StyledTouchableOpacity = styled.TouchableOpacity(({ theme }) => ({
  paddingVertical: scaledPixels(10),
  paddingHorizontal: scaledPixels(20),
  borderRadius: scaledPixels(10),
  backgroundColor: theme.colors.primary,
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "flex-start",
}));
