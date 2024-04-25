import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import ForgotPassword from "../screens/Auth/ForgotPassword";
import WelcomeScreen from "../screens/Auth/WelcomeScreen";
import OnboardingScreen from "../screens/Auth/OnboardingScreen";

const Stack = createNativeStackNavigator();

export const WelcomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={"Onboarding"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen component={LoginScreen} name="Login" />
      <Stack.Screen component={RegisterScreen} name="Register" />
      <Stack.Screen component={ForgotPassword} name="ForgotPassword" />
    </Stack.Navigator>
  );
};

export default AuthStack;
