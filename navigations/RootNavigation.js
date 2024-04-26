import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";

import { useTheme } from "../hooks/useTheme";
import AppStack from "./AppNavigator";
import AuthStack, { WelcomeStack } from "./AuthNavigator";

const RootNavigation = () => {
  const { auth } = useSelector((state) => state.isAuth);
  const [isAppReady, setAppIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAppIsReady(true);
    }, 3000); // Adjust this time according to your welcome screen duration
  }, []);
  return (
    <>
      {!isAppReady ? <WelcomeStack /> : !auth ? <AuthStack /> : <AppStack />}
      <StatusBar style={"light"} />
    </>
  );
};

export default RootNavigation;
