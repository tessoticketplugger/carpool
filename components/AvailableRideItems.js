import {
  Entypo,
  FontAwesome,
  Ionicons,
  Octicons,
  Zocial,
  FontAwesome5,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import React from "react";
import { Image, Text, TouchableOpacity, View, Alert } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { db } from "../api/firebase";
import { CarState } from "../context/CarContext";
import { lightModColor } from "../style/Color";
import { btn, btnText, itemCenter, row } from "../style/Style";

const AvailableRideItems = (props) => {
  // *********** Rides Expiring Logic *******************
  const current = new Date();
  const Navigation = useNavigation();
  const { userDoc } = CarState();
  const toast = useToast();

  // console.log(Number(String(props.pickupDetail.latitude).slice(0, 5)));

  const expireRides = () => {
    const expiredDoc = doc(db, "Rides", props.id);
    const data = {
      expire: true,
    };
    setDoc(expiredDoc, data, { merge: true });
  };

  if (!props.history) {
    if (current.getDate() <= props.formatedDate.getDate()) {
      if (current.getMonth() <= props.formatedDate.getMonth()) {
      } else {
        expireRides();
      }
    } else {
      expireRides();
    }
  }

  // ***************** Delete Rides Logic********************
  const _delete = () => {
    Alert.alert("Confirm", "Are you sure you want to delete your Ride", [
      {
        text: "Yes",
        onPress: () => {
          const myDoc = doc(db, "Rides", props.id);
          deleteDoc(myDoc)
            .then(
              // showAlert("", "")
              toast.show("Your ride deleted successfully", {
                type: "success",
                placement: "bottom",
                duration: 3000,
                offset: 30,
                animationType: "slide-in",
              })
            )
            .catch((err) => console.log(err.message, "error"));
        },
      },
      {
        text: "NO",
      },
    ]);
  };

  return (
    <View
      key={props.id}
      style={{
        backgroundColor: "#ffff",
        margin: 10,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
      }}
    >
      <View style={[row]}>
        <View style={[row, { width: "75%", justifyContent: "flex-start" }]}>
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
            <Text
              style={{
                fontSize: 15,
                //  fontFamily: "MonLight"
              }}
            >
              {props.user.name === userDoc.name ? "You" : props.user.name}
            </Text>
            <Text style={{ fontSize: 15 }}>
              <FontAwesome5
                name="car"
                size={15}
                color={lightModColor.themeBackground}
              />{" "}
              {props.carDetails}
            </Text>
          </View>
        </View>
        <View
          style={{ paddingVertical: 5, paddingHorizontal: 10, width: "27%" }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              alignSelf: "flex-end",
              fontFamily: "MonBold",
            }}
          >
            Rs.{props.price}
          </Text>
        </View>
      </View>
      <View style={{ paddingVertical: 10 }}>
        <View style={[row, { justifyContent: "flex-start" }]}>
          <Octicons
            name="dot-fill"
            size={40}
            color={lightModColor.themeBackground}
            style={{ alignSelf: "center" }}
          />
          <Text
            style={{
              fontSize: 18,
              paddingLeft: 10,
              alignSelf: "center",
              marginBottom: 2,
              width: "95%",
            }}
          >
            {typeof props.pickupDetail === "string"
              ? `${props.pickupDetail}, ${props.pickup}`
              : props.pickupDetail.main_text}
          </Text>
        </View>
        <View>
          <Entypo
            name="dots-three-vertical"
            size={20}
            color={lightModColor.themeBackground}
          />
        </View>
        <View style={[row, { justifyContent: "flex-start" }]}>
          <Octicons
            name="dot-fill"
            size={40}
            color={lightModColor.themeBackground}
            style={{ alignSelf: "center" }}
          />
          <Text
            style={{
              fontSize: 18,
              paddingLeft: 10,
              alignSelf: "center",
              marginBottom: 3,
              width: "95%",
            }}
          >
            {typeof props.dropDetail === "string"
              ? `${props.dropDetail}, ${props.drop}`
              : props.dropDetail.main_text}
          </Text>
        </View>
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
            color={props.seats >= 1 ? lightModColor.themeBackground : "gray"}
            style={{ marginRight: 3 }}
          />
          <FontAwesome
            name="user-circle"
            size={15}
            color={props.seats >= 2 ? lightModColor.themeBackground : "gray"}
            style={{ marginRight: 3 }}
          />
          <FontAwesome
            name="user-circle"
            size={15}
            color={
              props.seats > 2 && props.seats === 3
                ? lightModColor.themeBackground
                : "gray"
            }
            style={{ marginRight: 3 }}
          />
          <Text style={{ fontSize: 15 }}>{props.seats} Seats</Text>
        </View>
        <View style={[row, { alignItems: "center" }]}>
          <Zocial
            name="cal"
            size={15}
            color={lightModColor.themeBackground}
            // style={{ alignSelf: "center" }}
          />
          <Text>{" " + props.date}</Text>
        </View>
        <View style={[row, { alignItems: "center" }]}>
          <Ionicons
            name="md-time-outline"
            size={15}
            color={lightModColor.themeBackground}
            // style={{ alignSelf: "center" }}
          />
          <Text>{" " + props.time}</Text>
        </View>
      </View>
      <View
        style={[
          itemCenter,
          row,
          { marginVertical: 10, justifyContent: "center" },
        ]}
      >
        {props.history ? (
          <>
            <TouchableOpacity
              onPress={_delete}
              style={[
                btn,
                {
                  padding: 8,
                  width: "60%",
                  backgroundColor: lightModColor.themeBackground,
                },
              ]}
            >
              <Text style={[btnText]}>Remove Ride</Text>
            </TouchableOpacity>
          </>
        ) : props.active ? (
          <>
            <TouchableOpacity
              style={[
                btn,
                {
                  padding: 8,
                  width: "31%",
                  backgroundColor: lightModColor.themeBackground,
                },
              ]}
              onPress={() =>
                Navigation.navigate("RideDetails", {
                  id: props.id,
                  currentUser: props.user,
                  carDetails: props.carDetails,
                  price: props.price,
                  pickup: props.pickup,
                  drop: props.drop,
                  pickupDetail: props.pickupDetail,
                  dropDetail: props.dropDetail,
                  seats: props.seats,
                  date: props.date,
                  time: props.time,
                  comments: props.comments,
                  createDate: props.createDate,
                  luggage: props.luggage,
                })
              }
            >
              <Text style={[btnText]}>Details</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                typeof props.pickupDetail === "string"
                  ? Navigation.navigate("updateOffer", {
                      u_id: props.id,
                      u_carDetails: props.carDetails,
                      u_price: props.price,
                      u_pickup: props.pickup,
                      u_drop: props.drop,
                      u_pickupDetail: props.pickupDetail,
                      u_dropDetail: props.dropDetail,
                      u_seats: props.seats,
                      u_date: props.date,
                      u_time: props.time,
                      u_comments: props.comments,
                      u_createDate: props.createDate,
                      u_formatedDate: props.formatedDate,
                      u_edit: "edit",
                      u_luggage: props.luggage,
                    })
                  : Navigation.navigate("updateOfferCToC", {
                      u_id: props.id,
                      u_carDetails: props.carDetails,
                      u_price: props.price,
                      u_pickupDetail: props.pickupDetail,
                      u_dropDetail: props.dropDetail,
                      u_seats: props.seats,
                      u_date: props.date,
                      u_time: props.time,
                      u_comments: props.comments,
                      u_createDate: props.createDate,
                      u_formatedDate: props.formatedDate,
                      u_edit: "edit",
                      u_luggage: props.luggage,
                    })
              }
              style={[
                btn,
                {
                  padding: 8,
                  width: "31%",
                  backgroundColor: lightModColor.secoundColor,
                  marginHorizontal: 10,
                },
              ]}
            >
              <Text style={[btnText, { color: lightModColor.themeBackground }]}>
                Edit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={_delete}
              style={[
                btn,
                {
                  padding: 8,
                  width: "31%",
                  backgroundColor: lightModColor.themeBackground,
                },
              ]}
            >
              <Text style={[btnText]}>Remove</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={[
              btn,
              {
                padding: 8,
                width: props.user.phone !== userDoc.phone ? "60%" : "60%",
                backgroundColor: lightModColor.themeBackground,
              },
            ]}
            onPress={() =>
              Navigation.navigate("RideDetails", {
                id: props.id,
                currentUser: props.user,
                carDetails: props.carDetails,
                price: props.price,
                pickup: props.pickup,
                drop: props.drop,
                pickupDetail: props.pickupDetail,
                dropDetail: props.dropDetail,
                seats: props.seats,
                date: props.date,
                time: props.time,
                comments: props.comments,
                createDate: props.createDate,
              })
            }
          >
            <Text style={[btnText]}>Details</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default AvailableRideItems;
