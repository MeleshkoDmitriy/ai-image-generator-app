import { TTypographyVariant, TTypographyWeight } from "@/styles";
import { ReactNode } from "react";
import { Text, TextProps } from "react-native";
import { styled, useTheme } from "styled-components/native";

type TTextColor = "primary" | "secondary";

interface TypographyProps extends TextProps {
  children: ReactNode;
  color?: string;
  colorVariant?: TTextColor;
  variant?: TTypographyVariant;
  fontWeight?: TTypographyWeight;
}

export const Typography = ({
  children,
  color,
  colorVariant = "primary",
  variant = "body",
  fontWeight = "regular",
}: TypographyProps) => {
  const theme = useTheme();

  const textColorVariant =
    colorVariant === "primary" ? theme.colors.textPrimary : theme.colors.secondary;
  const textColor = color || textColorVariant;

  return (
    <StyledText color={textColor} variant={variant} fontWeight={fontWeight}>
      {children}
    </StyledText>
  );
};

const StyledText = styled(Text)<{
  color: string;
  variant: TTypographyVariant;
  fontWeight: TTypographyWeight;
}>(({ theme, color, variant, fontWeight }) => ({
  ...theme.typography[variant][fontWeight],
  color: color,
}));
