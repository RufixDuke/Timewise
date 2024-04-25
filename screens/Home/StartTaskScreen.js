import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Constant from "expo-constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import moment from "moment";

import { Colors } from "../../constants/colors";
import { Images } from "../../constants/images";
import { Fonts } from "../../constants/fonts";
import AppButton from "../../components/AppButton";
import { updateTaskActiveStatus } from "../../store/TaskSlice";

const StartTaskScreen = () => {
  const navigation = useNavigation();
  const { task } = useRoute().params;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleStartTask = () => {
    setIsLoading(true);
    dispatch(updateTaskActiveStatus({ id: task.id, isActive: true }));
    setTimeout(() => {
      navigation.goBack();
      setIsLoading(false);
    }, 2000);
  };

  const calculateTimeDifference = () => {
    const currentTime = moment();
    const endTime = moment(task.to);

    // Ensure both times are in the same timezone
    // Adjust if needed based on your timezone requirements
    currentTime.utcOffset(task.to);

    // Calculate the difference in hours
    const diffInHours = endTime.diff(currentTime, "hours");

    return diffInHours;
  };

  return (
    <View
      style={{
        backgroundColor: Colors.background,
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: Constant.statusBarHeight + 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 16,
          marginTop: 20,
        }}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            source={Images["back-icon"]}
            style={{ width: 6, height: 12, resizeMode: "contain" }}
          />
        </Pressable>

        <Text></Text>

        <Image
          source={Images["delete-icon"]}
          style={{ width: 18, height: 20, resizeMode: "contain" }}
        />
      </View>

      <Text
        style={{
          fontFamily: Fonts.h3.fontFamily,
          fontSize: Fonts.h3.fontSize,
          color: Colors.text,
          marginTop: 30,
        }}
      >
        {task.name}
      </Text>

      <View style={{ marginTop: 30, gap: 16 }}>
        <Text
          style={{
            fontFamily: Fonts.body3.fontFamily,
            fontSize: Fonts.body3.fontSize,
            color: Colors.inputLabelText,
          }}
        >
          Description
        </Text>

        <Text
          style={{
            fontFamily: Fonts.body2.fontFamily,
            fontSize: Fonts.body2.fontSize,
            color: Colors.text,
          }}
        >
          {task.description}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <View style={{ marginTop: 30, gap: 16 }}>
          <Text
            style={{
              fontFamily: Fonts.body3.fontFamily,
              fontSize: Fonts.body3.fontSize,
              color: Colors.inputLabelText,
            }}
          >
            Time Assigned
          </Text>

          <Text
            style={{
              fontFamily: Fonts.body2.fontFamily,
              fontSize: Fonts.body2.fontSize,
              color: Colors.text,
            }}
          >
            {task.duration} hours
          </Text>
        </View>

        <View style={{ marginTop: 30, gap: 16, marginRight: 50 }}>
          <Text
            style={{
              fontFamily: Fonts.body3.fontFamily,
              fontSize: Fonts.body3.fontSize,
              color: Colors.inputLabelText,
            }}
          >
            Time Left
          </Text>

          <Text
            style={{
              fontFamily: Fonts.body2.fontFamily,
              fontSize: Fonts.body2.fontSize,
              color: Colors.text,
            }}
          >
            {calculateTimeDifference()} hours
          </Text>
        </View>
      </View>

      <View style={{ marginTop: 30, gap: 16, marginRight: 50 }}>
        <Text
          style={{
            fontFamily: Fonts.body3.fontFamily,
            fontSize: Fonts.body3.fontSize,
            color: Colors.inputLabelText,
          }}
        >
          Created
        </Text>

        <Text
          style={{
            fontFamily: Fonts.body2.fontFamily,
            fontSize: Fonts.body2.fontSize,
            color: Colors.text,
          }}
        >
          {task.day}
        </Text>
      </View>

      <View style={{ marginTop: 30, gap: 16, marginRight: 50 }}>
        <Text
          style={{
            fontFamily: Fonts.body3.fontFamily,
            fontSize: Fonts.body3.fontSize,
            color: Colors.inputLabelText,
          }}
        >
          Status
        </Text>

        <Text
          style={{
            fontFamily: Fonts.body2.fontFamily,
            fontSize: Fonts.body2.fontSize,
            color: Colors.text,
          }}
        >
          {task.active ? "Active" : "Inactive"}
        </Text>
      </View>

      <View style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 40 }}>
        <AppButton
          label={"Start Task"}
          onPress={handleStartTask}
          loading={isLoading}
        />
      </View>
    </View>
  );
};

export default StartTaskScreen;

const styles = StyleSheet.create({});
