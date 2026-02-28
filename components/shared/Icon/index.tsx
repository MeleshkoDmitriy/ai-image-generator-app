import Ionicons from "@expo/vector-icons/Ionicons";
import { templates, theme } from "@/styles";

export const enum EnumIconName {
  Home = "home",
  Settings = "settings",
}

interface IconProps {
  name: EnumIconName;
  color?: string;
  size?: number;
}

export const Icon = ({
  name,
  color = theme.light.colors.black,
  size = templates.icons.defaultSize,
}: IconProps) => {
  return <Ionicons name={name} color={color} size={size} />;
};
