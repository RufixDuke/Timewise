import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import React from "react";
import Constants from "expo-constants";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";
import { Images } from "../../constants/images";
import EmptyState from "../../components/EmptyState";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import routes from "../../navigations/routes";
import { updateAlarmActiveStatus } from "../../store/AlarmSlice";

const HomeScreen = () => {
  const { alarms } = useSelector((state) => state.alarms);
  const { tasks } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.user);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const currentTime = moment();
  let timeOfDay;

  // Determine time of day based on current hour
  const currentHour = currentTime.hour();
  if (currentHour >= 5 && currentHour < 12) {
    timeOfDay = "Morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    timeOfDay = "Afternoon";
  } else {
    timeOfDay = "Evening";
  }
  const handleUpdateAlarm = (alarm) => {
    dispatch(updateAlarmActiveStatus({ id: alarm.id, active: !alarm.active }));
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        paddingTop: Constants.statusBarHeight + 10,
        paddingHorizontal: 20,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={{
            fontFamily: Fonts.h5.fontFamily,
            fontSize: Fonts.h5.fontSize,
            color: Colors.text,
          }}
        >
          Hello, {user.userName ? user.userName : "Pal"}👋🏾
        </Text>

        <ImageBackground
          source={Images["hero-img"]}
          style={{
            marginTop: 20,
            padding: 16,
            borderRadius: 8,
            overflow: "hidden",
            gap: 24,
          }}
        >
          <View style={{ alignItems: "center", gap: 8 }}>
            <Image
              source={Images.bulb}
              style={{ width: 24, height: 24, resizeMode: "contain" }}
            />
            <Text
              style={{
                fontFamily: Fonts.body1.fontFamily,
                fontSize: Fonts.body1.fontSize,
                color: Colors.white,
              }}
            >
              Good {timeOfDay}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ gap: 8 }}>
              <Text
                style={{
                  fontFamily: Fonts.body1.fontFamily,
                  fontSize: Fonts.body1.fontSize,
                  color: Colors.white,
                }}
              >
                {currentTime.format("dddd")}
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.body4.fontFamily,
                  fontSize: Fonts.body4.fontSize,
                  color: "rgba(97, 97, 97, 1)",
                }}
              >
                {currentTime.format("Do MMMM, YYYY")}
              </Text>
            </View>

            <Pressable
              style={{
                backgroundColor: Colors.white,
                paddingHorizontal: 8,
                height: 40,
                borderRadius: 24,
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
              }}
              onPress={() => navigation.navigate(routes.CREATE_TASK)}
            >
              <Image
                source={Images["add-icon"]}
                style={{ width: 10, height: 10, resizeMode: "contain" }}
              />

              <Text
                style={{
                  fontFamily: Fonts.body3.fontFamily,
                  fontSize: Fonts.body3.fontSize,
                  color: Colors.buttonText,
                }}
              >
                Add Task
              </Text>
            </Pressable>
          </View>
        </ImageBackground>

        <View style={{ marginTop: 32 }}>
          <Text
            style={{
              fontFamily: Fonts.h6.fontFamily,
              fontSize: Fonts.h6.fontSize,
              color: Colors.text,
            }}
          >
            Upcoming Alarms
          </Text>

          {alarms.length === 0 && (
            <EmptyState
              title={"No alarm Set"}
              info={"You don’t have any incoming alarms"}
            />
          )}

          <View style={{ marginTop: 10, paddingHorizontal: 4, gap: 15 }}>
            {alarms
              ?.slice(-2)
              .filter(
                (alarm) =>
                  moment(alarm.date).format("Do MMMM YYYY") ===
                  moment().format("Do MMMM YYYY")
              )
              .map((alarm) => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  key={alarm.id}
                >
                  <View style={{ gap: 5 }}>
                    <Text
                      style={{
                        fontFamily: Fonts.h6.fontFamily,
                        fontSize: Fonts.body2.fontSize,
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
                    value={alarm.active}
                    onValueChange={() => handleUpdateAlarm(alarm)}
                    trackColor={{
                      false: Colors.gray,
                      true: Colors.switch_active,
                    }}
                  />
                </View>
              ))}
          </View>
        </View>

        <View style={{ marginTop: 32 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.h6.fontFamily,
                fontSize: Fonts.h6.fontSize,
                color: Colors.text,
              }}
            >
              Today's Task
            </Text>

            {tasks.length > 0 && (
              <Text
                style={{
                  fontFamily: Fonts.body3.fontFamily,
                  fontSize: Fonts.body3.fontSize,
                  color: Colors.header,
                }}
                onPress={() => navigation.navigate("Alarm")}
              >
                View all
              </Text>
            )}
          </View>

          {(tasks.length === 0 ||
            tasks.filter(
              (task) =>
                moment(task.date).format("Do MMMM YYYY") ===
                moment().format("Do MMMM YYYY")
            ).length === 0) && (
            <EmptyState
              title={"No Task Set"}
              info={"You don’t have any task set"}
              img={Images["empty-task"]}
              containerStyle={{ marginTop: 10 }}
            />
          )}

          {/* .filter(
              (task) =>
                moment(task.date).format("Do MMMM YYYY") ===
                moment().format("Do MMMM YYYY")
            ) */}
          {tasks
            .slice(0)
            .sort((taskA, taskB) => {
              if (taskA.active && !taskB.active) return -1;
              if (!taskA.active && taskB.active) return 1;
              // Sort by start time if both tasks are active or inactive
              return moment(taskA.from) - moment(taskB.from);
            })
            .map((task) => {
              return (
                <Pressable
                  onPress={() =>
                    navigation.navigate(routes.START_TASK_SCREEN, {
                      task: task,
                    })
                  }
                  key={task.id}
                  style={{ marginBottom: 10 }}
                >
                  {task.active ? (
                    <LinearGradient
                      colors={["rgba(154, 112, 29, 1)", "rgba(22, 11, 1, 1)"]}
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
                          {task.completed ? "Completed" : ""}
                          {/* {isActive ? "Active" : ""} */}
                        </Text>
                      </View>
                    </View>
                  )}
                </Pressable>
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
