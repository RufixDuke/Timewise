import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/colors";
import EmptyState from "../../components/EmptyState";
import { Images } from "../../constants/images";
import AppButton from "../../components/AppButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import routes from "../../navigations/routes";

const SuccessScreen = () => {
  const navigation = useNavigation();
  const { title, info, img, btnText } = useRoute().params;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        paddingHorizontal: 20,
        justifyContent: "space-around",
      }}
    >
      <Text></Text>

      <EmptyState
        title={title}
        info={info}
        img={img}
        containerStyle={{ marginTop: 0 }}
      />

      <AppButton
        label={btnText}
        onPress={() => navigation.navigate(routes.HOME_SCREEN)}
      />
    </View>
  );
};

export default SuccessScreen;

const styles = StyleSheet.create({});
