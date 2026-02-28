import { scaledPixels } from "@/utils";

const commonFontStyles = {
  fontFamily: "FiraSans_400Regular",
};

export const typography = {
  title: {
    regular: {
      ...commonFontStyles,
      fontSize: scaledPixels(30),
      fontWeight: 400,
    },
    strong: {
      ...commonFontStyles,
      fontSize: scaledPixels(30),
      fontWeight: 700,
      fontFamily: "FiraSans_700Bold",
    },
  },
  body: {
    regular: {
      ...commonFontStyles,
      fontSize: scaledPixels(22),
      fontWeight: 400,
    },
    strong: {
      ...commonFontStyles,
      fontSize: scaledPixels(22),
      fontWeight: 700,
      fontFamily: "FiraSans_700Bold",
    },
  },
  button: {
    regular: {
      ...commonFontStyles,
      fontSize: scaledPixels(22),
      fontWeight: 400,
    },
    strong: {
      ...commonFontStyles,
      fontSize: scaledPixels(22),
      fontWeight: 700,
      fontFamily: "FiraSans_700Bold",
    },
  },
  caption: {
    regular: {
      ...commonFontStyles,
      fontSize: scaledPixels(16),
      fontWeight: 400,
    },
    strong: {
      ...commonFontStyles,
      fontSize: scaledPixels(16),
      fontWeight: 700,
      fontFamily: "FiraSans_700Bold",
    },
  },
};
