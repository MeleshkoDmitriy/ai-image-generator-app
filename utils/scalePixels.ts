import { Dimensions } from "react-native";

const BASE_MOBILE_SIZE = 375;

export const screen = Dimensions.get("window");
const scale = (screen.width || BASE_MOBILE_SIZE) / BASE_MOBILE_SIZE;

export const scaledPixels = (pixels: number) => pixels * scale;
