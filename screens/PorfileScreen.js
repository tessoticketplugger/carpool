import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { CarState } from "../context/CarContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { lightModColor } from "../style/Color";
import { StatusBar } from "expo-status-bar";
import AvailableRideItems from "../components/AvailableRideItems";
import { itemCenter } from "../style/Style";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../api/firebase";

const PorfileScreen = ({ route, navigation }) => {
  const { userInfo } = route.params;
  const { userDoc } = CarState();
  const { height, width } = Dimensions.get("window");
  const [ridesDoc, setRidesDoc] = React.useState();
  const [date, setDate] = React.useState();

  useEffect(() => {
    const Months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const createdAt = new Date(userInfo.createdAt.toDate());
    const formatedDate = `${createdAt.getDate()} ${
      Months[createdAt.getMonth()]
    }, ${createdAt.getFullYear()}`;
    setDate(formatedDate);
  }, []);

  useEffect(() => {
    const collectionRef = collection(db, "Rides");
    const q = query(
      collectionRef,
      where("createBy", "==", userInfo),
      orderBy("formatedDate")
    );

    const Subscribe = onSnapshot(q, (snapshot) => {
      setRidesDoc(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          pickup: doc.data().pickup,
          drop: doc.data().drop,
          pickupDetail: doc.data().pickupDetail,
          dropDetail: doc.data().dropDetail,
          date: doc.data().date,
          time: doc.data().time,
          carDetails: doc.data().carDeatails,
          luggage: doc.data().luggage,
          seats: doc.data().seats,
          price: doc.data().price,
          comments: doc.data().comments,
          user: doc.data().createBy,
          createDate: doc.data().createDate,
          formatedDate: doc.data().formatedDate.toDate(),
        }))
      );
    });

    return Subscribe;
  }, []);
  return (
    <>
      <ScrollView bounces={false}>
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
              // backgroundColor: lightModColor.themeBackground,
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
              
            }}
          /> */}
        </View>
        <View style={{ backgroundColor: "#f2f2f2", zIndex: -1 }}>
          <View style={{ marginTop: 60 }}>
            <Text style={{ textAlign: "center", fontFamily: "MonBold" }}>
              {userInfo.name}
            </Text>
            <Text style={{ textAlign: "center", fontFamily: "MonLight" }}>
              {date}
            </Text>
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontFamily: "MonBold", marginHorizontal: 10 }}>
                Recent Activity
              </Text>
              {/* <AvailableRideItems /> */}
              {ridesDoc ? (
                ridesDoc.length === 0 ? (
                  <View style={[itemCenter, { height: 350 }]}>
                    <Text
                      style={{
                        color: lightModColor.themeBackground,
                        textAlign: "center",
                        fontSize: 18,
                      }}
                    >
                      No Rides Available
                    </Text>
                  </View>
                ) : (
                  ridesDoc.map((doc) => (
                    <AvailableRideItems
                      key={doc.id}
                      id={doc.id}
                      user={doc.user}
                      carDetails={doc.carDetails}
                      pickup={doc.pickup}
                      drop={doc.drop}
                      price={doc.price}
                      pickupDetail={doc.pickupDetail}
                      dropDetail={doc.dropDetail}
                      seats={doc.seats}
                      date={doc.date}
                      time={doc.time}
                      comments={doc.comments}
                      createDate={doc.createDate}
                      formatedDate={doc.formatedDate}
                    />
                  ))
                )
              ) : (
                <View style={[itemCenter, { height: 350 }]}>
                  <ActivityIndicator
                    color={lightModColor.themeBackground}
                    size="large"
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      <StatusBar
        style="light"
        backgroundColor={lightModColor.themeBackground}
      />
    </>
  );
};

export default PorfileScreen;

const styles = StyleSheet.create({});
