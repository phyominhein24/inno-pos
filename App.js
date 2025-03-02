import React from "react";
import { StyleSheet, View } from "react-native";
import MainNavigator from "./navigation/MainNavigator";
import { Provider } from "react-redux";
import { stores } from "./shares/stores";
import NotificationBanner from "./shares/NotificationBanner";
import 'react-native-gesture-handler';


export default function App() {
  return (
      <Provider store={stores}>
        <View style={{ flex: 1 }}>
          <MainNavigator />
          <NotificationBanner />
        </View>
      </Provider>
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
