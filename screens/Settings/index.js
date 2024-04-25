import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import React from "react";
import Constants from "expo-constants";

import { Fonts } from "../../constants/fonts";
import { Colors } from "../../constants/colors";
import AppSettingMenu from "../../components/AppSettingMenu";
import { useTheme } from "../../hooks/useTheme";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/AuthSlice";
import routes from "../../navigations/routes";

const Settings = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        paddingHorizontal: 20,
        paddingTop: Constants.statusBarHeight + 10,
        // paddingBottom: 30,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flex: 1 }}
      >
        <Text
          style={{
            fontFamily: Fonts.h5.fontFamily,
            fontSize: Fonts.h5.fontSize,
            color: Colors.text,
          }}
        >
          Settings
        </Text>

        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontFamily: Fonts.h5.fontFamily,
              fontSize: Fonts.body1.fontSize,
              color: Colors.text,
            }}
          >
            Personal Information
          </Text>

          <View
            style={{
              backgroundColor: Colors.menu_bg,
              padding: 8,
              borderRadius: 16,
              marginTop: 15,
            }}
          >
            <AppSettingMenu
              label={"Name"}
              value={"Abdul-Qudus Rufai"}
              addBorder
            />

            <AppSettingMenu
              label={"Email"}
              value={"rufixduke09@gmail.com"}
              addBorder
            />

            <AppSettingMenu
              label={"Username"}
              value={"Abdul-Qudus"}
              addBorder
            />

            <AppSettingMenu
              label={"Date of Birth"}
              value={"6th October, 2001"}
              date
            />
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontFamily: Fonts.h5.fontFamily,
              fontSize: Fonts.body1.fontSize,
              color: Colors.text,
            }}
          >
            Others
          </Text>

          <View
            style={{
              backgroundColor: Colors.menu_bg,
              padding: 8,
              borderRadius: 16,
              marginTop: 15,
            }}
          >
            <AppSettingMenu
              label={"Sleep Target"}
              value={"Number of hours you wish to sleep for"}
              addBorder
              onPress={() => navigation.navigate(routes.SLEEP_TARGET_SCREEN)}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 8,
              }}
            >
              <Text
                style={{
                  color: Colors.text,
                  fontFamily: Fonts.body3.fontFamily,
                  fontSize: Fonts.body3.fontSize,
                }}
              >
                Dark Mode
              </Text>

              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                trackColor={{
                  false: Colors.gray,
                  true: Colors.switch_active,
                }}
              />
            </View>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontFamily: Fonts.h5.fontFamily,
              fontSize: Fonts.body1.fontSize,
              color: Colors.text,
            }}
          >
            Rate Us
          </Text>

          <View
            style={{
              backgroundColor: Colors.menu_bg,
              padding: 8,
              borderRadius: 16,
              marginTop: 15,
            }}
          >
            <AppSettingMenu
              label={"Feedback"}
              value={"Give us tips on how we can improve our app"}
              addBorder
            />

            <AppSettingMenu value={"Rate Us"} addBorder />

            <AppSettingMenu
              value={"Log Out"}
              onPress={() => dispatch(logOut())}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
