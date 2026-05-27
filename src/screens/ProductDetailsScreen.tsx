import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProductDetailsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Details</Text>
      {/* Product details content goes here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});

export default ProductDetailsScreen;
