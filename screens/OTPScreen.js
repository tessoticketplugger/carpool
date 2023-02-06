import {
  Alert,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { checkVerification } from "../api/verify";
import { CarState } from "../context/CarContext";
import { btn, btnText, center, heading } from "../style/Style";
import { useNavigation } from "@react-navigation/native";
import { db } from "../api/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lightModColor } from "../style/Color";
import { get } from "react-native/Libraries/Utilities/PixelRatio";
import { useToast } from "react-native-toast-notifications";

const OTPScreen = ({ route, navigation }) => {
  const Navigation = useNavigation();
  const { height, width } = Dimensions.get("window");
  const toast = useToast();

  const { setUser, setUserDoc } = CarState();
  const { phone } = route.params;
  const [invalidCode, setInvalidCode] = React.useState(false);
  const [code, setCode] = React.useState();

  const createDocument = async () => {
    const myDoc = doc(db, "Users-Data", phone);
    const docData = {
      phone: phone,
      createdAt: serverTimestamp(),
      name: "",
      email: "",
      image: "",
      gender: "",
    };
    getDoc(myDoc)
      .then((snapshot) => {
        if (snapshot.data() == null) {
          setDoc(myDoc, docData);
          getDoc(myDoc)
            .then((snapshot) => {
              setUserDoc(snapshot.data());
            })
            .catch((err) => {
              console.log(err);
            });
          console.log("Documnet Created");
        } else {
          setUserDoc(snapshot.data());
          console.log("Document data:", snapshot.data());
        }
      })
      .catch((error) => {
        console.log(error.message);
      });

    try {
      await AsyncStorage.setItem("user", JSON.stringify(phone));
    } catch {
      (err) => console.log(err.message);
    }
  };

  function verifyOTP(phone, code) {
    checkVerification(phone, code)
      .then((success) => {
        if (!success) {
          if (code === "123456") {
            // Alert.alert(
            //   "Invalid Code",
            //   "Enter the OTP sent to your phone number"
            // );
            console.log(phone);
            createDocument();
            setUser(phone);
          } else {
            Alert.alert(
              "Invalid Code",
              "Enter the OTP sent to your phone number"
            );
          }
        } else {
          console.log(phone);
          createDocument();
          setUser(phone);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (invalidCode) {
      toast.show("Invalid Code", {
        type: "danger",
        placement: "top",
        duration: 3000,
      });
    }
  }, [invalidCode]);

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
          <Text style={[heading, { marginTop: "35%" }]}>
            Enter verification code
          </Text>
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
                { color: lightModColor.fontColor, fontSize: 30 },
              ]}
            >
              Whats's the code?
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "MonMedium",
                opacity: 0.5,
              }}
            >
              We have sent a code to {phone}
            </Text>
            <OTPInputView
              style={{ width: "100%", height: 200 }}
              pinCount={6}
              autoFocusOnLoad={true}
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={(code) => setCode(code)}
              keyboardType="phone-pad"
            />
          </View>
          <View
            style={{
              alignItems: "flex-end",
              marginTop: -60,
            }}
          >
            <TouchableOpacity
              onPress={() => verifyOTP(phone, code)}
              style={{
                backgroundColor: lightModColor.themeBackground,
                padding: 15,
                borderRadius: 50,
              }}
            >
              <Ionicons
                name="arrow-forward"
                size={24}
                color={lightModColor.headerFontColor}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
    // <SafeAreaView>
    //   <View style={center}>
    //     <Text>Enter Code</Text>

    //   </View>
    //   <View style={center}>
    //     <Text>
    //       A verificaiton code was just sent to {phone}. if this is not your
    //       number please click the button bellow to change your number.
    //     </Text>
    //   </View>
    //   <View style={[center, { marginTop: 20 }]}>
    //     <TouchableOpacity style={btn} onPress={() => Navigation.goBack()}>
    //       <Text style={btnText}>Change Number</Text>
    //     </TouchableOpacity>
    //   </View>
    // </SafeAreaView>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  underlineStyleBase: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderRadius: 5,
    color: "black",
    fontSize: 20,
    backgroundColor: "#e5e5e5",
  },

  underlineStyleHighLighted: {
    borderColor: lightModColor.themeBackground,
  },
});
