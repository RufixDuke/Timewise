import {
  ActivityIndicator,
  Alert,
  Animated,
  Image,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Constant from "expo-constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import moment from "moment";

import { Colors } from "../../constants/colors";
import { Images } from "../../constants/images";
import { Fonts } from "../../constants/fonts";
import AppButton from "../../components/AppButton";
import { deleteTask, updateTaskActiveStatus } from "../../store/TaskSlice";
import SwipeableButton from "../../components/AppSwipableButton";

const StartTaskScreen = () => {
  const navigation = useNavigation();
  const { task } = useRoute().params;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const handleSwipe = () => {
    handleCompleteTask(); // Call handleCompleteTask to update the status immediately
    Alert.alert(
      "Congratulations🎉",
      "You have successfully completed the task!",
      [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  const handleStartTask = () => {
    setIsLoading(true);
    dispatch(updateTaskActiveStatus({ id: task.id, active: true }));
    setTimeout(() => {
      navigation.goBack();
      setIsLoading(false);
    }, 2000);
  };

  const handleCompleteTask = () => {
    dispatch(
      updateTaskActiveStatus({ id: task.id, completed: true, active: false })
    );
  };

  const handleDeleteTask = () => {
    setIsDeleteLoading(true);
    dispatch(deleteTask(task.id)); // Dispatch action to delete the task
    setTimeout(() => {
      navigation.goBack();
      setIsDeleteLoading(false);
    }, 2000);
  };

  const calculateTimeDifference = () => {
    const currentTime = moment(task.date);
    const endTime = moment(task.to);

    currentTime.utcOffset(task.date).toDate();
    endTime.utcOffset(task.to).toDate();

    const diffInMilliseconds = endTime.diff(currentTime);
    const secondDiffInMilliseconds = currentTime.diff(endTime);

    const diffDuration = moment.duration(diffInMilliseconds);
    const secondDiffDuration = moment.duration(secondDiffInMilliseconds);
    let hours;
    let minutes;

    if (Math.floor(diffDuration.asHours()) < 0) {
      hours = Math.floor(secondDiffDuration.asHours());
      minutes = Math.floor(secondDiffDuration.asMinutes()) % 60;
    } else {
      hours = Math.floor(diffDuration.asHours());
      minutes = Math.floor(diffDuration.asMinutes()) % 60;
    }

    const formattedTimeDifference = `${hours} hour${
      hours !== 1 ? "s" : ""
    } ${minutes} minute${minutes !== 1 ? "s" : ""}`;

    return formattedTimeDifference;
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

        <Pressable onPress={handleDeleteTask}>
          {isDeleteLoading ? (
            <ActivityIndicator size={"small"} color={Colors.white} />
          ) : (
            <Image
              source={Images["delete-icon"]}
              style={{ width: 18, height: 20, resizeMode: "contain" }}
            />
          )}
        </Pressable>
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
            {calculateTimeDifference()}
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
          {moment(task.date).format("Do MMMM YYYY")} ({task.day})
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
          {task.completed ? "Completed" : task.active ? "Active" : "Inactive"}
        </Text>
      </View>

      <View style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 40 }}>
        {task.active && (
          <View
            style={{
              backgroundColor: "rgba(33, 33, 33, 1)",
              borderRadius: 152,
              position: "relative",
            }}
          >
            <Text
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 20,
                textAlign: "center",
                color: Colors.text,
                fontFamily: Fonts.body3.fontFamily,
                fontSize: Fonts.body3.fontSize,
              }}
            >
              Set as Completed
            </Text>
            <SwipeableButton onSwipeComplete={handleSwipe} />
          </View>
        )}
        {!task.active && (
          <AppButton
            label={task.completed ? "Completed" : "Start Task"}
            onPress={handleStartTask}
            loading={isLoading}
            disabled={task.completed}
          />
        )}
      </View>
    </View>
  );
};

export default StartTaskScreen;

const styles = StyleSheet.create({});
