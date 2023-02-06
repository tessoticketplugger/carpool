import {
  AntDesign,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import React, { useLayoutEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { lightModColor } from "../../style/Color";
import {
  availableRideHeading,
  availableRideLocaBox,
  btn,
  btnText,
  dropDownStyle,
  row,
} from "../../style/Style";
// import uuid from "react-native-uuid";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../../api/firebase";
import { CarState } from "../../context/CarContext";
import { useToast } from "react-native-toast-notifications";

const UpdateOfferScreen = () => {
  const Navigation = useNavigation();
  const toast = useToast();

  // ************ Update Routing ****************
  const route = useRoute();
  const {
    u_id,
    u_carDetails,
    u_price,
    u_pickup,
    u_drop,
    u_pickupDetail,
    u_dropDetail,
    u_seats,
    u_date,
    u_time,
    u_comments,
    u_createDate,
    u_formatedDate,
    u_edit,
    u_luggage,
  } = route.params;

  let current = new Date();

  // ******** Use States for all the input fields ********
  const [pickup, setPickup] = useState(u_pickup ? u_pickup : "");
  const [drop, setDrop] = useState(u_drop ? u_drop : "");
  const [pickupDetail, setPickupDetail] = useState(
    u_pickupDetail ? u_pickupDetail : ""
  );
  const [dropDetail, setDropDetail] = useState(
    u_dropDetail ? u_dropDetail : ""
  );
  const [currDate, setCurrDate] = useState(current);
  const [formatedDate, setFormatedDate] = useState(u_formatedDate);
  const [date, setDate] = useState(u_date);
  const [time, setTime] = useState(u_time);
  const [carDeatails, setCarDeatails] = useState(u_carDetails);
  const [seats, setSeats] = useState(u_seats);
  const [luggage, setLuggage] = useState(u_luggage);
  const [price, setPrice] = useState(u_price);
  const [comments, setComments] = useState(u_comments ? u_comments : "");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  // *********** Context Api Objects *************************
  const { userDoc } = CarState();

  // *************** Date n Time Logics **********************
  let currenDate =
    current.getDate() +
    "-" +
    (current.getMonth() + 1) +
    "-" +
    current.getFullYear();
  let currentTime = current.getHours() + " : " + current.getMinutes();

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || currDate;
    setShow(Platform.OS === "ios");
    let temDate = new Date(currentDate);
    setFormatedDate(temDate);
    let fDate =
      temDate.getDate() +
      "-" +
      (temDate.getMonth() + 1) +
      "-" +
      temDate.getFullYear();

    setCurrDate(currentDate);
    setDate(fDate);
  };

  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate || currDate;
    setShow(Platform.OS === "ios");

    let temDate = new Date(currentDate);
    let fhours =
      temDate.getHours() > 12 ? temDate.getHours() - 12 : temDate.getHours();
    let formHours = fhours < 10 ? "0" + fhours : fhours;
    let fMinutes =
      temDate.getMinutes() < 10
        ? "0" + temDate.getMinutes()
        : temDate.getMinutes();
    let ftime = formHours + " : " + fMinutes;
    let fZone =
      temDate.getHours() < 12 || temDate.getHours() == 24 ? "AM" : "PM";
    setCurrDate(currentDate);
    setTime(ftime + " " + fZone);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  // ************** Casecading Drop Down Logic ***************

  const pickupDropDown = [
    "Attock",
    "Bahawalnagar",
    "Bahawalpur",
    "Bhakkar",
    "Chakwal",
    "Chiniot",
    "DG Khan",
    "Faisalabad",
    "Gujranwala",
    "Gujrat",
    "Hafizabad",
    "Islamabad",
    "Jhang",
    "Jhelum",
    "Khanewal",
    "Khushab",
    "Lahore",
    "Layyah",
    "Lodhran",
    "Mandi Bahauddin",
    "Mianwali",
    "Multan",
    "Muzaffargarh",
    "Nankana Sahib",
    "Narowal",
    "Okara",
    "Pakpattan",
    "Kasur",
    "Rahim Yar Khan",
    "Rajanpur",
    "Rawalpindi",
    "Sahiwal",
    "Sargodha",
    "Sheikhupura",
    "Sialkot",
    "Toba Tek Singh",
    "Vehari",
  ];
  const dropinDropDown = [
    "Attock",
    "Bahawalnagar",
    "Bahawalpur",
    "Bhakkar",
    "Chakwal",
    "Chiniot",
    "DG Khan",
    "Faisalabad",
    "Gujranwala",
    "Gujrat",
    "Hafizabad",
    "Islamabad",
    "Jhang",
    "Jhelum",
    "Khanewal",
    "Khushab",
    "Lahore",
    "Layyah",
    "Lodhran",
    "Mandi Bahauddin",
    "Mianwali",
    "Multan",
    "Muzaffargarh",
    "Nankana Sahib",
    "Narowal",
    "Okara",
    "Pakpattan",
    "Kasur",
    "Rahim Yar Khan",
    "Rajanpur",
    "Rawalpindi",
    "Sahiwal",
    "Sargodha",
    "Sheikhupura",
    "Sialkot",
    "Toba Tek Singh",
    "Vehari",
  ];
  const [pickDropValue, setPickDropValue] = useState(pickupDropDown);
  const [dropDropValue, setDropDropValue] = useState(dropinDropDown);

  const handlePickup = () => {
    return pickupDropDown.filter((loc) => loc !== drop);
  };
  const handleDropin = () => {
    return dropinDropDown.filter((loc) => loc !== pickup);
  };

  useLayoutEffect(() => {
    setPickDropValue(handlePickup);
  }, [drop]);

  useLayoutEffect(() => {
    setDropDropValue(handleDropin);
  }, [pickup]);

  // ****************** DataBase Logic ********************
  const UpdateData = () => {
    const docRef = doc(db, "Rides", u_id);

    const docData = {
      pickup: pickup.replace(/\s/g, ""),
      drop: drop.replace(/\s/g, ""),
      pickupDetail: pickupDetail,
      dropDetail: dropDetail,
      date: date,
      time: time,
      carDeatails: carDeatails,
      luggage: luggage,
      seats: seats,
      price: price,
      comments: comments,
      updatedBy: userDoc,
      UpdatedData: serverTimestamp(),
      formatedDate: formatedDate,
      expire: false,
    };

    setDoc(docRef, docData, { merge: true })
      .then(
        toast.show("Offer updated successfully", {
          type: "success",
          placement: "bottom",
          duration: 3000,
          offset: 30,
          animationType: "slide-in",
        })
      )
      .catch((err) => console.log(err));

    Navigation.goBack();
  };

  const update = () => {
    if (date === currenDate) {
      if (time.slice(0, 2) === currentTime.slice(0, 2)) {
        // showAlert("", "warn");
        toast.show("Time should be 1 Hour more than current time", {
          type: "warning",
          placement: "bottom",
          duration: 3000,
          offset: 30,
          animationType: "slide-in",
        });
      } else {
        UpdateData();
      }
    } else {
      UpdateData();
    }
  };

  return (
    <ScrollView
      // onScroll={() => Keyboard.dismiss()}
      scrollEventThrottle={32}
      // automaticallyAdjustKeyboardInsets={true}
      // automaticallyAdjustsScrollIndicatorInsets={false}
    >
      <KeyboardAvoidingView
        style={{ padding: 10, height: Platform.OS === "ios" ? 800 : null }}
        behavior={Platform.OS === "android" ? null : "padding"}
      >
        <Text
          style={[availableRideHeading, { textAlign: "left", marginBottom: 5 }]}
        >
          Select City
        </Text>
        <View>
          <SelectDropdown
            defaultValue={pickup}
            data={pickDropValue}
            buttonStyle={dropDownStyle}
            buttonTextStyle={{ fontSize: 15 }}
            dropdownStyle={{ height: "70%" }}
            dropdownIconPosition="left"
            renderDropdownIcon={() => (
              <MaterialIcons
                name="my-location"
                size={20}
                color={lightModColor.themeBackground}
              />
            )}
            onSelect={(text) => setPickup(text)}
          />
        </View>
        <View
          style={{
            marginTop: 5,
          }}
        >
          <SelectDropdown
            data={dropDropValue}
            buttonStyle={dropDownStyle}
            defaultValue={drop}
            buttonTextStyle={{ fontSize: 15 }}
            dropdownIconPosition="left"
            dropdownStyle={{ height: "70%" }}
            // defaultValue={drop}
            renderDropdownIcon={() => (
              <MaterialIcons
                name="location-on"
                size={20}
                color={lightModColor.themeBackground}
              />
            )}
            onSelect={(text) => setDrop(text)}
          />
        </View>
        <Text
          style={[
            availableRideHeading,
            { textAlign: "left", marginVertical: 10 },
          ]}
        >
          Pick and Drop
        </Text>
        <View>
          <View>
            <Text>From</Text>
            <TextInput
              style={[availableRideLocaBox, { marginBottom: 5, height: 43 }]}
              placeholder="Detailed Pickup Location"
              onChangeText={(value) => setPickupDetail(value)}
              value={pickupDetail}
              maxLength={60}
            />
            <Text>To</Text>
            <TextInput
              style={[availableRideLocaBox, { height: 43 }]}
              placeholder="Detailed Drop Location"
              onChangeText={(value) => setDropDetail(value)}
              value={dropDetail}
              maxLength={60}
            />
          </View>
        </View>
        <Text
          style={[
            availableRideHeading,
            { textAlign: "left", marginVertical: 10 },
          ]}
        >
          Date & Time
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* <Button onPress={() => setShow(true)} title="MODAL" /> */}
          {Platform.OS === "ios" ? (
            <Modal
              animationType="fade"
              transparent={true}
              visible={show}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setShow(!show);
              }}
            >
              <Pressable
                style={{ flex: 1, backgroundColor: "black", opacity: 0.5 }}
                onPress={() => {
                  setShow(!show);
                }}
              />
              <View
                style={[
                  {
                    backgroundColor: "#D9D9D9",
                    height: "40%",
                    position: "absolute",
                    width: "100%",
                    right: 0,
                    bottom: 0,
                  },
                ]}
              >
                <RNDateTimePicker
                  display="spinner"
                  style={{
                    width: "100%",
                  }}
                  value={currDate}
                  mode={mode}
                  onChange={mode == "date" ? onChangeDate : onChangeTime}
                  themeVariant={"dark"}
                />
                <TouchableOpacity
                  onPress={() => {
                    setShow(!show);
                  }}
                  style={{
                    width: "80%",
                    backgroundColor: "#cccccc",
                    padding: 10,
                    borderRadius: 8,
                    alignSelf: "center",
                  }}
                >
                  <Text style={{ textAlign: "center" }}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          ) : (
            show && (
              <RNDateTimePicker
                value={currDate}
                mode={mode}
                onChange={mode === "date" ? onChangeDate : onChangeTime}
                // style={{ backgroundColor: lightModColor.themeBackground }}
                themeVariant={"dark"}
                minimumDate={new Date()}
              />
            )
          )}
          <Text style={{ marginRight: 5 }}>
            <MaterialIcons
              name="date-range"
              size={24}
              color={lightModColor.themeBackground}
            />
          </Text>
          <TouchableOpacity
            style={[availableRideLocaBox, { width: "41%" }]}
            onPress={() => showMode("date")}
          >
            <Text>{date ? date : setDate(currenDate)}</Text>
          </TouchableOpacity>
          <Text style={{ marginHorizontal: 5 }}>
            <Ionicons
              name="time-outline"
              size={24}
              color={lightModColor.themeBackground}
            />
          </Text>
          <TouchableOpacity
            style={[availableRideLocaBox, { width: "41%" }]}
            onPress={() => showMode("time")}
          >
            <Text>{time ? time : setTime(currentTime)}</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={[
            availableRideHeading,
            { textAlign: "left", marginVertical: 10 },
          ]}
        >
          Vehicle Details
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome5
            name="car"
            size={24}
            color={lightModColor.themeBackground}
          />
          <TextInput
            style={[
              availableRideLocaBox,
              { height: 43, width: "92%", marginLeft: 5 },
            ]}
            placeholder="Make/Model/Year"
            onChangeText={(value) => setCarDeatails(value)}
            value={carDeatails}
            maxLength={20}
          />
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", paddingTop: 5 }}
        >
          <MaterialIcons
            name="luggage"
            size={24}
            color={lightModColor.themeBackground}
            style={{ paddingRight: 5 }}
          />
          <View style={{ width: "41%" }}>
            <SelectDropdown
              data={["No bag", "Small bag", "Medium bag", "Large bag"]}
              buttonStyle={dropDownStyle}
              buttonTextStyle={{ fontSize: 15 }}
              defaultValue="No bag"
              renderDropdownIcon={() => (
                <AntDesign name="down" size={20} color="black" />
              )}
              onSelect={(text) => setLuggage(text)}
            />
          </View>
          <MaterialIcons
            name="event-seat"
            size={24}
            color={lightModColor.themeBackground}
            style={{ paddingHorizontal: 5 }}
          />
          <View style={[availableRideLocaBox, row, { width: "41%" }]}>
            <TouchableOpacity
              onPress={() => seats > 1 && setSeats(seats - 1)}
              disabled={seats === 1}
              style={{ opacity: seats === 1 ? 0.5 : 1 }}
            >
              <AntDesign
                name="minuscircle"
                size={22}
                color={lightModColor.themeBackground}
              />
            </TouchableOpacity>
            <Text style={{ paddingHorizontal: 5 }}>{seats}</Text>
            <TouchableOpacity
              onPress={() => seats < 3 && setSeats(seats + 1)}
              disabled={seats === 3}
              style={{ opacity: seats === 3 ? 0.5 : 1 }}
            >
              <AntDesign
                name="pluscircle"
                size={22}
                color={lightModColor.themeBackground}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={[
            availableRideHeading,
            { textAlign: "left", marginVertical: 10 },
          ]}
        >
          Trip Options{" "}
          <Text style={{ fontSize: 12, fontWeight: "200" }}>
            (Price per Passengers)
          </Text>
        </Text>

        <View style={[row, { alignItems: "center" }]}>
          <TouchableOpacity
            style={[availableRideLocaBox, { opacity: price <= 100 ? 0.5 : 1 }]}
            onPress={() => price > 100 && setPrice(price - 50)}
            disabled={price <= 100}
          >
            <AntDesign
              name="minuscircle"
              size={20}
              color={lightModColor.themeBackground}
            />
          </TouchableOpacity>
          <View
            style={[
              availableRideLocaBox,
              {
                width: "74%",
                height: "100%",
                alignItems: "center",
                // justifyContent: "center",
              },
            ]}
          >
            <Text style={{ paddingVertical: 3 }}>{price}</Text>
          </View>
          <TouchableOpacity
            style={[availableRideLocaBox, { opacity: price >= 8000 ? 0.5 : 1 }]}
            onPress={() => price < 8000 && setPrice(price + 50)}
            disabled={price >= 8000}
          >
            <AntDesign
              name="pluscircle"
              size={20}
              color={lightModColor.themeBackground}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={[
            availableRideHeading,
            { textAlign: "left", marginVertical: 10 },
          ]}
        >
          Comments
        </Text>
        <TextInput
          style={[availableRideLocaBox, { height: 70 }]}
          placeholder="Add some additional details"
          onChangeText={(value) => setComments(value)}
          value={comments}
          maxLength={100}
        />
        <TouchableOpacity
          onPress={update}
          style={[
            btn,
            {
              width: "60%",
              alignSelf: "center",
              padding: 10,
              marginTop: 15,
              opacity:
                pickup === "" ||
                drop === "" ||
                pickupDetail === "" ||
                dropDetail === "" ||
                date === "" ||
                time === "" ||
                carDeatails === "" ||
                luggage === "" ||
                seats === "" ||
                price === ""
                  ? 0.5
                  : 1,
            },
          ]}
          disabled={
            pickup === "" ||
            drop === "" ||
            pickupDetail === "" ||
            dropDetail === "" ||
            date === "" ||
            time === "" ||
            carDeatails === "" ||
            luggage === "" ||
            seats === "" ||
            price === ""
          }
        >
          <Text style={[btnText, { fontSize: 18 }]}>Update Offer</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default UpdateOfferScreen;
