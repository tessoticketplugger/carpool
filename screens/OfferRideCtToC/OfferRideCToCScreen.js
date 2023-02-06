import {
  AntDesign,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  LogBox,
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
import { GOOGLE_API_KEY } from "@env";
import { useNavigation } from "@react-navigation/native";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useToast } from "react-native-toast-notifications";
import { db } from "../../api/firebase";
import { CarState } from "../../context/CarContext";

const OfferRideCToCScreen = () => {
  const Navigation = useNavigation();
  const toast = useToast();
  let current = new Date();

  // ******** Use States for all the input fields ********
  // const [pickup, setPickup] = useState("");
  // const [drop, setDrop] = useState("");
  const [pickupDetail, setPickupDetail] = useState("");
  const [dropDetail, setDropDetail] = useState("");
  const [currDate, setCurrDate] = useState(current);
  const [formatedDate, setFormatedDate] = useState(current);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [carDeatails, setCarDeatails] = useState("");
  const [seats, setSeats] = useState(1);
  const [luggage, setLuggage] = useState("Hand Bag");
  const [price, setPrice] = useState(1000);
  const [comments, setComments] = useState("");
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

  // ******* DataBase Logics **********

  const addData = () => {
    const collectionRef = collection(db, "Rides");

    const docData = {
      pickupDetail: pickupDetail,
      dropDetail: dropDetail,
      date: date,
      time: time,
      carDeatails: carDeatails,
      luggage: luggage,
      seats: seats,
      price: price,
      comments: comments,
      createBy: userDoc,
      createDate: serverTimestamp(),
      formatedDate: formatedDate,
      expire: false,
      type: "Inside City",
    };

    addDoc(collectionRef, docData)
      .then(
        // showAlert("", "success")
        toast.show("Offer Posted", {
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

  const create = () => {
    if (date === currenDate) {
      if (time.slice(0, 2) === currentTime.slice(0, 2)) {
        // showAlert("", "warn");
        toast.show("Time should be more than current time", {
          type: "warning",
          placement: "bottom",
          duration: 3000,
          offset: 30,
          animationType: "slide-in",
        });
      } else {
        addData();
      }
    } else {
      addData();
    }
  };

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

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
          City
        </Text>
        <View style={[availableRideLocaBox]}>
          <Text>Lahore</Text>
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
            <GooglePlacesAutocomplete
              placeholder="Pick up"
              onPress={(data, details) => {
                setPickupDetail({
                  description: data.description,
                  main_text: data.structured_formatting.main_text,
                  latitude: details.geometry.location.lat,
                  shortLat: Number(
                    String(details.geometry.location.lat).slice(0, 6)
                  ),
                  longitude: details.geometry.location.lng,
                });
              }}
              styles={{
                container: {
                  flex: 0,
                },

                textInput: availableRideLocaBox,
              }}
              minLength={2}
              enablePoweredByContainer={false}
              // GooglePlacesSearchQuery={{
              //   rankby: "distance",
              //   type: "restaurant",
              // }}
              keepResultsAfterBlur={true}
              fetchDetails={true}
              query={{
                key: GOOGLE_API_KEY,
                language: "en",
                components: "country:pak",
                location: "31.5204, 74.3587",
                radius: "30000",
                strictbounds: true,
              }}
              nearbyPlacesAPI="GooglePlacesSearch"
              debounce={400}
            />

            <Text>To</Text>

            <GooglePlacesAutocomplete
              placeholder="Drop"
              onPress={(data, details) => {
                setDropDetail({
                  description: data.description,
                  main_text: data.structured_formatting.main_text,
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                });
              }}
              styles={{
                container: {
                  flex: 0,
                },

                textInput: availableRideLocaBox,
              }}
              minLength={2}
              enablePoweredByContainer={false}
              // GooglePlacesSearchQuery={{
              //   rankby: "distance",
              //   type: "restaurant",
              // }}
              keepResultsAfterBlur={true}
              fetchDetails={true}
              query={{
                key: GOOGLE_API_KEY,
                language: "en",
                components: "country:pak",
                location: "31.5204, 74.3587",
                radius: "30000",
                strictbounds: true,
              }}
              nearbyPlacesAPI="GooglePlacesSearch"
              debounce={400}
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
                  // style={{ backgroundColor: lightModColor.themeBackground }}
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
              onPress={() => seats < 25 && setSeats(seats + 1)}
              disabled={seats === 25}
              style={{ opacity: seats === 25 ? 0.5 : 1 }}
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
          onPress={create}
          style={[
            btn,
            {
              width: "60%",
              alignSelf: "center",
              padding: 10,
              marginTop: 15,
              opacity:
                // pickup === "" ||
                // drop === "" ||
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
            // pickup === "" ||
            // drop === "" ||
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
          <Text style={[btnText, { fontSize: 18 }]}>Post Offer</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default OfferRideCToCScreen;
