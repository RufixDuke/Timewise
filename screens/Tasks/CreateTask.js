import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import Constants from "expo-constants";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import * as DocumentPicker from "expo-document-picker";
import { useDispatch, useSelector } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";

import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";
import { Images } from "../../constants/images";
import AppTextInput from "../../components/AppTextInput";
import AppButton from "../../components/AppButton";
import routes from "../../navigations/routes";
import { addTasks } from "../../store/TaskSlice";

const CreateTask = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [showClock, setShowClock] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [audioName, setAudioName] = useState("");
  const [name, setName] = useState("");
  const [day, setDay] = useState("");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Monday", value: "Monday" },
    { label: "Tuesday", value: "Tuesday" },
    { label: "Wednesday", value: "Wednesday" },
    { label: "Thursday", value: "Thursday" },
    { label: "Friday", value: "Friday" },
    { label: "Saturday", value: "Saturday" },
    { label: "Sunday", value: "Sunday" },
  ]);

  const { tasks } = useSelector((state) => state.tasks);

  const [fromTime, setFromTime] = useState(new Date());
  const [toTime, setToTime] = useState(new Date());
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [description, setDescription] = useState("");

  // Function to handle From time selection
  const handleFromTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowFromPicker(false);
    setFromTime(currentDate);
  };

  // Function to handle To time selection
  const handleToTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowToPicker(false);
    setToTime(currentDate);
  };

  // Function to calculate the difference between From and To times
  const calculateTimeDifference = () => {
    const diffInHours = moment(toTime).diff(moment(fromTime), "hours");
    return diffInHours;
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowClock(false);
    // if (Platform.OS === "android") {
    // }
  };

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
          Create Task
        </Text>

        <Text></Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flex: 1 }}
      >
        <View
          style={{
            backgroundColor: Colors.group_bg,
            marginTop: 20,
            paddingHorizontal: 8,
            paddingVertical: 16,
            borderRadius: 16,
          }}
        >
          <AppTextInput
            label={"Name"}
            placeholder={"Enter the name of the task"}
            keyboardType={"default"}
            returnKeyType={"next"}
            autoComplete={"name"}
            autoCapitalize={"none"}
            value={name}
            onChangeText={(text) => setName(text)}
          />

          <AppTextInput
            label={"Description (optional)"}
            placeholder={"Enter the description of the task"}
            keyboardType={"default"}
            returnKeyType={"next"}
            autoComplete={"name"}
            autoCapitalize={"none"}
            multiline
            value={description}
            onChangeText={(text) => setDescription(text)}
            inputContainer={{
              minHeight: 54,
              maxHeight: 100,
            }}
          />

          <View style={{ gap: 4, marginBottom: 10 }}>
            <Text style={styles.label}>Date</Text>
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
              onPress={() => setShowClock(!showClock)}
            >
              <Text
                style={{
                  fontFamily: Fonts.body3.fontFamily,
                  fontSize: Fonts.body3.fontSize,
                  color: Colors.header,
                }}
              >
                {moment(date).format("Do MMMM, YYYY")}
              </Text>
              <Image
                source={Images["calendar-icon"]}
                style={{ width: 20, height: 20, resizeMode: "contain" }}
              />
            </Pressable>

            {showClock && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={"date"}
                is24Hour={false}
                display={"calendar"}
                onChange={onChange}
                style={{
                  backgroundColor: Colors.background,
                  height: 300,
                }}
                accentColor={Colors.white}
                textColor={Colors.white}
              />
            )}
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontFamily: Fonts.body3.fontFamily,
                fontSize: Fonts.body3.fontSize,
                color: Colors.menu_label,
                lineHeight: Fonts.body3.lineHeight,
                marginTop: 10,
              }}
            >
              Day
            </Text>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              listMode={"SCROLLVIEW"}
              ArrowDownIconComponent={() => (
                <Image
                  source={Images["dropdown-img"]}
                  style={{ width: 18, height: 10 }}
                />
              )}
              labelStyle={{
                color: Colors.header,
                fontFamily: Fonts.body3.fontFamily,
                fontSize: Fonts.body3.fontSize,
              }}
              placeholder="Select the day"
              placeholderStyle={{
                fontFamily: Fonts.body3.fontFamily,
                fontSize: Fonts.body3.fontSize,
                color: Colors.placeholder,
                lineHeight: Fonts.body3.lineHeight,
              }}
              textStyle={{
                color: Colors.black,
                fontFamily: Fonts.body3.fontFamily,
                fontSize: Fonts.body3.fontSize,
              }}
              style={{
                backgroundColor: Colors.inputBg,
                borderRadius: 24,
                marginTop: 10,
                borderWidth: 0,
                height: 44,
                zIndex: 500000,
              }}
              dropDownContainerStyle={{
                zIndex: 4000,
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              position: "relative",
              zIndex: -1,
            }}
          >
            <View style={{ gap: 4, width: "45%" }}>
              <Text style={styles.label}>From</Text>
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
                onPress={() => setShowFromPicker(!showFromPicker)}
              >
                <Text
                  style={{
                    fontFamily: Fonts.body3.fontFamily,
                    fontSize: Fonts.body3.fontSize,
                    color: Colors.header,
                  }}
                >
                  {moment(fromTime).format("HH:mm")}
                </Text>
                <Image
                  source={Images["dropdown-img"]}
                  style={{
                    width: 16,
                    height: 16,
                    resizeMode: "contain",
                    tintColor: Colors.header,
                  }}
                />
              </Pressable>

              {showFromPicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={fromTime}
                  mode={"time"}
                  is24Hour={true}
                  display={"clock"}
                  onChange={handleFromTimeChange}
                  style={{
                    backgroundColor: Colors.white,
                  }}
                  accentColor={Colors.white}
                  textColor={Colors.white}
                />
              )}
            </View>

            <View style={{ gap: 4, width: "45%" }}>
              <Text style={styles.label}>To</Text>
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
                onPress={() => setShowToPicker(!showToPicker)}
              >
                <Text
                  style={{
                    fontFamily: Fonts.body3.fontFamily,
                    fontSize: Fonts.body3.fontSize,
                    color: Colors.header,
                  }}
                >
                  {moment(toTime).format("HH:mm")}
                </Text>
                <Image
                  source={Images["dropdown-img"]}
                  style={{
                    width: 16,
                    height: 16,
                    resizeMode: "contain",
                    tintColor: Colors.header,
                  }}
                />
              </Pressable>

              {showToPicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={toTime}
                  mode={"time"}
                  is24Hour={true}
                  display={"clock"}
                  onChange={handleToTimeChange}
                  style={{
                    backgroundColor: Colors.white,
                  }}
                  accentColor={Colors.white}
                  textColor={Colors.white}
                />
              )}
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
              gap: 8,
              position: "relative",
              zIndex: -1,
            }}
          >
            <Image
              source={Images.info}
              style={{
                width: 16,
                height: 16,
                resizeMode: "contain",
                tintColor: Colors.menu_label,
              }}
            />
            <Text
              style={{
                fontFamily: Fonts.body3.fontFamily,
                fontSize: Fonts.body3.fontSize,
                color: Colors.menu_label,
              }}
            >
              This task is assigned {calculateTimeDifference()} hours
            </Text>
          </View>

          <View
            style={{
              gap: 4,
              paddingTop: 10,
              position: "relative",
              zIndex: -1,
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
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            marginTop: 10,
            gap: 8,
          }}
        >
          <Image
            source={Images.info}
            style={{
              width: 20,
              height: 20,
              resizeMode: "contain",
              //   tintColor: Colors.menu_label,
            }}
          />
          <Text
            style={{
              fontFamily: Fonts.body3.fontFamily,
              fontSize: Fonts.body3.fontSize,
              color: Colors.text,
            }}
          >
            Pls note time from 22;00 to 6:00 can’t be assigned to any tasks
            because of your sleep target
          </Text>
        </View>

        <View
          style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 40 }}
        >
          <AppButton
            label={"Create Task"}
            onPress={() => {
              dispatch(
                addTasks({
                  id: tasks.length + 1,
                  name: name,
                  to: toTime.toISOString(),
                  from: fromTime.toISOString(),
                  duration: calculateTimeDifference(),
                  date: moment(date).format("Do MMMM, YYYY"),
                  active: false,
                  day: value,
                  description: description,
                })
              );
              navigation.navigate(routes.SUCCESS_SCREEN, {
                title: "New Task Created",
                info: "You’ve successfully created a task",
                btnText: "Go To Task Page",
                img: Images["task-success"],
              });
            }}
            disabled={
              !name ||
              !value ||
              !description ||
              //   audioName === "" ||
              toTime < fromTime ||
              toTime.getHours() < 6 ||
              fromTime.getHours() < 6 ||
              toTime.getHours() > 22 ||
              fromTime.getHours() > 22
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateTask;

const styles = StyleSheet.create({
  label: {
    fontFamily: Fonts.body3.fontFamily,
    fontSize: Fonts.body3.fontSize,
    lineHeight: Fonts.body3.lineHeight,
    color: Colors.inputLabelText,
  },
});
