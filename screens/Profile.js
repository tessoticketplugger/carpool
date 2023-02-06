import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { CarState } from "../context/CarContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { btn, btnText } from "../style/Style";
import { lightModColor } from "../style/Color";
import { FontAwesome } from "@expo/vector-icons";
const Profile = () => {
  const { user, setUser, userDoc, setUserDoc } = CarState();
  const { height, width } = Dimensions.get("window");
  const deleteItem = () => {
    Alert.alert("Confirm", "You want to Logout?", [
      {
        text: "Yes",
        onPress: () => {
          AsyncStorage.removeItem("user")
            .then(() => setUser(null))
            .catch((e) => console.log(e));
        },
      },

      {
        text: "No",
      },
    ]);
  };
  return (
    <View style={{ height: "100%" }}>
      <View
        style={{
          backgroundColor: lightModColor.themeBackground,
          height: height * 0.1,
        }}
      >
        <View
          style={{
            position: "absolute",
            alignSelf: "center",
            top: height * 0.1 * 0.3,
            zIndex: 99999,
            borderRadius: 11150,
          }}
        >
          <View
            style={{
              backgroundColor: lightModColor.secoundColor,
              borderRadius: 400,
              // padding: 10,
              height: 100,
              width: 100,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome
              name="user"
              size={85}
              color={lightModColor.themeBackground}
            />
          </View>
        </View>

        {/* <Image
          source={require("../assets/images.png")}
          style={{
            height: 100,
            width: 100,
            borderRadius: 100,
            position: "absolute",
            alignSelf: "center",
            top: height * 0.1 * 0.3,
            zIndex: 99999,
          }}
        /> */}
      </View>
      <View style={{ backgroundColor: "#f2f2f2", zIndex: -1 }}>
        <View style={{ marginTop: 60 }}>
          <Text style={{ textAlign: "center", fontFamily: "MonBold" }}>
            {userDoc.name}
          </Text>

          <View
            style={{
              marginTop: 10,
              backgroundColor: "#ffffff",
              width: "90%",
              alignSelf: "center",
              justifyContent: "center",
              borderRadius: 10,
              padding: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View>
                <Text style={{ fontFamily: "MonBold", marginTop: 10 }}>
                  Joined
                </Text>
                <Text style={{ fontFamily: "MonBold", marginTop: 10 }}>
                  Gender
                </Text>
                <Text style={{ fontFamily: "MonBold", marginVertical: 10 }}>
                  Number
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "MonLight",
                    marginLeft: 10,
                    marginTop: 10,
                  }}
                >
                  {userDoc.createdAt.toDate().toLocaleDateString()}
                </Text>
                <Text
                  style={{
                    fontFamily: "MonLight",
                    marginLeft: 10,
                    marginTop: 10,
                  }}
                >
                  {userDoc.gender}
                </Text>
                <Text
                  style={{
                    fontFamily: "MonLight",
                    marginLeft: 10,
                    marginVertical: 10,
                  }}
                >
                  {`0${userDoc.phone.slice(3, 6)}-${userDoc.phone.slice(6)}`}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={deleteItem}
        style={[btn, { alignSelf: "center", marginTop: 40 }]}
      >
        <Text style={btnText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
