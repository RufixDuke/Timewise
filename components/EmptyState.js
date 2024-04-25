import { Image, Pressable, Text, View } from "react-native";
import React from "react";
import { Colors } from "../constants/colors";
import { Fonts } from "../constants/fonts";

const EmptyState = ({
  title,
  info,
  img,
  showButton = false,
  onPress,
  btnText,
  containerStyle,
}) => {
  return (
    <View
      style={[
        {
          alignItems: "center",
          justifyContent: "center",
          marginTop: 50,
        },
        containerStyle,
      ]}
    >
      {img && (
        <Image
          source={img}
          style={{
            width: 154,
            height: 154,
            resizeMode: "contain",
            marginBottom: 20,
          }}
        />
      )}

      <View style={{ alignItems: "center", gap: 4 }}>
        <Text
          style={{
            fontFamily: Fonts.h6.fontFamily,
            fontSize: Fonts.h6.fontSize,
            color: Colors.text,
          }}
        >
          {title}{" "}
        </Text>

        <Text
          style={{
            fontFamily: Fonts.body3.fontFamily,
            fontSize: Fonts.body3.fontSize,
            color: Colors.gray,
            textAlign: "center",
          }}
        >
          {info}
        </Text>
      </View>

      {showButton && (
        <Pressable
          style={{
            backgroundColor: Colors.white,
            paddingHorizontal: 8,
            height: 44,
            borderRadius: 24,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginTop: 30,
            width: 95.5,
          }}
          onPress={onPress}
        >
          <Text
            style={{
              fontFamily: Fonts.body3.fontFamily,
              fontSize: Fonts.body3.fontSize,
              color: Colors.buttonText,
            }}
          >
            {btnText}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default EmptyState;
