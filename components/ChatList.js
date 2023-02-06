import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";
import { CarState } from "../context/CarContext";
import { lightModColor } from "../style/Color";

const ChatList = (props) => {
  const { user, userDoc } = CarState();
  return (
    <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* <Image
            source={require("../assets/images.png")}
            style={{ borderRadius: 50, height: 45, width: 45 }}
          /> */}
          <View
            style={{
              backgroundColor: lightModColor.themeBackground,
              borderRadius: 400,
              // padding: 10,
              height: 45,
              width: 45,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome
              name="user"
              size={30}
              color={lightModColor.secoundColor}
            />
          </View>
          <View
            style={{
              paddingLeft: 10,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: lightModColor.fontColor,
              }}
            >
              {props.name}
            </Text>
            <Text style={{ fontSize: 12, opacity: 0.6 }}>
              {props.lastMsgBy == userDoc.phone
                ? "You: " + props.lastMsg
                : props.lastMsg}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 12, opacity: 0.6 }}>
            {props.lastMsgTime}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ChatList;
