import { FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  queryEqual,
  where,
} from "firebase/firestore";
import React, { useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { db } from "../api/firebase";
import AvailableRideItems from "../components/AvailableRideItems";
import PickandDropForm from "../components/PickandDropForm";
import { lightModColor } from "../style/Color";
import { availableRideHeading, itemCenter, Months, row } from "../style/Style";

const SuggessionScreen = () => {
  //Navigation Properties
  const route = useRoute();
  const { pickUpLoca, dropLoca } = route.params;
  const Navigation = useNavigation();
  const [ridesDoc, setRidesDoc] = useState();

  //Data object
  let date = new Date();

  /// ********************* DataBase Logics **************************
  useLayoutEffect(() => {
    const collectionRef = collection(db, "Rides");
    const q = query(
      collectionRef,
      where("pickup", "==", pickUpLoca),
      where("drop", "==", dropLoca),
      where("expire", "==", false),
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
          expire: doc.data().expire,
        }))
      );
    });

    return Subscribe;
  }, []);

  return (
    <ScrollView>
      <View>
        <View style={[{ padding: 13, marginTop: 5 }]}>
          <Text style={[availableRideHeading]}>
            {"From " +
              date.getDate() +
              " " +
              Months[date.getMonth()].short +
              " " +
              date.getFullYear()}
          </Text>
          <PickandDropForm
            pickUpLoca={pickUpLoca}
            dropLoca={dropLoca}
            route={"get"}
          />
        </View>

        <View style={[row, { paddingVertical: 10, paddingHorizontal: 20 }]}>
          <Text style={[availableRideHeading]}>Avaiable Rides</Text>
          <TouchableOpacity style={[row]}>
            {/* <FontAwesome
              name="sort"
              size={25}
              color={lightModColor.themeBackground}
              style={{ alignItems: "center" }}
            />
            <Text
              style={[
                availableRideHeading,
                { color: lightModColor.themeBackground },
              ]}
            >
              Filter
            </Text> */}
          </TouchableOpacity>
        </View>
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
    </ScrollView>
  );
};

export default SuggessionScreen;

const styles = StyleSheet.create({});
