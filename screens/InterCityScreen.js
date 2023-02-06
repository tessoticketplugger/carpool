import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { btn, btnText } from "../style/Style";
import { lightModColor } from "../style/Color";
import { useNavigation } from "@react-navigation/native";
import { CarState } from "../context/CarContext";

const InterCityScreen = () => {
  const Navigation = useNavigation();
  const { setPickupCToC, setDropCToC } = CarState();

  useEffect(() => {
    // setPickupCToC();
    setDropCToC();
  }, []);

  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <TouchableOpacity
        style={[btn]}
        onPress={() => Navigation.navigate("getRideCToC")}
      >
        <Text style={[btnText, { fontFamily: "MonMedium" }]}>Get a Ride</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          btn,
          { marginTop: 20, backgroundColor: lightModColor.secoundColor },
        ]}
        onPress={() => Navigation.navigate("offerRideCToC")}
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

export default InterCityScreen;

const styles = StyleSheet.create({});
