import { Entypo } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { Animated, Platform, Text, TouchableOpacity } from "react-native";
import { CarState } from "../context/CarContext";
import { lightModColor } from "../style/Color";

export default function Alert(props) {
  const { setalert } = CarState();

  const capitalized = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const animationFadeOut = () => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      },

      setalert(null)
    ).start();
  };

  return props.alert ? (
    <Animated.View
      style={{
        position: "absolute",
        bottom: 55,
        backgroundColor:
          props.alert.type === "success"
            ? lightModColor.themeBackground
            : props.alert.type === "warn"
            ? lightModColor.secoundColor
            : "red",
        width: "90%",
        padding: 20,
        //   marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 5,
        alignItems: "center",
        alignSelf: "center",
        opacity: fadeAnim,
      }}
    >
      <Text
        style={{
          color: "#ffff",
          fontWeight: "bold",
          fontSize: Platform.OS === "android" ? 18 : 20,
          width: "90%",
        }}
      >
        <Text>{props.alert.message}</Text>
      </Text>
      <TouchableOpacity
        onPress={() => {
          animationFadeOut();
        }}
        style={{ width: "30%" }}
      >
        <Entypo
          name="cross"
          size={24}
          color="#ffff"
          style={{ paddingHorizontal: 10 }}
        />
      </TouchableOpacity>
    </Animated.View>
  ) : null;
}
