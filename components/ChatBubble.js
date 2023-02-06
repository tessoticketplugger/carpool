import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ChatBubble = (props) => {
  return (
    <View
      style={{
        backgroundColor: props.backgroundColor,
        borderRadius: 12,
        alignSelf: props.flex,
        marginVertical: 7.5,
        marginHorizontal: 10,
      }}
    >
      <View>
        {props.name ? (
          <Text
            style={{
              color: props.nameColor,
              marginHorizontal: 10,
              marginTop: 10,
              fontWeight: "bold",
            }}
          >
            {props.name}
          </Text>
        ) : null}
      </View>
      <Text
        style={{
          color: props.fontColor,
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}
      >
        {props.message}
      </Text>
      <Text
        style={{
          textAlign: "right",
          color: props.fontColor,
          marginLeft: 80,
          marginRight: 7,
          marginBottom: 5,
          fontSize: 11,
          opacity: 0.6,
        }}
      >
        {props.sentTime}
      </Text>
    </View>
  );
};

export default ChatBubble;

const styles = StyleSheet.create({});
