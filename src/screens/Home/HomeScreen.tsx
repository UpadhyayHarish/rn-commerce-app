import React, { useCallback, useMemo } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { useProducts } from "../../hooks/useProducts";
import SearchBar from "../../components/SearchBar/SearchBar";
import ProductCard from "../../components/ProductCard/ProductCard";
import Loader from "../../components/Loader/Loader";
import EmptyState from "../../components/EmptyState/EmptyState";
import { debounce } from "../../utils/debounce";
import { DEBOUNCE_DELAY } from "../../utils/constants";

const HomeScreen = () => {
  const { products, loading, hasMore, onSearch, loadMore, refresh } =
    useProducts();

  const debouncedSearch = useMemo(
    () => debounce(onSearch, DEBOUNCE_DELAY),
    [onSearch],
  );

  const renderItem = useCallback(
    ({ item }) => <ProductCard product={item} />,
    [],
  );

  return (
    <View style={styles.container}>
      <SearchBar onSearch={debouncedSearch} />
      <Text style={styles.title}>{products.length} Products found</Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReached={hasMore ? loadMore : undefined}
        onEndReachedThreshold={0.5}
        refreshing={loading}
        onRefresh={refresh}
        ListEmptyComponent={
          !loading ? <EmptyState message="No products found" /> : null
        }
      />
      {loading && <Loader />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
});

export default HomeScreen;
