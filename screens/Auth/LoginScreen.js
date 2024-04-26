import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import Constants from "expo-constants";
import { Images } from "../../constants/images";
import AppHeader from "../../components/AppHeader";
import AppTextInput from "../../components/AppTextInput";
import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";
import AppButton from "../../components/AppButton";
import { useNavigation } from "@react-navigation/native";
import routes from "../../navigations/routes";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/AuthSlice";
import { setUser } from "../../store/UserSlice";

const LoginScreen = () => {
  const [secure, setSecure] = useState(true);
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const handleLogin = () => {
    if (user.password === password && user.email === email) {
      dispatch(login());
      dispatch(setUser({ ...user, email, password }));
    } else if (user.email !== email) {
      Alert.alert("Error", "Email is incorrect", [{ text: "OK" }]);
    } else if (user.password !== password) {
      Alert.alert("Error", "Password is incorrect", [{ text: "OK" }]);
    }
  };
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
        title={"Welcome Back"}
        info={"We're glad to have you here again. 😁."}
      />

      <View style={{ marginTop: 30 }}>
        <AppTextInput
          label={"Email"}
          placeholder={"Enter your Email"}
          keyboardType={"email-address"}
          returnKeyType={"next"}
          autoComplete={"email"}
          autoCapitalize={"none"}
          value={email}
          onChangeText={(text) => setEmail(text)}
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
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <Text
        style={{
          alignSelf: "flex-end",
          color: Colors.gray,
          fontFamily: Fonts.body3.fontFamily,
          fontSize: Fonts.body3.fontSize,
        }}
        onPress={() => navigation.navigate(routes.FORGOT_PASSWORD_SCREEN)}
      >
        Forgot Password?
      </Text>

      <View style={{ marginTop: 40, gap: 20 }}>
        <AppButton label={"Login"} onPress={handleLogin} />

        <Text
          style={{
            color: "rgba(172, 172, 172, 1)",
            fontFamily: Fonts.body4.fontFamily,
            fontSize: Fonts.body4.fontSize,
            textAlign: "center",
          }}
        >
          Or, Login with
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
          justifyContent: "flex-end",
          paddingBottom: 70,
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
          Don't have an account?{" "}
          <Text
            style={{
              color: Colors.text,
              fontFamily: Fonts.h1.fontFamily,
              fontSize: Fonts.body2.fontSize,
            }}
            onPress={() => navigation.navigate(routes.REGISTER_SCREEN)}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
