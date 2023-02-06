import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import Profile from "../screens/Profile";
import { lightModColor } from "../style/Color";
import { headerStyle } from "../style/Style";
import GlobalChatScreen from "../screens/GlobalChatScreen";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import TopTabNavigator from "./TopTabNavigator";
import IndexScreen from "../screens/IndexScreen";

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  const Navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={{
        headerRight: () => {
          return (
            <View>
              <TouchableOpacity
                onPress={() => Navigation.navigate("ChatCat")}
                style={{ paddingHorizontal: 20 }}
              >
                <Ionicons name="chatbubbles-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
          );
        },
        tabBarActiveTintColor: lightModColor.themeBackground,
        headerStyle: headerStyle,
        headerTintColor: lightModColor.headerFontColor,
        headerTitleAlign: "center",
        // headerTitle: "Share Ride",
        headerShadowVisible: true,
        tabBarHideOnKeyboard: true,
        // tabBarAllowFontScaling: true,
        tabBarVisibilityAnimationConfig: {
          hide: {
            config: {
              duration: 0,
            },
          },
          show: {
            config: {
              duration: 0,
            },
          },
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={IndexScreen}
        options={{
          tabBarIcon: (tabInfo) => {
            return (
              <FontAwesome
                name="home"
                size={24}
                color={
                  tabInfo.focused ? lightModColor.themeBackground : "#4444"
                }
              />
            );
          },
          headerTitle: "Home",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerStyle: [headerStyle, { elevation: 0, shadowOpacity: 0 }],
          tabBarIcon: (tabInfo) => {
            return (
              <MaterialCommunityIcons
                name="account"
                size={24}
                color={
                  tabInfo.focused ? lightModColor.themeBackground : "#4444"
                }
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="My Trips"
        component={TopTabNavigator}
        options={{
          tabBarIcon: (tabInfo) => {
            return (
              <FontAwesome5
                name="car"
                size={24}
                color={
                  tabInfo.focused ? lightModColor.themeBackground : "#4444"
                }
              />
            );
          },
          headerStyle: {
            backgroundColor: lightModColor.themeBackground,
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
