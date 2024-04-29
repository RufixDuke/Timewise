import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as DocumentPicker from "expo-document-picker";

import { Colors } from "../../constants/colors";
import { Images } from "../../constants/images";
import { Fonts } from "../../constants/fonts";
import AppTextInput from "../../components/AppTextInput";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../hooks/useTheme";
import AppButton from "../../components/AppButton";
import { calculateTimeRemaining } from "../../utils";
import routes from "../../navigations/routes";
import { useDispatch, useSelector } from "react-redux";
import { addAlarm } from "../../store/AlarmSlice";

const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

// Define groups of days
const groups = [
  [days[0], days[1]],
  [days[2], days[3], days[4]],
  [days[5], days[6]],
];

const CreateAlarm = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [date, setDate] = useState(new Date());
  const [audioUrl, setAudioUrl] = useState("");
  const [audioName, setAudioName] = useState("");
  const navigation = useNavigation();
  const [showClock, setShowClock] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const dispatch = useDispatch();
  const { alarms } = useSelector((state) => state.alarms);

  date.setHours(date.getHours());
  date.setMinutes(date.getMinutes());

  const timeRemaining = calculateTimeRemaining(date);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    if (Platform.OS === "android") {
      setShowClock(false);
    }
  };

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  const pickAudio = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "audio/*", // Specify the MIME type for audio files
      });

      if (!result.canceled) {
        // Handle the selected audio file
        if (result.assets[0].size > 3000000) {
          Alert.alert(
            "Error",
            "Audio file should not be more than 3MB, kindly choose another"
          );
        } else {
          setAudioUrl(result.assets[0].url);
          setAudioName(result.assets[0].name);
        }
      } else {
        Alert.alert("Error", "Error selecting the ringtone for the alarm");
      }
    } catch (error) {
      console.error("Error while picking document:", error);
    }
  };

  useEffect(() => {
    if (Platform.OS === "android") {
      setShowClock(false);
    } else {
      setShowClock(true);
    }
  }, []);

  const renderItem = (item, group) => {
    const isSelected = selectedDay === item;
    return (
      <Pressable
        style={[
          styles.dayButton,
          isSelected && styles.selectedDay,
          {
            width: group.length === 2 ? 140 : 89,
          },
        ]}
        onPress={() => setSelectedDay(item)}
      >
        <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>
          {item}
        </Text>
      </Pressable>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        paddingHorizontal: 20,
        paddingTop: Constants.statusBarHeight + 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            source={Images["back-icon"]}
            style={{ width: 6, height: 12, resizeMode: "contain" }}
          />
        </Pressable>

        <Text
          style={{
            fontFamily: Fonts.h6.fontFamily,
            fontSize: Fonts.h6.fontSize,
            color: Colors.white,
          }}
        >
          Create Alarm
        </Text>

        <Text></Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {Platform.OS === "android" && (
            <View style={{ gap: 4, marginTop: 20, marginBottom: 10 }}>
              <Text style={styles.label}>Select Time</Text>
              <Pressable
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: Colors.inputBg,
                  height: 44,
                  borderRadius: 24,
                  paddingHorizontal: 16,
                }}
                onPress={() => setShowClock(true)}
              >
                <Text
                  style={{
                    fontFamily: Fonts.body3.fontFamily,
                    fontSize: Fonts.body3.fontSize,
                    color: Colors.white,
                  }}
                >
                  {formattedTime}
                </Text>
                <Image
                  source={Images["dropdown-img"]}
                  style={{ width: 16, height: 16, resizeMode: "contain" }}
                />
              </Pressable>
            </View>
          )}
          {showClock && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={"time"}
              is24Hour={false}
              display={"spinner"}
              onChange={onChange}
              style={{
                backgroundColor: Colors.background,
                height: 300,
              }}
              accentColor={Colors.white}
              textColor={Colors.white}
            />
          )}

          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Image
              source={Images.info}
              style={{ width: 20, height: 20, resizeMode: "contain" }}
            />
            <Text
              style={{
                fontFamily: Fonts.body3.fontFamily,
                fontSize: Fonts.body3.fontSize,
                color: Colors.text,
              }}
            >
              {timeRemaining}
            </Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 20,
            backgroundColor: Colors.group_bg,
            padding: 8,
            borderRadius: 16,
          }}
        >
          <Pressable
            style={{
              padding: 8,
              marginBottom: 5,
            }}
          >
            <AppTextInput
              label={"Label (Optional)"}
              placeholder={"Enter your Alarm label"}
              keyboardType={"default"}
              returnKeyType={"next"}
              autoComplete={"name"}
              autoCapitalize={"none"}
            />

            <View
              style={{
                gap: 4,
                borderTopColor: "rgba(41, 41, 41, 1)",
                borderTopWidth: 1,
                paddingTop: 10,
              }}
            >
              <Text style={styles.label}>Ringtone</Text>
              <Pressable
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: Colors.inputBg,
                  height: 44,
                  borderRadius: 24,
                  paddingHorizontal: 16,
                }}
                onPress={pickAudio}
              >
                <Text
                  style={{
                    fontFamily: Fonts.body3.fontFamily,
                    fontSize: Fonts.body3.fontSize,
                    color: audioName ? Colors.white : Colors.placeholder,
                  }}
                >
                  {audioName ? audioName : "Select an audio from your device"}
                </Text>
                <Image
                  source={Images["dropdown-img"]}
                  style={{ width: 16, height: 16, resizeMode: "contain" }}
                />
              </Pressable>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 8,
                borderTopColor: Colors.inputBg,
                borderTopWidth: 1,
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  color: Colors.text,
                  fontFamily: Fonts.body3.fontFamily,
                  fontSize: Fonts.body3.fontSize,
                }}
              >
                Delete when alarm goes off
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
          </Pressable>
        </View>

        <View
          style={{
            marginTop: 20,
            padding: 16,
            borderRadius: 16,
            borderColor: Colors.menu_bg,
            borderWidth: 1,
            gap: 13,
            marginBottom: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ gap: 4 }}>
              <Text
                style={{
                  fontFamily: Fonts.h6.fontFamily,
                  fontSize: Fonts.h6.fontSize,
                  color: Colors.text,
                }}
              >
                Repeat Alarm
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.body4.fontFamily,
                  fontSize: Fonts.body4.fontSize,
                  color: Colors.menu_label,
                }}
              >
                Set an alarm to repeat on a schedule of your choice
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

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ gap: 4 }}>
              <Text
                style={{
                  fontFamily: Fonts.body4.fontFamily,
                  fontSize: Fonts.body4.fontSize,
                  color: Colors.menu_label,
                }}
              >
                Repeat frequency
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.h6.fontFamily,
                  fontSize: Fonts.h6.fontSize,
                  color: Colors.text,
                }}
              >
                Custom
              </Text>
            </View>

            <Image
              source={Images["dropdown-img"]}
              style={{ width: 16, height: 16, resizeMode: "contain" }}
            />
          </View>

          <View>
            {groups.map((group, index) => (
              <View key={index} style={styles.row}>
                {group.map((day) => (
                  <View
                    key={day}
                    style={[
                      styles.cell,
                      //   { width: group.length === 2 ? 100 : 50 },
                    ]}
                  >
                    <FlatList
                      data={[day]}
                      renderItem={({ item }) => renderItem(item, group)}
                      keyExtractor={(item) => item}
                      horizontal
                    />
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>

        <View style={{ paddingBottom: 30 }}>
          <AppButton
            label={"Create Alarm"}
            onPress={() => {
              dispatch(
                addAlarm({
                  id: `alarm${alarms.length + 1}`,
                  time: formattedTime,
                  day: selectedDay,
                  duration: timeRemaining,
                  date: date.toISOString(),
                  active: true,
                })
              );
              navigation.navigate(routes.SUCCESS_SCREEN, {
                title: "New Alarm Set",
                info: "Your new alarm has been successfully created",
                btnText: "Go To Alarm Page",
                img: Images["alarm-success"],
              });
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateAlarm;

const styles = StyleSheet.create({
  label: {
    fontFamily: Fonts.body3.fontFamily,
    fontSize: Fonts.body3.fontSize,
    lineHeight: Fonts.body3.lineHeight,
    color: Colors.inputLabelText,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    // gap: 8,
  },
  cell: {
    flex: 1,
    marginVertical: 5,
  },
  dayButton: {
    borderRadius: 24,
    justifyContent: "center",
    paddingHorizontal: 14,
    height: 37,
    backgroundColor: Colors.menu_bg,
    // width: 90,
  },
  selectedDay: {
    borderColor: Colors.white,
    borderWidth: 2,
    backgroundColor: "rgba(75, 75, 75, 1)",
  },
  dayText: {
    textAlign: "center",
    color: Colors.white,
    fontFamily: Fonts.body3.fontFamily,
    fontSize: Fonts.body3.fontSize,
  },
  selectedDayText: {
    color: "white",
  },
});
