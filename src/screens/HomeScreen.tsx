import React from "react";
import { View, StyleSheet } from "react-native";
import SearchBar from "../components/SearchBar";
import ProductList from "../components/ProductList";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <SearchBar />
      <ProductList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});

export default HomeScreen;
