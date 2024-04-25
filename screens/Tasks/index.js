import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import moment from "moment";

import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";
import EmptyState from "../../components/EmptyState";
import { Images } from "../../constants/images";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../hooks/useTheme";
import { useSelector } from "react-redux";
import routes from "../../navigations/routes";
import { LinearGradient } from "expo-linear-gradient";
import { isCurrentDay, isTaskActive } from "../../utils";

const Days = [
  { label: "Mon", value: "Monday" },
  { label: "Tue", value: "Tuesday" },
  { label: "Wed", value: "Wednesday" },
  { label: "Thur", value: "Thursday" },
  { label: "Fri", value: "Friday" },
  { label: "Sat", value: "Saturday" },
  { label: "Sun", value: "Sunday" },
];

const Task = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [activeLink, setActiveLink] = useState("Quick Alarm");
  const navigation = useNavigation();
  const { alarms } = useSelector((state) => state.alarms);
  const { tasks } = useSelector((state) => state.tasks);

  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedDayValue, setSelectedDayValue] = useState("");

  const handleDayPress = (index, value) => {
    setSelectedDayIndex(index);
    setSelectedDayValue(value);
  };

  useEffect(() => {
    const currentDayIndex = 0; // Moment.js day() returns 1 for Monday, 2 for Tuesday, and so on
    setSelectedDayIndex(currentDayIndex);
    setSelectedDayValue(Days[currentDayIndex].value);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        paddingHorizontal: 20,
        paddingTop: Constants.statusBarHeight + 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontFamily: Fonts.h5.fontFamily,
            fontSize: Fonts.h5.fontSize,
            color: Colors.text,
          }}
        >
          Alarm
        </Text>

        <Image
          source={Images["calendar-icon"]}
          style={{
            width: 30,
            height: 30,
            resizeMode: "contain",
            tintColor: "rgba(181, 181, 181, 1)",
          }}
        />
      </View>

      <View style={[styles.headerBar, { backgroundColor: Colors.menu_bg }]}>
        <View style={styles.navbar}>
          <Pressable
            style={[
              styles.mapViewDarkMode,
              activeLink === "Quick Alarm" && {
                backgroundColor: "rgba(75, 75, 75, 1)",
              },
            ]}
            onPress={() => setActiveLink("Quick Alarm")}
          >
            <Text
              style={{
                color:
                  activeLink === "Quick Alarm"
                    ? Colors.white
                    : "rgba(181, 181, 181, 1)",
                fontFamily: Fonts.h6.fontFamily,
                fontSize: Fonts.body2.fontSize,
              }}
            >
              Quick Alarms
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.mapViewDarkMode,
              activeLink === "Task" && {
                backgroundColor: "#363636",
              },
            ]}
            onPress={() => setActiveLink("Task")}
          >
            <Text
              style={{
                color:
                  activeLink === "Task"
                    ? Colors.white
                    : "rgba(181, 181, 181, 1)",
                fontFamily: Fonts.h6.fontFamily,
                fontSize: Fonts.body2.fontSize,
              }}
            >
              Tasks
            </Text>
          </Pressable>
        </View>
      </View>

      {alarms.length === 0 && activeLink === "Quick Alarm" ? (
        <View style={{ flex: 1, justifyContent: "center", marginBottom: 100 }}>
          <EmptyState
            title={"No alarm set"}
            img={Images["empty-alarm"]}
            info={"You don’t have any incoming alarms"}
            showButton
            btnText={"Add Alarm"}
            onPress={() => navigation.navigate(routes.CREATE_ALARM)}
          />
        </View>
      ) : tasks.length === 0 && activeLink === "Task" ? (
        <View style={{ flex: 1, justifyContent: "center", marginBottom: 100 }}>
          <EmptyState
            title={"No Task set"}
            img={Images["empty-task"]}
            info={"You don’t have any task for today"}
            showButton
            btnText={"Add Task"}
            onPress={() => navigation.navigate(routes.CREATE_TASK)}
          />
        </View>
      ) : null}

      {activeLink === "Quick Alarm" ? (
        <View style={{ marginTop: 20 }}>
          {alarms?.map((alarm) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
              key={alarm.id}
            >
              <View style={{ gap: 8 }}>
                <Text
                  style={{
                    fontFamily: Fonts.h6.fontFamily,
                    fontSize: Fonts.h6.fontSize,
                    color: Colors.white,
                  }}
                >
                  {alarm.time}
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.body4.fontFamily,
                    fontSize: Fonts.body4.fontSize,
                    color: Colors.menu_label,
                  }}
                >
                  {alarm.day} | {alarm.duration}
                </Text>
              </View>

              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                trackColor={{
                  false: Colors.gray,
                  true: Colors.switch_active,
                }}
              />
            </View>
          ))}
        </View>
      ) : (
        <View style={{ marginTop: 20 }}>
          <ScrollView horizontal>
            {Days.map((day, index) => (
              <Pressable
                key={day.label}
                style={{ width: 30, marginRight: 44 }}
                onPress={() => handleDayPress(index, day.value)}
              >
                <Text
                  style={{
                    fontFamily: Fonts.body3.fontFamily,
                    fontSize: Fonts.body3.fontSize,
                    color:
                      index === selectedDayIndex
                        ? Colors.text
                        : "rgba(118, 118, 118, 1)",
                  }}
                >
                  {day.label}
                </Text>
                {index === selectedDayIndex && (
                  <Image
                    source={Images.dot}
                    style={{
                      width: 5,
                      height: 5,
                      resizeMode: "contain",
                      marginTop: 5,
                    }}
                  />
                )}
              </Pressable>
            ))}
          </ScrollView>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginTop: 20, gap: 16, flex: 1 }}>
              {tasks
                .slice(0)
                .filter((task) => task.day === selectedDayValue)
                .sort((taskA, taskB) => {
                  if (taskA.active && !taskB.active) return -1;
                  if (!taskA.active && taskB.active) return 1;
                  // Sort by start time if both tasks are active or inactive
                  return moment(taskA.from) - moment(taskB.from);
                })
                .map((task) => {
                  return (
                    <View key={task.id}>
                      {task.active ? (
                        <LinearGradient
                          colors={[
                            "rgba(154, 112, 29, 1)",
                            "rgba(22, 11, 1, 1)",
                          ]}
                          start={{ x: 0, y: 0 }} // Adjust the start point for left to right gradient
                          end={{ x: 0, y: 1 }}
                          key={task.id}
                          style={{ padding: 16, borderRadius: 8, gap: 12 }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text
                              style={{
                                fontFamily: Fonts.h6.fontFamily,
                                fontSize: Fonts.body2.fontSize,
                                color: Colors.text,
                              }}
                            >
                              {task.name}
                            </Text>

                            <Text
                              style={{
                                fontFamily: Fonts.h6.fontFamily,
                                fontSize: Fonts.body2.fontSize,
                                color: Colors.text,
                              }}
                            >
                              {task.duration}{" "}
                              {task.duration === 1 ? "hour" : "hours"}
                            </Text>
                          </View>

                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text
                              style={{
                                fontFamily: Fonts.body4.fontFamily,
                                fontSize: Fonts.body4.fontSize,
                                color: "rgba(160, 160, 160, 1)",
                              }}
                            >
                              {moment(task.from).format("HH:mm")} -{" "}
                              {moment(task.to).format("HH:mm")}
                            </Text>

                            <Text
                              style={{
                                fontFamily: Fonts.body4.fontFamily,
                                fontSize: Fonts.body4.fontSize,
                                color: '"rgba(160, 160, 160, 1)"',
                              }}
                            >
                              {task.active ? "Active" : ""}
                            </Text>
                          </View>
                        </LinearGradient>
                      ) : (
                        <View
                          style={{
                            padding: 16,
                            borderRadius: 8,
                            gap: 12,
                            backgroundColor: Colors.group_bg,
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text
                              style={{
                                fontFamily: Fonts.h6.fontFamily,
                                fontSize: Fonts.body2.fontSize,
                                color: Colors.text,
                              }}
                            >
                              {task.name}
                            </Text>

                            <Text
                              style={{
                                fontFamily: Fonts.h6.fontFamily,
                                fontSize: Fonts.body2.fontSize,
                                color: Colors.text,
                              }}
                            >
                              {task.duration}{" "}
                              {task.duration === 1 ? "hour" : "hours"}
                            </Text>
                          </View>

                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text
                              style={{
                                fontFamily: Fonts.body4.fontFamily,
                                fontSize: Fonts.body4.fontSize,
                                color: "rgba(160, 160, 160, 1)",
                              }}
                            >
                              {moment(task.from).format("HH:mm")} -{" "}
                              {moment(task.to).format("HH:mm")}
                            </Text>

                            <Text
                              style={{
                                fontFamily: Fonts.body4.fontFamily,
                                fontSize: Fonts.body4.fontSize,
                                color: '"rgba(160, 160, 160, 1)"',
                              }}
                            >
                              {/* {isActive ? "Active" : ""} */}
                            </Text>
                          </View>
                        </View>
                      )}
                    </View>
                  );
                })}
            </View>
          </ScrollView>
        </View>
      )}

      {activeLink === "Quick Alarm" && alarms.length > 0 && (
        <Pressable
          style={styles.plus}
          onPress={() => navigation.navigate(routes.CREATE_ALARM)}
        >
          <Image
            source={Images["add-icon"]}
            style={{
              width: 16,
              height: 16,
              resizeMode: "cover",
              alignSelf: "center",
            }}
          />
        </Pressable>
      )}

      {activeLink === "Task" && tasks.length > 0 && (
        <Pressable
          style={styles.plus}
          onPress={() => navigation.navigate(routes.CREATE_TASK)}
        >
          <Image
            source={Images["add-icon"]}
            style={{
              width: 16,
              height: 16,
              resizeMode: "cover",
              alignSelf: "center",
            }}
          />
        </Pressable>
      )}
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 32,
    padding: 8,
  },
  mapViewDarkMode: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    width: "48%",
    height: 53,
  },
  headerBar: {
    borderRadius: 32,
    marginTop: 20,
  },
  header: {
    fontFamily: Fonts.h3.fontFamily,
    fontSize: Fonts.h3.fontSize,
    marginHorizontal: 20,
  },
  plus: {
    backgroundColor: Colors.text,
    width: 48,
    height: 48,
    position: "absolute",
    bottom: 40,
    right: 20,
    borderRadius: 24,
    justifyContent: "center",
  },
});
