import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import Constants from "expo-constants";

import { Images } from "../../constants/images";
import AppHeader from "../../components/AppHeader";
import AppTextInput from "../../components/AppTextInput";
import AppButton from "../../components/AppButton";
import { Fonts } from "../../constants/fonts";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import routes from "../../navigations/routes";

const ForgotPassword = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={Images["screen-bg"]}
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: Constants.statusBarHeight,
      }}
    >
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Image
          source={Images.logo}
          style={{ width: 127, height: 37, resizeMode: "contain" }}
        />
      </View>

      <AppHeader
        title={"Forgot Password"}
        info={"Don’t worry, it happens to the best of us."}
      />

      <View style={{ marginTop: 30 }}>
        <AppTextInput
          label={"Email"}
          placeholder={"Enter your Email"}
          keyboardType={"email-address"}
          returnKeyType={"done"}
          autoComplete={"email"}
          autoCapitalize={"none"}
        />
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          paddingBottom: 80,
          gap: 20,
        }}
      >
        <AppButton
          label={"Reset Password"}
          onPress={() => navigation.navigate(routes.LOGIN_SCREEN)}
        />

        <Text
          style={{
            color: Colors.gray,
            fontFamily: Fonts.body2.fontFamily,
            fontSize: Fonts.body2.fontSize,
            textAlign: "center",
          }}
        >
          Remember your password?{" "}
          <Text
            style={{
              color: Colors.text,
              fontFamily: Fonts.h1.fontFamily,
              fontSize: Fonts.body2.fontSize,
            }}
            onPress={() => navigation.navigate(routes.LOGIN_SCREEN)}
          >
            Login
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
