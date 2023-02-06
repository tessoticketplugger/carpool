//create a context api for user
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc } from "firebase/firestore";
import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { db } from "../api/firebase";
import * as Location from "expo-location";

const CarContext = createContext();

//create a provider for user context
export function UserProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();
  const [userDoc, setUserDoc] = useState(null);
  const [currentLocation, setCurrentLocation] = useState();
  const [pickupCToC, setPickupCToC] = useState();
  const [dropCToC, setDropCToC] = useState();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Access Denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location);
      setPickupCToC({
        description: "Current Location",
        latitude: location.coords.latitude,
        shortLat: Number(String(location.coords.latitude).slice(0, 6)),
        longitude: location.coords.longitude,
        main_text: "Current Location",
      });
    })();
  }, []);

  useEffect(() => {
    if (user) {
      const docRef = doc(db, "Users-Data", user);
      getDoc(docRef)
        .then((snapshot) => {
          if (snapshot.exists) {
            setUserDoc(snapshot.data());
          } else {
            console.log("No doc found");
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [user]);
  useLayoutEffect(() => {
    asyncUser();
  }, []);
  const asyncUser = () => {
    AsyncStorage.getItem("user")
      .then((v) => (v ? setUser(JSON.parse(v)) : setUser("")))
      .then(() => setIsLoading(false))
      .catch((e) => console.log(e));
  };

  return (
    <CarContext.Provider
      value={{
        user,
        setUser,
        userDoc,
        setUserDoc,
        isLoading,
        // alert,
        // setalert,
        currentLocation,
        setCurrentLocation,
        pickupCToC,
        setPickupCToC,
        dropCToC,
        setDropCToC,
      }}
    >
      {children}
    </CarContext.Provider>
  );
}

export const CarState = () => {
  return useContext(CarContext);
};
