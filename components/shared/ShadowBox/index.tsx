import { ReactNode } from "react";
import { Shadow } from "react-native-shadow-2";

interface ShadowBoxProps {
  children: ReactNode;
}

export const ShadowBox = ({ children }: ShadowBoxProps) => {
  return <Shadow>{children}</Shadow>;
};
