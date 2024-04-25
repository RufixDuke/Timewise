import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import { Colors } from "../constants/colors";
import { Fonts } from "../constants/fonts";

const AppButton = ({
  label,
  onPress,
  secondary = false,
  disabled = false,
  type = false,
  loading,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };
  return (
    <Pressable
      onPress={onPress}
      style={[
        type && { marginHorizontal: 10 },
        isPressed && styles.btnPressed,
        secondary ? styles.signBtn : styles.btn,
        disabled && styles.disabled,
        secondary && {
          //   backgroundColor: isDarkMode ? Colors.goldenD : Colors.goldenL,
          height: 44,
          justifyContent: "center",
        },
        // disabled && secondary && styles.secondaryDisabled,
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
    >
      {loading ? (
        <ActivityIndicator size={"small"} color={Colors.background} />
      ) : (
        <Text
          style={[
            type && { color: Colors.goldenO },
            disabled && styles.disabledText,
            {
              color: Colors.background,
              fontFamily: Fonts.buttonText2.fontFamily,
              textAlign: "center",
              fontSize: Fonts.buttonText2.fontSize,
            },
          ]}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.white,
    height: 44,
    justifyContent: "center",
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  btnPressed: {
    backgroundColor: Colors.background,
  },
  signBtn: {
    // marginTop: 10,
    borderWidth: 0,
    borderRadius: 4,
  },
  disabled: {
    backgroundColor: Colors.gray,
  },
  disabledText: {
    color: Colors.white,
  },
});
