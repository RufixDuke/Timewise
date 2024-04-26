import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import Swiper from "react-native-swiper";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";

import AppSwiperContent from "../../components/AppSwiperContent";
import AppButton from "../../components/AppButton";
import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";
import routes from "../../navigations/routes";
// import routes from "../../navigations/routes";
// import { useTheme } from "../../hooks/useTheme";

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  //   const { isDarkMode } = useTheme();

  let swiperRef = useRef(null);
  const navigation = useNavigation();

  const handleScrollBy = (index) => {
    swiperRef.current.scrollBy(index, true); // Pass `true` for animated scroll
    setCurrentIndex(index);
  };

  const handleIndexChanged = (index) => {
    setCurrentIndex(index); // Update the current index when user swipes manually
  };

  const handleClick = () => {
    const newIndex = currentIndex + 1;
    if (currentIndex === 2) return false;
    handleScrollBy(newIndex);
  };
  return (
    <ImageBackground
      style={{
        flex: 1,
        paddingTop: Constants.statusBarHeight + 20,
        paddingHorizontal: 20,
        paddingBottom: 20,
      }}
      source={require("../../assets/icons/screen_bg.png")}
    >
      <View
        style={{
          alignSelf: "flex-end",
          backgroundColor: "rgba(53, 53, 53, 1)",
          padding: 8,
          borderRadius: 16,
          width: 64,
          //   right: 20,
          borderColor: "rgba(224, 224, 224, 1)",
          borderWidth: 1,
        }}
      >
        <Text style={{ color: "rgba(224, 224, 224, 1)", textAlign: "center" }}>
          {currentIndex + 1} of 3
        </Text>
      </View>
      <Swiper
        loop={false}
        showsPagination={false}
        ref={swiperRef}
        onIndexChanged={handleIndexChanged}
        // style={{ flex: 1 }}
      >
        <View style={styles.slide1}>
          <View
            style={{
              padding: 20,
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../../assets/icons/onboard1.png")}
                style={{ width: "90%", height: 212, resizeMode: "contain" }}
              />
            </View>
            <View style={{ marginBottom: 70 }}>
              <Text
                style={{
                  color: Colors.text,
                  fontSize: Fonts.h5.fontSize,
                  fontFamily: Fonts.h5.fontFamily,
                  textAlign: "center",
                }}
              >
                Set your sleep targets
              </Text>
              <Text
                style={{
                  color: Colors.gray,
                  fontSize: Fonts.body2.fontSize,
                  fontFamily: Fonts.body2.fontFamily,
                  marginTop: 15,
                  textAlign: "center",
                }}
              >
                Get the rest you need with personalized sleep targets.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.slide1}>
          <View
            style={{
              padding: 20,
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <View style={{ alignItems: "center", paddingBottom: 25 }}>
              <Image
                source={require("../../assets/icons/onboard2.png")}
                style={{ width: "90%", height: 212, resizeMode: "contain" }}
              />
            </View>
            <View style={{ marginBottom: 70 }}>
              <Text
                style={{
                  color: Colors.text,
                  fontSize: Fonts.h5.fontSize,
                  fontFamily: Fonts.h5.fontFamily,
                  textAlign: "center",
                }}
              >
                Enjoy a Fun Wake-Up Experience
              </Text>
              <Text
                style={{
                  color: Colors.gray,
                  fontSize: Fonts.body2.fontSize,
                  fontFamily: Fonts.body2.fontFamily,
                  marginTop: 15,
                  textAlign: "center",
                }}
              >
                Say goodbye to groggy mornings and hello to a playful wake-up
                call.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.slide1}>
          <View
            style={{
              padding: 20,
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <View style={{ alignItems: "center", paddingBottom: 25 }}>
              <Image
                source={require("../../assets/icons/onboard3.png")}
                style={{ width: "90%", height: 212, resizeMode: "contain" }}
              />
            </View>
            <View style={{ marginBottom: 70 }}>
              <Text
                style={{
                  color: Colors.text,
                  fontSize: Fonts.h5.fontSize,
                  fontFamily: Fonts.h5.fontFamily,
                  textAlign: "center",
                }}
              >
                Manage Your Time with Ease
              </Text>
              <Text
                style={{
                  color: Colors.gray,
                  fontSize: Fonts.body2.fontSize,
                  fontFamily: Fonts.body2.fontFamily,
                  marginTop: 15,
                  textAlign: "center",
                }}
              >
                We help you manage your time and stay on top of your schedule.
              </Text>
            </View>
          </View>
        </View>
      </Swiper>

      <View style={{ gap: 12, marginBottom: 50 }}>
        <AppButton
          label={"Login"}
          onPress={() => navigation.navigate(routes.LOGIN_SCREEN)}
        />
        <Text
          style={{
            color: Colors.gray,
            fontFamily: Fonts.body3.fontFamily,
            fontSize: Fonts.body3.fontSize,
            textAlign: "center",
          }}
          onPress={() => navigation.navigate(routes.REGISTER_SCREEN)}
        >
          Don't have an account?{" "}
          <Text
            style={{
              color: Colors.text,
              fontFamily: Fonts.h1.fontFamily,
              fontSize: Fonts.body3.fontSize,
            }}
          >
            Create One
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  slide1: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "space-between",
  },
  slide2: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "space-between",
  },
  slide3: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "space-around",
  },
  paginationStyle: {
    marginHorizontal: 30,
    bottom: -40,
  },
});
