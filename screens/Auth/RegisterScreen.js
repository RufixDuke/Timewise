import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import Constants from "expo-constants";

import { Images } from "../../constants/images";
import AppHeader from "../../components/AppHeader";
import AppTextInput from "../../components/AppTextInput";
import AppButton from "../../components/AppButton";
import routes from "../../navigations/routes";
import { useNavigation } from "@react-navigation/native";
import { Fonts } from "../../constants/fonts";
import { Colors } from "../../constants/colors";

const RegisterScreen = () => {
  const [secure, setSecure] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);
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
      <KeyboardAvoidingView behavior="height">
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Image
            source={Images.logo}
            style={{ width: 127, height: 37, resizeMode: "contain" }}
          />
        </View>

        <AppHeader
          title={"Sign Up"}
          info={
            "It’s nice to see someone taking a step to become more productive"
          }
        />

        <ScrollView style={{ marginTop: 30 }}>
          <AppTextInput
            label={"Username"}
            placeholder={"Enter your username"}
            keyboardType={"default"}
            returnKeyType={"next"}
            autoComplete={"name"}
            autoCapitalize={"none"}
          />

          <AppTextInput
            label={"Email"}
            placeholder={"Enter your Email"}
            keyboardType={"email-address"}
            returnKeyType={"next"}
            autoComplete={"email"}
            autoCapitalize={"none"}
          />

          <AppTextInput
            label={"Password"}
            placeholder={"Enter your password"}
            keyboardType={"default"}
            returnKeyType={"done"}
            autoComplete={"current-password"}
            autoCapitalize={"none"}
            secure={secure}
            onPress={() => setSecure(!secure)}
            type={"password"}
          />

          <AppTextInput
            label={"Confirm Password"}
            placeholder={"Enter your password"}
            keyboardType={"default"}
            returnKeyType={"done"}
            autoComplete={"current-password"}
            autoCapitalize={"none"}
            secure={secureConfirm}
            onPress={() => setSecureConfirm(!secureConfirm)}
            type={"password"}
          />
          <View style={{ gap: 20 }}>
            <AppButton
              label={"Login"}
              onPress={() => navigation.navigate(routes.FORGOT_PASSWORD_SCREEN)}
            />

            <Text
              style={{
                color: "rgba(172, 172, 172, 1)",
                fontFamily: Fonts.body4.fontFamily,
                fontSize: Fonts.body4.fontSize,
                textAlign: "center",
              }}
            >
              Or, Sign up with
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 40,
                marginBottom: 20,
              }}
            >
              <Image
                source={Images.facebook}
                style={{ width: 44, height: 44, resizeMode: "contain" }}
              />
              <Image
                source={Images.google}
                style={{ width: 44, height: 44, resizeMode: "contain" }}
              />
            </View>
          </View>

          <View
            style={{
              flex: 1,
            }}
          >
            <Text
              style={{
                color: Colors.gray,
                fontFamily: Fonts.body2.fontFamily,
                fontSize: Fonts.body2.fontSize,
                textAlign: "center",
              }}
            >
              Already have an account?{" "}
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
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
