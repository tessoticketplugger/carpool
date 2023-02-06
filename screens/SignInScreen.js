import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { sendSmsVerification } from "../api/verify";
import { CarState } from "../context/CarContext";
import { lightModColor } from "../style/Color";
import { btn, btnText, heading } from "../style/Style";

const SignInScreen = () => {
  const Navigation = useNavigation();
  const { height, width } = Dimensions.get("window");
  const { setUserDoc } = CarState();

  const phoneInput = useRef(null);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setUserDoc(null);
  }, []);

  const handleSubmit = () => {
    if (value.length > 10) {
      Alert.alert("Invalid Phone Number", "Please enter a valid phone number");
      return;
    } else if (value.length < 10) {
      Alert.alert("Invalid Phone Number", "Please enter a valid phone number");
      return;
    } else {
      const phone = "+92" + value;
      Alert.alert("Confirm", `Are you sure ${phone} is your phone number?`, [
        {
          text: "Yes",
          onPress: () => {
            setIsLoading(true);
            sendSmsVerification(phone)
              .then((sent) => {
                if (sent) {
                  Navigation.navigate("OTP", { phone: phone });
                } else {
                  // Alert.alert(
                  //   "Error",
                  //   "Something went wrong. Please try again later"
                  // );
                  setIsLoading(false);
                  Navigation.navigate("OTP", { phone: phone });
                }
              })
              .catch((err) => {
                console.log("Error: ", err);
              });
          },
        },
        {
          text: "No",
          onPress: () => console.log("No"),
        },
      ]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={{
          height,
          backgroundColor: lightModColor.themeBackground,
        }}
      >
        <View style={{ height: "25%", marginHorizontal: "10%" }}>
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 60,
              paddingLeft: 5,
              left: -10,
            }}
            onPress={() => Navigation.goBack()}
          >
            <Ionicons
              name="ios-arrow-back-outline"
              size={35}
              color={lightModColor.headerFontColor}
            />
          </TouchableOpacity>
          <Text style={[heading, { marginTop: "40%" }]}>Sign in</Text>
        </View>
        <View
          style={{
            height: "80%",
            backgroundColor: lightModColor.background,
            borderTopRightRadius: 16,
            borderTopLeftRadius: 16,
            paddingHorizontal: "10%",
          }}
        >
          <View style={{ marginVertical: 30 }}>
            <Text
              style={[
                heading,
                {
                  color: lightModColor.fontColor,
                  fontSize: 30,
                  marginBottom: 10,
                },
              ]}
            >
              Welcome to Fare Share
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "MonMedium",
                opacity: 0.5,
              }}
            >
              Please enter your phone number to continue.
            </Text>
          </View>
          <View style={{ marginBottom: 20 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                backgroundColor: "#f2f2f2",
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  paddingHorizontal: 20,
                  paddingVertical: 5,
                }}
              >
                <Text style={{ fontSize: Platform.OS === "ios" ? 35 : 25 }}>
                  🇵🇰
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <View style={{ paddingHorizontal: 13 }}>
                  <Text style={{ fontSize: 16, fontWeight: "500" }}>+92</Text>
                </View>
                <View>
                  <TextInput
                    maxLength={10}
                    keyboardType="phone-pad"
                    autoFocus={true}
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      paddingVertical: 15,
                      paddingRight: 75,
                    }}
                    disabled={isLoading}
                    value={value}
                    onChangeText={(text) => {
                      setValue(text);
                    }}
                    placeholder="3xxxxxxxxx"
                  />
                </View>
              </View>
            </View>
          </View>
          <View>
            <TouchableOpacity
              disabled={value.length < 10 || isLoading}
              style={[
                btn,
                {
                  opacity: value.length < 10 || isLoading ? 0.5 : 1,
                  alignSelf: "center",
                  marginVertical: 10,
                },
              ]}
              onPress={() => {
                handleSubmit();
              }}
            >
              {isLoading ? (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator
                    style={btnText}
                    size={"small"}
                    color="white"
                  />
                </View>
              ) : (
                <Text style={[btnText, { fontFamily: "MonBold" }]}>
                  Send Code
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* </KeyboardAvoidingView> */}
    </TouchableWithoutFeedback>
  );
};

export default SignInScreen;
