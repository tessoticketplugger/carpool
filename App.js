import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

import { useFonts } from "expo-font";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { StyleSheet } from "react-native";
import "react-native-gesture-handler";
import { UserProvider } from "./context/CarContext";
import StackNavigator from "./navigations/StackNavigator";
import { ToastProvider } from "react-native-toast-notifications";

export default function App() {
  const [loaded] = useFonts({
    MonLight: require("./assets/fonts/Montserrat-Light.ttf"),
    MonRegular: require("./assets/fonts/Montserrat-Regular.ttf"),
    MonMedium: require("./assets/fonts/Montserrat-Medium.ttf"),
    MonBold: require("./assets/fonts/Montserrat-Bold.ttf"),
  });
  if (!loaded) {
    return null;
  }
  return (
    <ToastProvider style={{ marginBottom: 45 }}>
      <UserProvider>
        <NavigationContainer>
          <StackNavigator />
          <ExpoStatusBar style="light" />
        </NavigationContainer>
      </UserProvider>
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
