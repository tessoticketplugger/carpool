import { GOOGLE_API_KEY } from "@env";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { CarState } from "../../context/CarContext";
import { lightModColor } from "../../style/Color";

const LocationSelectScreen = () => {
  const { currentLocation, pickupCToC, setPickupCToC, dropCToC, setDropCToC } =
    CarState();
  const Navigation = useNavigation();
  const route = useRoute();
  const { type } = route.params;

  const CurrentLocationGet = {
    description: "Current Location",
    geometry: {
      location: {
        lat: currentLocation && currentLocation.coords.latitude,
        lng: currentLocation && currentLocation.coords.longitude,
      },
    },
  };

  return (
    <View style={{ backgroundColor: lightModColor.themeBackground, flex: 1 }}>
      <View
        style={{
          marginVertical: 15,
          backgroundColor: "#fff",
          height: 4,
          width: "25%",
          borderRadius: 3,
          opacity: 0.7,
          alignSelf: "center",
        }}
      ></View>
      <View style={{ padding: 10 }}>
        <GooglePlacesAutocomplete
          placeholder={"Search"}
          onPress={(data, details) => {
            if (type === "pickup") {
              setPickupCToC({
                description: data.description,
                main_text:
                  details.geometry.location.lat ===
                  CurrentLocationGet.geometry.location.lat
                    ? CurrentLocationGet.description
                    : data.structured_formatting.main_text,
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                shortLat: Number(
                  String(details.geometry.location.lat).slice(0, 6)
                ),
              });
              Navigation.goBack();
            } else if (type === "drop") {
              setDropCToC({
                description: data.description,
                main_text:
                  details.geometry.location.lat ===
                  CurrentLocationGet.geometry.location.lat
                    ? CurrentLocationGet.description
                    : data.structured_formatting.main_text,
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              });
              Navigation.goBack();
            }
          }}
          predefinedPlaces={type === "pickup" ? [CurrentLocationGet] : []}
          predefinedPlacesAlwaysVisible={type === "pickup" ? true : false}
          autoFocus={true}
          textInputProps={{
            autoFocus: true,
          }}
          styles={{
            container: {
              flex: 0,
            },
          }}
          minLength={2}
          enablePoweredByContainer={false}
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
          onFail={(error) => console.error(error)}
        />
      </View>
    </View>
  );
};

export default LocationSelectScreen;
