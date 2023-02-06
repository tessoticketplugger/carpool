import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { CarState } from "../context/CarContext";
import ChatCatogery from "../screens/ChatCatogery";
import SuggestionCToCScreen from "../screens/CityToCIty/SuggestionCToCScreen";
import FemaleGlobalChat from "../screens/FemaleGlobalChat";
import GetRideScreen from "../screens/GetRideScreen";
import RideDetailsScreen from "../screens/GettingRide/RideDetailsScreen";
import GettingRideCTOCScreen from "../screens/GettingRideInterCityScreen/GettingRideCTOCScreen";
import LocationSelectScreen from "../screens/GettingRideInterCityScreen/LocationSelectScreen";
import GlobalChatScreen from "../screens/GlobalChatScreen";
import Home from "../screens/Home";
import InterCityScreen from "../screens/InterCityScreen";
import LandingScreen from "../screens/LandingScreen";
import LoadingScreen from "../screens/LoadingScreen";
import OfferRideCToCScreen from "../screens/OfferRideCtToC/OfferRideCToCScreen";
import UpdateOfferCToCScreen from "../screens/OfferRideCtToC/UpdateOfferCToCScreen";
import UpdateOfferScreen from "../screens/OfferRides/UpdateOfferScreen";
import OfferRideScreen from "../screens/OfferRideScreen";
import OneToOneChat from "../screens/OneToOneChat";
import OTPScreen from "../screens/OTPScreen";
import PorfileScreen from "../screens/PorfileScreen";
import PrivateChats from "../screens/PrivateChats";
import SignInScreen from "../screens/SignInScreen";
import SuggessionScreen from "../screens/SuggessionScreen";
import UserInfoScreen from "../screens/UserInfoScreen";
import { lightModColor } from "../style/Color";
import { headerStyle } from "../style/Style";
import TabNavigator from "./TabNavigator";

const Stack = createStackNavigator();

const authStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Sign In" component={SignInScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
    </Stack.Navigator>
  );
};

const appStack = () => {
  const Navigation = useNavigation();
  const { user, setUser, setUserDoc, userDoc } = CarState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userDoc) {
      setIsLoading(true);
    } else if (userDoc) {
      setIsLoading(false);
    }
  }, [userDoc]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >
      {isLoading ? (
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
      ) : userDoc.name == "" || userDoc.gender == "" ? (
        <Stack.Group
          screenOptions={{
            presentation: "transparentModal",
            gestureEnabled: true,
            ...TransitionPresets.ModalPresentationIOS,
          }}
        >
          <Stack.Screen
            name="UserInfo"
            component={UserInfoScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Group>
      ) : (
        <>
          <Stack.Group
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="root" component={TabNavigator} />
          </Stack.Group>

          {/* Rides Stack Group */}

          <Stack.Group
            screenOptions={{
              headerRight: () => {
                return (
                  <View>
                    <TouchableOpacity
                      onPress={() => Navigation.navigate("ChatCat")}
                      style={{ paddingHorizontal: 20 }}
                    >
                      <Ionicons
                        name="chatbubbles-outline"
                        size={24}
                        color="white"
                      />
                    </TouchableOpacity>
                  </View>
                );
              },
              gestureEnabled: true,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          >
            <Stack.Screen
              name="IntraCity"
              component={Home}
              options={{
                headerTitle: "City to City",
                headerStyle: headerStyle,
                headerTintColor: "#ffff",
              }}
            />
            <Stack.Screen
              name="InterCity"
              component={InterCityScreen}
              options={{
                headerTitle: "Inside City",
                headerStyle: headerStyle,
                headerTintColor: "#ffff",
              }}
            />
            <Stack.Screen
              name="getRide"
              component={GetRideScreen}
              options={{
                headerTitle: "Select Route",
                headerStyle: headerStyle,
                headerTintColor: "#ffff",
              }}
            />
            <Stack.Screen
              name="getRideCToC"
              component={GettingRideCTOCScreen}
              options={{
                headerTitle: "Select Route",
                headerStyle: {
                  backgroundColor: lightModColor.themeBackground,
                  shadowOpacity: 0,
                  elevation: 0,
                },
                headerTintColor: "#ffff",
              }}
            />
            <Stack.Screen
              name="LocationSelect"
              component={LocationSelectScreen}
              options={{
                headerShown: false,
                presentation: "modal",
                gestureEnabled: true,
                ...TransitionPresets.ModalPresentationIOS,
              }}
            />
            <Stack.Screen
              name="suggession"
              component={SuggessionScreen}
              options={{
                headerTitle: "Available Rides",
                headerStyle: headerStyle,
                headerTintColor: "#ffff",
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen
              name="suggessionCToC"
              component={SuggestionCToCScreen}
              options={{
                headerTitle: "Available Rides",
                headerStyle: headerStyle,
                headerTintColor: "#ffff",
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen
              name="RideDetails"
              component={RideDetailsScreen}
              options={{
                headerTitle: "Ride Details",
                headerStyle: headerStyle,
                headerTintColor: "#ffff",
                headerTitleAlign: "center",
              }}
            />

            <Stack.Screen
              name="offerRide"
              component={OfferRideScreen}
              options={{
                headerBackTitleVisible: false,
                headerTitle: "Offer Ride IntraCity",
                headerStyle: headerStyle,
                headerTintColor: "#ffff",
              }}
            />
            <Stack.Screen
              name="offerRideCToC"
              component={OfferRideCToCScreen}
              options={{
                headerBackTitleVisible: false,
                headerTitle: "Offer Ride InterCity",
                headerStyle: headerStyle,
                headerTintColor: "#ffff",
              }}
            />
            <Stack.Screen
              name="updateOffer"
              component={UpdateOfferScreen}
              options={{
                headerBackTitleVisible: false,
                headerTitle: "Update Offer",
                headerStyle: headerStyle,
                headerTintColor: "#ffff",
              }}
            />
            <Stack.Screen
              name="updateOfferCToC"
              component={UpdateOfferCToCScreen}
              options={{
                headerBackTitleVisible: false,
                headerTitle: "Update Offer",
                headerStyle: headerStyle,
                headerTintColor: "#ffff",
              }}
            />
            <Stack.Screen
              name="User Profile"
              component={PorfileScreen}
              options={{
                headerTitle: "",
                headerStyle: [headerStyle, { elevation: 0, shadowOpacity: 0 }],
                headerTintColor: "#ffff",
              }}
            />
          </Stack.Group>

          {/* Chat Stack Group */}
          <Stack.Group
            screenOptions={{
              headerShown: false,
              gestureEnabled: true,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          >
            <Stack.Screen
              name="ChatCat"
              component={ChatCatogery}
              options={{
                headerShown: true,
                headerTitle: "Chats",
                headerStyle: headerStyle,
                headerTintColor: "#ffff",
              }}
            />
            <Stack.Screen name="Female Chat" component={FemaleGlobalChat} />
            <Stack.Screen name="Private Chats" component={PrivateChats} />
            <Stack.Screen name="One To One" component={OneToOneChat} />
            <Stack.Screen name="Chat" component={GlobalChatScreen} />
          </Stack.Group>
        </>
      )}
    </Stack.Navigator>
  );
};

const LoadingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Loading" component={LoadingScreen} />
    </Stack.Navigator>
  );
};

const StackNavigator = () => {
  const { user, isLoading } = CarState();

  return isLoading ? LoadingStack() : user ? appStack() : authStack();
};

export default StackNavigator;
