import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppliedFilters } from "../../types/filter";

interface FilterCountPillProps {
  appliedFilters: AppliedFilters;
  onPress: () => void;
}

const FilterCountPill: React.FC<FilterCountPillProps> = ({
  appliedFilters,
  onPress,
}) => {
  // Count total applied filters
  const filterCount = Object.values(appliedFilters).reduce(
    (total, values) => total + values.length,
    0,
  );

  //   if (filterCount === 0) {
  //     return null;
  //   }

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Ionicons name="filter" size={16} color="#fff" />
      <Text style={styles.text}>{filterCount}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007AFF",
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  text: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default FilterCountPill;
