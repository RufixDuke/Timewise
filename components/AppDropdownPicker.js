import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Fonts } from "../constants/fonts";
import { Colors } from "../constants/colors";
import DropDownPicker from "react-native-dropdown-picker";
import { Images } from "../constants/images";

const AppDropdownPicker = ({
  label,
  open,
  value,
  items,
  setOpen,
  setItems,
  setValue,
  placeholder,
  ...props
}) => {
  return (
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
        {label}
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
        placeholder={placeholder}
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
        {...props}
      />
    </View>
  );
};

export default AppDropdownPicker;

const styles = StyleSheet.create({});
