import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const fontNames = {
  Bold: "Bold",
  Book: "Book",
  Medium: "Medium",
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  largeTitle: 40,
  h1: 48,
  h2: 40,
  h3: 32,
  h4: 28,
  h5: 24,
  h6: 20,
  body1: 20,
  body2: 16,
  body3: 14,
  body4: 12,

  // Label
  label1: 20,
  label2: 16,

  // Button Text
  buttonText1: 24,
  buttonText2: 16,

  // app dimensions
  width,
  height,
};

export const Fonts = {
  h1: {
    fontFamily: fontNames.Bold,
    fontSize: SIZES.h1,
    lineHeight: 57.6,
    letterSpacing: -2,
  },
  h2: {
    fontFamily: fontNames.Bold,
    fontSize: SIZES.h2,
    lineHeight: 48,
    letterSpacing: -2,
  },
  h3: {
    fontFamily: fontNames.Bold,
    fontSize: SIZES.h3,
    lineHeight: 38.4,
    letterSpacing: -2,
  },
  h4: {
    fontFamily: fontNames.Bold,
    fontSize: SIZES.h4,
    lineHeight: 33.6,
    letterSpacing: -2,
  },
  h5: {
    fontFamily: fontNames.Bold,
    fontSize: SIZES.h5,
    lineHeight: 28.8,
    letterSpacing: -2,
  },
  h6: {
    fontFamily: fontNames.Bold,
    fontSize: SIZES.h6,
    lineHeight: 24,
    letterSpacing: -2,
  },
  body1: {
    fontFamily: fontNames.Book,
    fontSize: SIZES.body1,
    lineHeight: 30,
    letterSpacing: 0,
  },
  body2: {
    fontFamily: fontNames.Book,
    fontSize: SIZES.body2,
    lineHeight: 24,
    letterSpacing: 0,
  },
  body3: {
    fontFamily: fontNames.Book,
    fontSize: SIZES.body3,
    lineHeight: 21,
    letterSpacing: 0,
  },
  body4: {
    fontFamily: fontNames.Book,
    fontSize: SIZES.body4,
    lineHeight: 18,
    letterSpacing: 0,
  },
  label1: {
    fontFamily: fontNames.Medium,
    fontSize: SIZES.label1,
    lineHeight: 20,
    letterSpacing: 5,
  },
  label2: {
    fontFamily: fontNames.Medium,
    fontSize: SIZES.label2,
    lineHeight: 16,
    letterSpacing: 5,
  },
  buttonText1: {
    fontFamily: fontNames.Medium,
    fontSize: SIZES.buttonText1,
    lineHeight: 24,
    letterSpacing: 0,
  },
  buttonText2: {
    fontFamily: fontNames.Medium,
    fontSize: SIZES.buttonText2,
    lineHeight: 16,
    letterSpacing: 0,
  },
};
