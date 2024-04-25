import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../constants/colors";
import { Fonts } from "../constants/fonts";

const AppSwiperContent = ({ imgUrl, title, desc }) => {
  return (
    <View
      style={{
        padding: 20,
        flex: 1,
        justifyContent: "flex-end",
      }}
    >
      <View style={{ alignItems: "center", paddingTop: 20 }}>
        <Image
          source={imgUrl}
          style={{ width: "90%", height: 212, resizeMode: "contain" }}
        />
      </View>
      <View>
        <Text
          style={{
            color: Colors.text,
            fontSize: Fonts.h5.fontSize,
            fontFamily: Fonts.h5.fontFamily,
            textAlign: "center",
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            color: Colors.gray,
            fontSize: Fonts.body2.fontSize,
            fontFamily: Fonts.body2.fontFamily,
            marginTop: 15,
            textAlign: "center",
          }}
        >
          {desc}
        </Text>
      </View>
    </View>
  );
};

export default AppSwiperContent;

const styles = StyleSheet.create({
  slide1: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "space-between",
  },
});
