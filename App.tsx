import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
import React from "react";
import AppNavigator from "./src/navigation";

export default function App() {
  return <AppNavigator />;
}
