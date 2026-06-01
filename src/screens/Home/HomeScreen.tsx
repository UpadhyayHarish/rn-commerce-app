import React, { useCallback, useMemo, useState } from "react";
import { View, StyleSheet, FlatList, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useProducts } from "../../hooks/useProducts";
import { useFilters } from "../../hooks/useFilters";
import SearchBar from "../../components/SearchBar/SearchBar";
import BannerCarousel from "../../components/BannerCarousel";
import ProductCard from "../../components/ProductCard/ProductCard";
import Loader from "../../components/Loader/Loader";
import EmptyState from "../../components/EmptyState/EmptyState";
import FiltersModal from "../../components/Filters/FiltersModal";
import FilterCountPill from "../../components/Filters/FilterCountPill";
import { debounce } from "../../utils/debounce";
import { DEBOUNCE_DELAY } from "../../utils/constants";
import { Product } from "../../types/product";
import { mockFilters } from "../../mock/filters";

const HomeScreen = () => {
  const { products, loading, hasMore, onSearch, loadMore, refresh } =
    useProducts();
  const { appliedFilters, updateFilters } = useFilters();
  const [filtersVisible, setFiltersVisible] = useState(false);

  const uniqueProducts = useMemo(() => {
    const seen = new Set();

    return products.filter((item) => {
      if (seen.has(item.id)) {
        return false;
      }

      seen.add(item.id);
      return true;
    });
  }, [products]);
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
      <View style={styles.headerRow}>
        <View style={styles.searchBarContainer}>
          <SearchBar onSearch={debouncedSearch} />
        </View>

        <Pressable
          style={styles.filterButton}
          onPress={() => setFiltersVisible(true)}
        >
          <Ionicons name="filter" size={24} color="#007AFF" />
        </Pressable>
      </View>
      <Text style={styles.title}>{uniqueProducts.length} Products found</Text>
      <FlatList
        data={uniqueProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReached={hasMore ? loadMore : undefined}
        onEndReachedThreshold={0.5}
        refreshing={loading}
        onRefresh={refresh}
        ListEmptyComponent={
          !loading ? <EmptyState message="No products found" /> : null
        }
        ListHeaderComponent={<BannerCarousel />}
      />
      {loading && <Loader />}

      {/* Filters Modal */}
      <FiltersModal
        visible={filtersVisible}
        filters={mockFilters}
        appliedFilters={appliedFilters}
        onApply={updateFilters}
        onClose={() => setFiltersVisible(false)}
      />

      {/* Filter Count Pill */}
      <FilterCountPill
        appliedFilters={appliedFilters}
        onPress={() => setFiltersVisible(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 12,
    backgroundColor: "hsl(204, 42%, 88%)",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
    justifyContent: "space-between",
  },
  filterButton: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
  },
  searchBarContainer: {
    flex: 1,
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
