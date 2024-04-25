import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Colors } from "../constants/colors";
import { Fonts } from "../constants/fonts";
import { Images } from "../constants/images";

function AppTextInput({
  width = "100%",
  label,
  placeholder,
  secure,
  onPress,
  type,
  inputStyles,
  placeholderText,
  tag,
  onFocus,
  onBlur,
  inputContainer,
  gradientColors,
  isDarkMode,
  editable,
  ...otherProps
}) {
  return (
    <KeyboardAvoidingView
      behavior="height"
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
      style={{ width: width, marginBottom: 10 }}
    >
      <Text style={[styles.label, { color: Colors.inputLabelText }]}>
        {label}
      </Text>
      <View
        style={[
          inputContainer,
          styles.container,
          //   { borderRadius: 8 },
        ]}
      >
        <TextInput
          placeholderTextColor={Colors.placeholder}
          editable={!editable}
          style={[
            {
              fontFamily: Fonts.body3.fontFamily,
              fontSize: Fonts.body3.fontSize,
              paddingHorizontal: 16,
              height: 44,
              justifyContent: "center",
              color: Colors.header,
            },
            inputStyles,
          ]}
          placeholder={placeholder}
          keyboardAppearance={"light"}
          secureTextEntry={secure}
          onFocus={onFocus}
          onBlur={onBlur}
          {...otherProps}
        />

        <Pressable style={styles.icon} onPress={onPress}>
          {secure && type && (
            <Image
              source={Images["eye-show"]}
              style={{ width: 24, height: 16, resizeMode: "contain" }}
            />
          )}
          {!secure && type && (
            <Image
              source={Images["eye-show"]}
              style={{ width: 24, height: 16, resizeMode: "contain" }}
            />
          )}
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    position: "relative",
    overflow: "hidden",
    height: 44,
    borderWidth: 1,
    borderRadius: 24,
    backgroundColor: Colors.inputBg,
  },
  icon: {
    marginRight: 10,
    position: "absolute",
    right: 0,
    top: "30%",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontFamily: Fonts.body3.fontFamily,
    fontSize: Fonts.body3.fontSize,
    lineHeight: Fonts.body3.lineHeight,
  },
});

export default AppTextInput;
