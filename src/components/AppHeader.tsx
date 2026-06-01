import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AppHeader: React.FC = () => (
  <View style={styles.header}>
    <Text style={styles.headerText}>ShopMaxx</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "hsl(38, 71%, 72%)",
    paddingTop: 12,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "rgb(241, 102, 37)",
  },
});

export default AppHeader;
