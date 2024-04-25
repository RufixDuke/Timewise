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
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import * as DocumentPicker from "expo-document-picker";

import { Colors } from "../../constants/colors";
import { Images } from "../../constants/images";
import { Fonts } from "../../constants/fonts";
import AppDropdownPicker from "../../components/AppDropdownPicker";
import AppButton from "../../components/AppButton";
import { useDispatch, useSelector } from "react-redux";
import {
  setFrom,
  setRingTone,
  setRingToneName,
  setTarget,
  setTo,
  setWindDown,
} from "../../store/SleepTargetSlice";

const SleepTargetScreen = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "1 hour", value: "1" },
    { label: "2 hours", value: "2" },
    { label: "4 hours", value: "4" },
    { label: "6 hours", value: "6" },
    { label: "8 hours", value: "8" },
  ]);
  const [openWindDown, setOpenWindDown] = useState(false);
  const [valueWindDown, setValueWindDown] = useState(null);
  const [itemsWindDown, setItemsWindDown] = useState([
    { label: "5 minutes", value: "5" },
    { label: "10 minutes", value: "10" },
    { label: "15 minutes", value: "15" },
    { label: "20 minutes", value: "20" },
  ]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [audioName, setAudioName] = useState("");

  const { to, target, from, ringtone, winddown, ringtoneName } = useSelector(
    (state) => state.sleep
  );

  const handleFromTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowFromPicker(false);
    dispatch(setFrom(currentDate.toISOString()));
  };

  const handleToTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowToPicker(false);
    dispatch(setTo(currentDate.toISOString()));
  };

  const calculateTimeDifference = () => {
    const diffInHours = moment(to).diff(moment(from), "hours");
    return diffInHours;
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
          dispatch(setRingToneName(result.assets[0].name));
          dispatch(setRingTone(result.assets[0].url));
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
        paddingHorizontal: 16,
        paddingTop: Constants.statusBarHeight + 10,
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
          Sleep Target
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
            paddingHorizontal: 12,
            paddingVertical: 16,
            borderRadius: 16,
          }}
        >
          <AppDropdownPicker
            label={"Sleep Target"}
            setItems={setItems}
            setOpen={setOpen}
            setValue={setValue}
            onSelectItem={(value) => {
              dispatch(setTarget(value.value)); // Dispatch action to set 'target' in Redux store
            }}
            open={open}
            value={target}
            items={items}
            placeholder={"Select your sleep target"}
          />

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
                  {from ? moment(from).format("HH:mm") : "Starting time"}
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
                  value={new Date(from) || new Date()}
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
                  {moment(to).format("HH:mm")}
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
                  value={new Date(to) || new Date()}
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
                {ringtoneName
                  ? ringtoneName
                  : "Select an audio from your device"}
              </Text>
              <Image
                source={Images["dropdown-img"]}
                style={{ width: 16, height: 16, resizeMode: "contain" }}
              />
            </Pressable>
          </View>

          <View style={{ marginTop: 10 }}>
            <AppDropdownPicker
              label={"No. of minutes to wind down"}
              setItems={setItemsWindDown}
              setOpen={setOpenWindDown}
              setValue={setValueWindDown}
              onSelectItem={(value) => {
                dispatch(setWindDown(value.value)); // Dispatch action to set 'winddown' in Redux store
              }}
              open={openWindDown}
              value={winddown}
              items={itemsWindDown}
              placeholder={"Select the time"}
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                // marginTop: 10,
                gap: 8,
                position: "relative",
                zIndex: -1,
                width: "90%",
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
                  fontFamily: Fonts.body4.fontFamily,
                  fontSize: Fonts.body4.fontSize,
                  color: Colors.menu_label,
                }}
              >
                Wind Down is a gentle reminder to put down your phone and start
                getting ready for bed, helping users establish a healthy sleep
                routine.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={{ paddingBottom: 40 }}>
        <AppButton label={"Save Changes"} />
      </View>
    </View>
  );
};

export default SleepTargetScreen;

const styles = StyleSheet.create({
  label: {
    fontFamily: Fonts.body3.fontFamily,
    fontSize: Fonts.body3.fontSize,
    lineHeight: Fonts.body3.lineHeight,
    color: Colors.inputLabelText,
  },
});
