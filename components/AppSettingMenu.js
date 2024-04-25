import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Fonts } from "../constants/fonts";
import { Colors } from "../constants/colors";
import { Images } from "../constants/images";

const AppSettingMenu = ({
  label,
  value,
  addBorder = false,
  date = false,
  onPress,
}) => {
  return (
    <Pressable
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: "rgba(41, 41, 41, 1)",
        borderBottomWidth: 1,
        padding: label ? 8 : 14,
        marginBottom: 5,
      }}
      onPress={onPress}
    >
      <View
        style={{
          gap: 4,
        }}
      >
        {label && (
          <Text
            style={{
              fontFamily: Fonts.body4.fontFamily,
              fontSize: Fonts.body4.fontSize,
              color: Colors.menu_label,
            }}
          >
            {label}
          </Text>
        )}
        <Text
          style={{
            fontFamily: Fonts.body3.fontFamily,
            fontSize: Fonts.body3.fontSize,
            color: value === "Log Out" ? Colors.primary : Colors.text,
          }}
        >
          {value}
        </Text>
      </View>

      {addBorder && (
        <Image
          source={Images["right-arrow"]}
          style={{ width: 6, height: 12, resizeMode: "contain" }}
        />
      )}

      {date && (
        <Image
          source={Images["calendar-icon"]}
          style={{ width: 28, height: 29, resizeMode: "contain" }}
        />
      )}
    </Pressable>
  );
};

export default AppSettingMenu;

const styles = StyleSheet.create({});
