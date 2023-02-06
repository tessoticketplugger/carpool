import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import ChatList from "../components/ChatList";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../api/firebase";
import { CarState } from "../context/CarContext";
import LoadingScreen from "./LoadingScreen";
import { useNavigation } from "@react-navigation/native";
import { lightModColor } from "../style/Color";

const PrivateChats = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const { user, userDoc } = CarState();

  const setSeen = (chatId, number, senderName, recieverName, senderNumber) => {
    const collectionRef2 = doc(db, "Users-Data", user, "messages", chatId);
    const collectionRef3 = doc(db, "Users-Data", number, "messages", chatId);
    updateDoc(collectionRef2, { lastMsgSeen: true }, { merge: true });
    updateDoc(collectionRef3, { lastMsgSeen: true }, { merge: true });

    navigation.navigate("One To One", {
      name: senderName == userDoc.name ? recieverName : senderName,
      number: senderNumber == userDoc.phone ? number : senderNumber,
      id: chatId,
    });
  };

  useEffect(() => {
    setIsLoading(true);
    const collectionRef = collection(db, "Users-Data", user, "messages");

    const q = query(collectionRef, orderBy("latest", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          recieverName: doc.data().recieverName,
          senderName: doc.data().senderName,
          recieverNumber: doc.data().recieverNumber,
          senderNumber: doc.data().senderNumber,
          lastMsg: doc.data().lastMsg,
          lastMsgTime: doc.data().lastMsgTime,
          lastMsgBy: doc.data().lastMsgBy,
          lastMsgSeen: doc.data().lastMsgSeen,
        }))
      );
      setIsLoading(false);
    });

    console.log(chats);
    return unsub;
  }, []);
  return (
    <ScrollView>
      {isLoading ? (
        <View style={{ marginTop: 30 }}>
          <ActivityIndicator
            size="large"
            color={lightModColor.themeBackground}
          />
        </View>
      ) : (
        chats &&
        chats.map((chat) => (
          <TouchableOpacity
            key={chat.id}
            onPress={() =>
              setSeen(
                chat.id,
                chat.recieverNumber,
                chat.senderName,
                chat.recieverName,
                chat.senderNumber
              )
            }
          >
            <ChatList
              name={
                chat.senderName == userDoc.name
                  ? chat.recieverName
                  : chat.senderName
              }
              lastMsg={chat.lastMsg}
              lastMsgTime={chat.lastMsgTime}
              lastMsgBy={chat.lastMsgBy}
              lastMsgSeen={chat.lastMsgSeen}
            />
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
};

export default PrivateChats;
