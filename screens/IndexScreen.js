import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { CarState } from "../context/CarContext";
import { lightModColor } from "../style/Color";
import { btnText } from "../style/Style";

const IndexScreen = () => {
  const Navigation = useNavigation();
  const { userDoc } = CarState();

  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <TouchableOpacity
        style={[
          {
            marginBottom: 20,
            backgroundColor: lightModColor.secoundColor,
            borderRadius: 10,
            height: 130,
            width: 170,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
        onPress={() => Navigation.navigate("InterCity")}
      >
        <Image
          source={require("../assets/Artboard2.png")}
          style={{ height: 87, width: 90 }}
        />
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
          Inside City
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: lightModColor.themeBackground,
          borderRadius: 10,
          height: 130,
          width: 170,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => Navigation.navigate("IntraCity")}
      >
        <Image
          source={require("../assets/city2city.png")}
          style={{ height: 79, width: 160 }}
        />
        <Text style={[btnText, { fontFamily: "MonMedium" }]}>City to City</Text>
      </TouchableOpacity>

      <StatusBar style="inverted" animated />
    </View>
  );
};

export default IndexScreen;
