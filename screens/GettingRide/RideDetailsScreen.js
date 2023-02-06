import { GOOGLE_API_KEY } from "@env";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Zocial,
} from "@expo/vector-icons";
import {
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { PROVIDER_DEFAULT, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { db } from "../../api/firebase";
import { CarState } from "../../context/CarContext";
import { lightModColor } from "../../style/Color";
import { availableRideHeading, btn, btnText, row } from "../../style/Style";

const RideDetailsScreen = ({ navigation, route }) => {
  const { user, userDoc } = CarState();
  let orignS = null,
    pickupLocationS = null,
    dropLocationS = null;
  const mapRef = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      mapRef.current.fitToSuppliedMarkers(["pickup", "drop"], {
        edgePadding: {
          top: 70,
          right: 70,
          bottom: 70,
          left: 70,
        },
      });
    }, 600);
  }, []);

  const {
    id,
    currentUser,
    carDetails,
    price,
    pickupDetail,
    dropDetail,
    pickup,
    drop,
    seats,
    date,
    time,
    comments,
    createDate,
  } = route.params;

  const thisUser = currentUser;

  if (typeof pickupDetail === "string") {
    const GeoLoc = [
      {
        city: "Lahore",
        latitude: 31.5204,
        longitude: 74.3587,
      },
      {
        city: "Pattoki",
        latitude: 31.0249,
        longitude: 73.8479,
      },
      {
        city: "Islamabad",
        latitude: 33.6844,
        longitude: 73.0479,
      },
      {
        city: "Multan",
        latitude: 30.1575,
        longitude: 71.5249,
      },
      {
        city: "Okara",
        latitude: 30.8138,
        longitude: 73.4534,
      },
      {
        city: "Sheikhupura",
        latitude: 31.7167,
        longitude: 73.985,
      },
      {
        city: "Sialkot",
        latitude: 32.4945,
        longitude: 74.5229,
      },
      {
        city: "Gujranwala",
        latitude: 32.1877,
        longitude: 74.1945,
      },
      {
        city: "Gujrat",
        latitude: 32.5731,
        longitude: 74.1005,
      },
      {
        city: "Faisalabad",
        latitude: 31.4504,
        longitude: 73.135,
      },
      {
        city: "Rawalpindi",
        latitude: 33.5651,
        longitude: 73.0169,
      },
      {
        city: "Sahiwal",
        latitude: 30.677717,
        longitude: 73.106812,
      },
      {
        city: "Khushab",
        latitude: 32.2955,
        longitude: 72.3489,
      },
      {
        city: "Khanewal",
        latitude: 30.286415,
        longitude: 71.93203,
      },
      {
        city: "Hafizabad",
        latitude: 32.071697,
        longitude: 73.68573,
      },
      {
        city: "Mandi Bahauddin",
        latitude: 32.588169,
        longitude: 73.497345,
      },
      {
        city: "Layyah",
        latitude: 30.9693,
        longitude: 70.9428,
      },
      {
        city: "Attock",
        latitude: 33.768051,
        longitude: 72.360703,
      },
      {
        city: "Lodhran",
        latitude: 29.5467,
        longitude: 71.6276,
      },
      {
        city: "Sargodha",
        latitude: 32.082466,
        longitude: 72.669128,
      },
      {
        city: "Bahawalpur",
        latitude: 29.418068,
        longitude: 71.670685,
      },
      {
        city: "Jhelum",
        latitude: 32.940548,
        longitude: 73.727631,
      },
      {
        city: "Narowal",
        latitude: 32.099476,
        longitude: 74.874733,
      },
      {
        city: "Kasur",
        latitude: 31.118793,
        longitude: 74.463272,
      },
      {
        city: "Bhakkar",
        latitude: 31.633333,
        longitude: 71.066666,
      },
      {
        city: "Jhang",
        latitude: 31.278046,
        longitude: 72.31176,
      },
      {
        city: "Jhang",
        latitude: 31.278046,
        longitude: 72.31176,
      },
      {
        city: "DG Khan",
        latitude: 30.032486,
        longitude: 70.640244,
      },
      {
        city: "Vehari",
        latitude: 30.045246,
        longitude: 72.348869,
      },
      {
        city: "Muzaffargarh",
        latitude: 30.074377,
        longitude: 71.184654,
      },
      {
        city: "Bahawalnagar",
        latitude: 30.0025,
        longitude: 73.2412,
      },
      {
        city: "Chakwal",
        latitude: 32.9328,
        longitude: 72.863,
      },
      {
        city: "Chiniot",
        latitude: 31.7292,
        longitude: 72.9822,
      },
      {
        city: "Mianwali",
        latitude: 32.5839,
        longitude: 71.537,
      },
      {
        city: "Nankana Sahib",
        latitude: 31.4492,
        longitude: 73.7125,
      },
      {
        city: "Pakpattan",
        latitude: 30.3573,
        longitude: 73.3827,
      },
      {
        city: "Rahim Yar Khan",
        latitude: 28.4212,
        longitude: 70.2989,
      },
      {
        city: "Rajanpurn",
        latitude: 29.1044,
        longitude: 70.3301,
      },
      {
        city: "Toba Tek Singh",
        latitude: 30.9709,
        longitude: 72.4826,
      },
    ];

    const handleGeoPickup = () => {
      return GeoLoc.filter((loc) => loc.city === pickup);
    };

    const handleGeoDrop = () => {
      return GeoLoc.filter((loc) => loc.city === drop);
    };

    const origin = {
      latitude: handleGeoPickup()[0].latitude,
      longitude: handleGeoPickup()[0].longitude,
      latitudeDelta: 6.105,
      longitudeDelta: 0.005,
    };
    // setOrignS(origin);
    orignS = origin;
    const pickupLocation = {
      latitude: handleGeoPickup()[0].latitude,
      longitude: handleGeoPickup()[0].longitude,
    };
    // setPickupLocationS(pickupLocation);
    pickupLocationS = pickupLocation;
    const dropLocation = {
      latitude: handleGeoDrop()[0].latitude,
      longitude: handleGeoDrop()[0].longitude,
    };
    // setDropLocationS(dropLocation);
    dropLocationS = dropLocation;
  }

  const privateChat = (name, number) => {
    var date = new Date();
    var time = date.toLocaleTimeString();
    var H = +time.substr(0, 2);
    var h = H % 12 || 12;
    var ampm = H < 12 || H === 24 ? " AM" : " PM";
    time = h + time.substr(2, 3) + ampm;
    const chatId = user > number ? user + number : number + user;
    const docRef2 = doc(db, "Users-Data", user, "messages", chatId);
    const infoData = {
      senderName: userDoc.name,
      recieverName: name,
      senderNumber: user,
      recieverNumber: number,
      sentAt: serverTimestamp(),
      time: time,
    };
    setDoc(docRef2, infoData, { merge: true });
    const docRef3 = doc(db, "Users-Data", number, "messages", chatId);
    setDoc(docRef3, infoData, { merge: true });
    const docRef = collection(db, "messages", chatId, "privateChats");
    const docData = {
      senderName: userDoc.name,
      recieverName: name,
      senderNumber: user,
      recieverNumber: number,
      sentAt: serverTimestamp(),
      time: time,
    };
    getDoc(docRef2).then((doc) => {
      if (doc.data() === undefined) {
        addDoc(docRef, docData, { merge: true });
      }
    });
  };

  const onLongPress = (name, number) => {
    Alert.alert("Message", "Do you want to message " + name + "?", [
      { text: "Cancel" },
      {
        text: "Yes",
        onPress: () => {
          privateChat(name, number);
          navigation.navigate("One To One", {
            name: name,
            number: number,
          });
        },
      },
    ]);
  };

  return (
    <>
      <ScrollView>
        <View style={{ height: 300, width: "100%" }}>
          <MapView
            initialRegion={
              typeof pickupDetail === "string"
                ? orignS
                : {
                    latitude: pickupDetail.latitude,
                    longitude: pickupDetail.longitude,
                    latitudeDelta: 6.105,
                    longitudeDelta: 0.005,
                  }
            }
            style={{ height: 300, width: "100%" }}
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
          >
            <MapView.Marker
              coordinate={
                typeof pickupDetail === "string"
                  ? pickupLocationS
                  : {
                      latitude: pickupDetail.latitude,
                      longitude: pickupDetail.longitude,
                    }
              }
              identifier="pickup"
            />
            <MapView.Marker
              coordinate={
                typeof dropDetail === "string"
                  ? dropLocationS
                  : {
                      latitude: dropDetail.latitude,
                      longitude: dropDetail.longitude,
                    }
              }
              identifier="drop"
            />
            <MapViewDirections
              origin={
                typeof pickupDetail === "string"
                  ? pickupLocationS
                  : {
                      latitude: pickupDetail.latitude,
                      longitude: pickupDetail.longitude,
                    }
              }
              destination={
                typeof dropDetail === "string"
                  ? dropLocationS
                  : {
                      latitude: dropDetail.latitude,
                      longitude: dropDetail.longitude,
                    }
              }
              apikey={GOOGLE_API_KEY}
              strokeWidth={3}
              strokeColors={[lightModColor.themeBackground]}
              timePrecision="now"
              mode="DRIVING"
              optimizeWaypoints={true}
              onReady={(result) => {
                console.log(result.distance + " km");
                console.log(result.duration + " minutes");
              }}
              onError={(errorMessage) => {
                console.log(errorMessage);
              }}
            />
          </MapView>
        </View>
        <View
          style={{
            backgroundColor: "#ffff",
            marginHorizontal: 10,
            paddingHorizontal: 10,
            paddingVertical: Platform.OS === "android" ? 15 : 20,
            borderRadius: 10,
            marginTop: -30,
          }}
        >
          <View style={[row]}>
            {typeof pickupDetail === "string" ? (
              <>
                <View style={{ width: "40%" }}>
                  <Text
                    style={[
                      availableRideHeading,
                      {
                        fontSize: Platform.OS === "android" ? 22 : 23,
                        marginBottom: 0,
                        textAlign: "auto",
                      },
                    ]}
                  >
                    {pickup}
                  </Text>
                </View>
                <View style={{ width: "40%" }}>
                  <Text
                    style={[
                      availableRideHeading,
                      {
                        fontSize: Platform.OS === "android" ? 22 : 23,
                        marginBottom: 0,
                        textAlign: "right",
                      },
                    ]}
                  >
                    {drop}
                  </Text>
                </View>
              </>
            ) : (
              <View style={{ justifyContent: "center", width: "100%" }}>
                <Text style={[availableRideHeading, { fontSize: 25 }]}>
                  Lahore
                </Text>
              </View>
            )}
          </View>
          <View
            style={[
              row,
              {
                alignItems: "flex-start",
                marginBottom: Platform.OS === "android" ? 5 : 8,
              },
            ]}
          >
            <View style={{ width: "40%" }}>
              <Text style={{ fontSize: Platform.OS === "android" ? 18 : 20 }}>
                {typeof pickupDetail === "string"
                  ? pickupDetail
                  : pickupDetail.description}
              </Text>
            </View>
            <View
              style={{
                width: "20%",
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              <MaterialCommunityIcons
                name="dots-horizontal"
                size={30}
                color={lightModColor.themeBackground}
                style={{ textAlign: "center" }}
              />
            </View>
            <View style={{ width: "40%" }}>
              <Text
                style={{
                  fontSize: Platform.OS === "android" ? 18 : 20,
                  textAlign: "right",
                }}
              >
                {typeof dropDetail === "string"
                  ? dropDetail
                  : dropDetail.description}
              </Text>
            </View>
          </View>
          <View style={[row, { marginVertical: 5 }]}>
            <Text style={{ fontSize: 20 }}>
              <FontAwesome5
                name="car"
                size={20}
                color={lightModColor.themeBackground}
              />
              {" " + carDetails}
            </Text>
            <Text
              style={{ fontSize: 20, textAlign: "center", fontWeight: "bold" }}
            >
              <Entypo
                name="price-tag"
                size={20}
                color={lightModColor.themeBackground}
              />
              {" Rs " + price}
            </Text>
          </View>
          <View
            style={[
              row,
              {
                borderTopColor: "#4444",
                borderTopWidth: 1,
                paddingVertical: 10,
                borderBottomColor: "#4444",
                borderBottomWidth: 1,
                // padding: 10,
              },
            ]}
          >
            <View style={[row, { alignItems: "center" }]}>
              <FontAwesome
                name="user-circle"
                size={15}
                color={seats >= 1 ? lightModColor.themeBackground : "gray"}
                style={{ marginRight: 3 }}
              />
              <FontAwesome
                name="user-circle"
                size={15}
                color={seats >= 2 ? lightModColor.themeBackground : "gray"}
                style={{ marginRight: 3 }}
              />
              <FontAwesome
                name="user-circle"
                size={15}
                color={
                  seats > 2 && seats === 3
                    ? lightModColor.themeBackground
                    : "gray"
                }
                style={{ marginRight: 3 }}
              />
              <Text>{seats} Seats</Text>
            </View>
            <View style={[row, { alignItems: "center" }]}>
              <Zocial
                name="cal"
                size={Platform.OS === "android" ? 15 : 18}
                color={lightModColor.themeBackground}
                // style={{ alignSelf: "center" }}
              />
              <Text>{" " + date}</Text>
            </View>
            <View style={[row, { alignItems: "center" }]}>
              <Ionicons
                name="md-time-outline"
                size={15}
                color={lightModColor.themeBackground}
                // style={{ alignSelf: "center" }}
              />
              <Text>{" " + time}</Text>
            </View>
          </View>
          {comments ? (
            <View style={{ paddingVertical: 10 }}>
              <Text style={{ fontSize: 18 }}>
                <AntDesign
                  name="infocirlceo"
                  size={18}
                  color={lightModColor.themeBackground}
                />
                {" " + comments}
              </Text>
            </View>
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
      <View
        style={{
          // position: "absolute",
          bottom: 0,
          width: "100%",
          backgroundColor: "#ffff",
          borderTopEndRadius: 20,
          borderTopLeftRadius: 20,
          alignSelf: "center",
        }}
      >
        {userDoc.phone !== currentUser.phone && (
          <View
            style={[
              row,
              {
                paddingVertical: 20,
                paddingHorizontal: 10,
                alignItems: "center",
              },
            ]}
          >
            <TouchableOpacity
              onPress={
                () =>
                  navigation.navigate("User Profile", { userInfo: thisUser })
                // console.log(currentUser)
              }
              style={[
                row,
                {
                  alignItems: "center",
                },
              ]}
            >
              <View
                style={{
                  backgroundColor: lightModColor.themeBackground,
                  borderRadius: 400,
                  // padding: 10,
                  height: 50,
                  width: 50,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesome
                  name="user"
                  size={35}
                  color={lightModColor.secoundColor}
                />
              </View>
              <View style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
                <Text style={[availableRideHeading, { marginBottom: 0 }]}>
                  {currentUser.name}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 50,
                padding: 10,
                backgroundColor: "#eae8e8",
              }}
              onPress={() =>
                userDoc.phone === currentUser.phone
                  ? null
                  : onLongPress(currentUser.name, currentUser.phone)
              }
            >
              <MaterialIcons
                name="messenger"
                size={24}
                color={lightModColor.themeBackground}
              />
            </TouchableOpacity>
          </View>
        )}
        {userDoc.phone !== currentUser.phone &&
          userDoc.phone === currentUser.phone && (
            <View style={{ paddingHorizontal: 10 }}>
              <TouchableOpacity
                style={[btn, { paddingVertical: 10, width: "100%" }]}
              >
                <Text style={[btnText]}>Book</Text>
              </TouchableOpacity>
            </View>
          )}
      </View>
    </>
  );
};

export default RideDetailsScreen;
