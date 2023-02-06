import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useLayoutEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { db } from "../../api/firebase";
import AvailableRideItems from "../../components/AvailableRideItems";
import { CarState } from "../../context/CarContext";
import { lightModColor } from "../../style/Color";
import { itemCenter } from "../../style/Style";

const HistoryScreen = () => {
  const [ridesDoc, setRidesDoc] = useState();
  const { userDoc } = CarState();

  useLayoutEffect(() => {
    const collectionRef = collection(db, "Rides");
    const q = query(
      collectionRef,
      where("createBy", "==", userDoc),
      where("expire", "==", true),
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
        {ridesDoc ? (
          ridesDoc.length === 0 ? (
            <View style={[itemCenter, { height: 550 }]}>
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
                history={"history"}
              />
            ))
          )
        ) : (
          <View style={[{ height: 550 }, itemCenter]}>
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

export default HistoryScreen;
