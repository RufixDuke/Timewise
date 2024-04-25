import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dimensions, Image } from "react-native";

import { Colors } from "../constants/colors";
import { Fonts } from "../constants/fonts";
import HomeScreen from "../screens/Home";
import Task from "../screens/Tasks";
import Settings from "../screens/Settings";

const Tab = createBottomTabNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? (
              <Image
                source={require("../assets/icons/home-filled.png")}
                style={{ width: 24, height: 24, resizeMode: "contain" }}
              />
            ) : (
              <Image
                source={require("../assets/icons/home.png")}
                style={{ width: 24, height: 24, resizeMode: "contain" }}
              />
            );
          } else if (route.name === "Alarm") {
            iconName = focused ? (
              <Image
                source={require("../assets/icons/alarm-filled.png")}
                style={{ width: 24, height: 24, resizeMode: "contain" }}
              />
            ) : (
              <Image
                source={require("../assets/icons/alarm.png")}
                style={{ width: 24, height: 24, resizeMode: "contain" }}
              />
            );
          } else {
            iconName = focused ? (
              <Image
                source={require("../assets/icons/settings-filled.png")}
                style={{ width: 24, height: 24, resizeMode: "contain" }}
              />
            ) : (
              <Image
                source={require("../assets/icons/settings.png")}
                style={{ width: 24, height: 24, resizeMode: "contain" }}
              />
            );
          }

          return iconName;
        },
        tabBarStyle: {
          height: Dimensions.get("window").height / 11,
          backgroundColor: Colors.background,
          paddingHorizontal: 15,
          elevation: 0,
          shadowOpacity: 1,
          shadowOffset: { width: 20, height: 20 },
          shadowRadius: 8,
          shadowColor: "#EDEDED1A",
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: Colors.white,
        tabBarLabelStyle: {
          fontFamily: Fonts.body4.fontFamily,
          fontSize: Fonts.body4.fontSize,
          letterSpacing: Fonts.body4.letterSpacing,
        },
        tabBarInactiveTintColor: Colors.gray,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Alarm" component={Task} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default TabStack;
