import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { availableRideLocaBox, row } from "../style/Style";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { lightModColor } from "../style/Color";
import { useNavigation } from "@react-navigation/native";

const PickandDropForm = ({ pickUpLoca, dropLoca, route }) => {
  const Navigation = useNavigation();

  return (
    <>
      <TouchableOpacity
        style={[row, availableRideLocaBox, { marginVertical: 5 }]}
        onPress={() => Navigation.goBack()}
      >
        <MaterialIcons
          name="my-location"
          size={20}
          color={lightModColor.themeBackground}
        />
        <Text style={{ marginLeft: 10, textTransform: "capitalize" }}>
          {pickUpLoca}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[row, availableRideLocaBox]}
        onPress={() => Navigation.goBack()}
      >
        <MaterialIcons
          name="location-on"
          size={20}
          color={lightModColor.themeBackground}
        />
        <Text style={{ marginLeft: 10, textTransform: "capitalize" }}>
          {dropLoca}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default PickandDropForm;

const styles = StyleSheet.create({});
