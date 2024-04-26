import React from "react";
import { View, Animated, Image, Dimensions, StyleSheet } from "react-native";
import {
  PanGestureHandler,
  State,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Images } from "../constants/images";
import { Colors } from "../constants/colors";

const SwipeableButton = ({ onSwipeComplete }) => {
  const { width } = Dimensions.get("window");
  const buttonWidth = 56;
  const viewWidth = 340;

  const translateX = new Animated.Value(0);

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  const handleSwipe = (event) => {
    if (event.nativeEvent.state === State.END) {
      if (event.nativeEvent.translationX >= viewWidth) {
        onSwipeComplete();
        translateX.setValue(0);
      } else {
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
          bounciness: 8,
        }).start();
      }
    }
  };

  const maxTranslateX = width - buttonWidth;

  const translateXLimited = translateX.interpolate({
    inputRange: [0, maxTranslateX],
    outputRange: [0, maxTranslateX],
    extrapolate: "clamp",
  });

  return (
    <GestureHandlerRootView>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={handleSwipe}
      >
        <Animated.View
          style={{
            transform: [{ translateX: translateXLimited }],
          }}
        >
          <View style={styles.img}>
            <Image
              source={Images["right-arrow"]}
              style={{ width: 6, height: 13, resizeMode: "contain" }}
            />
          </View>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  img: {
    backgroundColor: Colors.text,
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
  },
});
export default SwipeableButton;
