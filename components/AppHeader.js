import { Text, View } from "react-native";
import React from "react";
import { Fonts } from "../constants/fonts";
import { Colors } from "../constants/colors";

const AppHeader = ({ title, info }) => {
  return (
    <View style={{ gap: 8, marginTop: 50 }}>
      <Text
        style={{
          fontSize: Fonts.h4.fontSize,
          letterSpacing: -0.2,
          fontFamily: Fonts.h4.fontFamily,
          color: Colors.text,
          lineHeight: Fonts.h4.lineHeight,
        }}
      >
        {title}
      </Text>

      <Text
        style={{
          fontSize: Fonts.body3.fontSize,
          letterSpacing: -0.2,
          fontFamily: Fonts.body3.fontFamily,
          color: Colors.gray,
          lineHeight: Fonts.body3.lineHeight,
        }}
      >
        {info}
      </Text>
    </View>
  );
};

export default AppHeader;
