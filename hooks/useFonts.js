import React, { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

const useFonts = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          Bold: require("../assets/fonts/CircularSpotifyText-Bold.otf"),
          Book: require("../assets/fonts/CircularSpotifyText-Book.otf"),
          Medium: require("../assets/fonts/CircularSpotifyText-Medium.otf"),
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
        setAppIsReady(true);
      }
    }

    prepare();
  }, [appIsReady]);

  return appIsReady;
};

export default useFonts;
