import React, { useCallback, useMemo } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { useProducts } from "../../hooks/useProducts";
import SearchBar from "../../components/SearchBar/SearchBar";
import BannerCarousel from "../../components/BannerCarousel";
import ProductCard from "../../components/ProductCard/ProductCard";
import Loader from "../../components/Loader/Loader";
import EmptyState from "../../components/EmptyState/EmptyState";
import { debounce } from "../../utils/debounce";
import { DEBOUNCE_DELAY } from "../../utils/constants";
import { Product } from "../../types/product";

const HomeScreen = () => {
  const { products, loading, hasMore, onSearch, loadMore, refresh } =
    useProducts();

  const debouncedSearch = useMemo(
    () => debounce(onSearch, DEBOUNCE_DELAY),
    [onSearch],
  );

  const renderItem = useCallback(
    ({ item }: { item: Product }) => <ProductCard product={item} />,
    [],
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>ShopMaxx</Text>
      </View>

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
        ListHeaderComponent={<BannerCarousel />} // Add spacing at top of list
      />
      {loading && <Loader />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 12,
    backgroundColor: "hsl(204, 72%, 72%)",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  header: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "rgb(241, 102, 37)",
  },
});

export default HomeScreen;
