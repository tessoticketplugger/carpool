import { View, Text } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ActiveTripScreen from "../screens/MyTrip/ActiveTripScreen";
import HistoryScreen from "../screens/MyTrip/HistoryScreen";
import { headerStyle } from "../style/Style";

export default function TopTabNavigator() {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: headerStyle,
        tabBarLabelStyle: {
          color: "#ffff",
        },
        tabBarIndicatorStyle: {
          backgroundColor: "#ffff",
        },
      }}
    >
      <Tab.Group>
        <Tab.Screen
          name="ActiveTrip"
          component={ActiveTripScreen}
          options={{
            title: "Live",
          }}
        />
        <Tab.Screen
          name="History"
          component={HistoryScreen}
          options={{ title: "Expired" }}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
}
