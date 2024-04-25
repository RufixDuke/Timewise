import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";

const WelcomeScreen = () => {
  return (
    <ImageBackground
      source={require("../../assets/icons/bg.png")}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Image
        source={require("../../assets/icons/logo.png")}
        style={{ width: 145, height: 51, resizeMode: "contain" }}
      />
    </ImageBackground>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});
