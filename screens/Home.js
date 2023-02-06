import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { CarState } from "../context/CarContext";
import { lightModColor } from "../style/Color";
import { btn, btnText } from "../style/Style";

const Home = () => {
  const Navigation = useNavigation();
  const { userDoc } = CarState();

  useEffect(() => {
    if (userDoc.name == "") {
      Navigation.replace("UserInfo");
    }
  }, [userDoc]);

  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <TouchableOpacity
        style={[btn]}
        onPress={() => Navigation.navigate("getRide")}
      >
        <Text style={[btnText, { fontFamily: "MonMedium" }]}>Get a Ride</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          btn,
          { marginTop: 20, backgroundColor: lightModColor.secoundColor },
        ]}
        onPress={() => Navigation.navigate("offerRide")}
      >
        <Text
          style={[
            btnText,
            {
              color: lightModColor.themeBackground,
              textAlign: "center",
              fontSize: 20,
              fontFamily: "MonMedium",
            },
          ]}
        >
          Offer a Ride
        </Text>
      </TouchableOpacity>
      <StatusBar style="inverted" animated />
    </View>
  );
};

export default Home;
