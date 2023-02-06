import { useNavigation, useRoute } from "@react-navigation/native";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { db } from "../../api/firebase";
import AvailableRideItems from "../../components/AvailableRideItems";
import PickandDropForm from "../../components/PickandDropForm";
import { lightModColor } from "../../style/Color";
import {
  availableRideHeading,
  itemCenter,
  Months,
  row,
} from "../../style/Style";

const SuggestionCToCScreen = () => {
  //Navigation Properties
  const route = useRoute();
  const { pickUpLoca, dropLoca } = route.params;
  const Navigation = useNavigation();
  const [ridesDoc, setRidesDoc] = useState();

  //   useEffect(() => {
  //     setPickupCToC(null);
  //     setDropCToC(null);
  //   }, []);

  //Data object
  let date = new Date();
  console.log(pickUpLoca);

  // ********************* DataBase Logics **************************
  useLayoutEffect(() => {
    const collectionRef = collection(db, "Rides");
    const q = query(
      collectionRef,
      // where("pickup", "==", pickUpLoca),
      // where("drop", "==", dropLoca),
      where("type", "==", "Inside City"),
      where("expire", "==", false),
      // where(
      //   "Number(String(pickupDetail.latitude).slice(0, 5))",
      //   "==",
      //   Number(String(pickUpLoca.latitude).slice(0, 5))
      // ),
      where("pickupDetail.shortLat", "==", pickUpLoca.shortLat),
      orderBy("formatedDate")
    );

    const Subscribe = onSnapshot(q, (snapshot) => {
      setRidesDoc(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          // pickup: doc.data().pickup,
          // drop: doc.data().drop,
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
            pickUpLoca={pickUpLoca.main_text}
            dropLoca={dropLoca.main_text}
            route={"get"}
          />
        </View>

        <View style={[row, { paddingVertical: 10, paddingHorizontal: 20 }]}>
          <Text style={[availableRideHeading]}>Avaiable Rides</Text>
          <TouchableOpacity style={[row]}></TouchableOpacity>
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
          <View
            style={[
              itemCenter,
              { height: Platform.OS === "android" ? 350 : 425 },
            ]}
          >
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

export default SuggestionCToCScreen;
