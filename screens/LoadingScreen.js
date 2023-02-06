import { StatusBar } from "expo-status-bar";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { lightModColor } from "../style/Color";

const LoadingScreen = () => {
  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color={lightModColor.themeBackground} />
      <StatusBar style="auto" />
    </View>
  );
};

export default LoadingScreen;
