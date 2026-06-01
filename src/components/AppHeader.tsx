import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AppHeader: React.FC = () => (
  <View style={styles.header}>
    <Text style={styles.headerText}>Shopmax</Text>
    <Text style={styles.headerText2}>X</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "hsl(38, 71%, 72%)",
    paddingTop: 12,
    flexDirection: "row",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "rgb(241, 102, 37)",
  },
  headerText2: {
    fontSize: 34,
    fontWeight: "bold",
    color: "rgb(8, 134, 218)",
  },
});

export default AppHeader;
