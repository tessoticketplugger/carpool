import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { btn, btnText, center } from "../style/Style";
import { useNavigation } from "@react-navigation/native";
import { lightModColor } from "../style/Color";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
const LandingScreen = () => {
  const Navigation = useNavigation();

  return (
    <SafeAreaView style={{ backgroundColor: lightModColor.themeBackground }}>
      <View
        style={[
          center,
          {
            height: "50%",
            // width: "90%",
            // justifyContent: "center",
            // alignItems: "center",
          },
        ]}
      >
        <Image
          source={require("../assets/landing.png")}
          style={{ height: 270, width: 350 }}
        />
      </View>
      <View
        style={{
          height: "50%",
          marginHorizontal: "10%",
          justifyContent: "space-evenly",
        }}
      >
        <Text
          style={{
            color: lightModColor.headerFontColor,
            textAlign: "left",
            fontSize: 34,
            fontWeight: "bold",
            fontFamily: "MonBold",
          }}
        >
          Welcome
        </Text>
        <Text
          style={{
            color: lightModColor.headerFontColor,
            fontSize: 24,
            fontFamily: "MonRegular",
            lineHeight: 35,
          }}
        >
          Manage your carpool rides seamlessly and efficiently
        </Text>
        <TouchableOpacity
          style={[btn, { backgroundColor: "white", alignSelf: "center" }]}
          onPress={() => Navigation.navigate("Sign In")}
        >
          <Text
            style={[
              btnText,
              {
                color: lightModColor.themeBackground,
                fontWeight: "bold",
                fontFamily: "MonBold",
              },
            ]}
          >
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar
        style="light"
        backgroundColor={lightModColor.themeBackground}
        animated
      />
    </SafeAreaView>
  );
};

export default LandingScreen;
