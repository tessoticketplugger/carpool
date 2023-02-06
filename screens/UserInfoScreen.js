import { FontAwesome5 } from "@expo/vector-icons";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React from "react";
import {
  Alert,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useToast } from "react-native-toast-notifications";
import { db } from "../api/firebase";
import { CarState } from "../context/CarContext";
import { lightModColor } from "../style/Color";
import { btn, btnText } from "../style/Style";
// import { SafeAreaView } from "react-native-safe-area-context";

const UserInfoScreen = () => {
  // const Navigation = useNavigation();
  const toast = useToast();
  const { user, setUserDoc } = CarState();
  const [name, setName] = React.useState("");
  const [gender, setGender] = React.useState("");
  var letters = /^[a-zA-Z\s]*$/;
  const onUpdate = async () => {
    if (name) {
      if (name.match(letters)) {
        const docRef = doc(db, "Users-Data", user);
        updateDoc(docRef, { name: name, gender: gender }).then(
          getDoc(docRef)
            .then((snapshot) => {
              if (snapshot.exists) {
                setUserDoc(snapshot.data());
              } else {
                console.log("No doc found");
              }
            })
            .catch((error) => {
              console.log(error.message);
            })
        );

        try {
          await AsyncStorage.setItem("user", JSON.stringify(name));
        } catch {
          (err) => console.log(err.message);
        }
      } else {
        toast.show("Name can only contain alphabet characters (A-Z or a-z)", {
          type: "warning",
          placement: "bottom",
          duration: 3000,
          offset: 30,
          animationType: "slide-in",
        });
      }
    } else {
      Alert.alert("Error", "Please enter your name");
    }
  };

  const onMale = () => {
    setGender("Male");
  };
  const onFemale = () => {
    setGender("Female");
    console.log(gender);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={{
          height: "100%",
          backgroundColor: lightModColor.themeBackground,
        }}
      >
        <SafeAreaView>
          <Text
            style={{
              textAlign: "center",
              marginTop: 20,

              fontSize: 24,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Update Info
          </Text>
          <View
            style={{
              marginTop: 20,
              marginHorizontal: 30,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
              Name
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                marginTop: 10,
                borderColor: "white",
                color: "white",
                padding: 10,
                fontSize: 16,
              }}
              onChangeText={(text) => setName(text)}
              value={name}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "white",
                marginTop: 30,
              }}
            >
              Gender
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => onMale()}
                style={{
                  backgroundColor: gender == "Male" ? "#3b8eea" : "#d4d7db",
                  borderRadius: 50,
                  paddingVertical: 10,
                  marginHorizontal: 10,
                  paddingHorizontal: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  width: 150,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      marginRight: 10,
                      fontSize: 16,
                      fontFamily: "MonMedium",
                      color: "white",
                    }}
                  >
                    Male
                  </Text>
                  <FontAwesome5
                    name="male"
                    size={24}
                    color={lightModColor.headerFontColor}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onFemale()}
                style={{
                  backgroundColor: gender == "Female" ? "#ff5efd" : "#d4d7db",
                  borderRadius: 50,
                  paddingVertical: 10,
                  width: 150,
                  marginHorizontal: 10,
                  paddingHorizontal: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      marginRight: 10,
                      fontSize: 16,
                      fontFamily: "MonMedium",
                      color: "white",
                    }}
                  >
                    Female
                  </Text>
                  <FontAwesome5
                    name="female"
                    size={24}
                    color={lightModColor.headerFontColor}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[
                btn,
                {
                  marginTop: 40,
                  backgroundColor: "#FFff",
                  alignSelf: "center",
                  opacity: name == "" || gender == "" ? 0.5 : 1,
                },
              ]}
              onPress={onUpdate}
              disabled={name == "" || gender == ""}
            >
              <Text
                style={[
                  btnText,
                  { fontSize: 18, fontWeight: "bold", color: "black" },
                ]}
              >
                Update
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UserInfoScreen;

const styles = StyleSheet.create({});
