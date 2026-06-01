import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FilterGroup } from "../../types/filter";
import FilterOption from "./FilterOption";

interface FilterGroupProps {
  filter: FilterGroup;
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

const FilterGroupComponent: React.FC<FilterGroupProps> = ({
  filter,
  selectedValues,
  onChange,
}) => {
  const handleSelect = (valueId: string) => {
    if (filter.type === "radio") {
      // Radio button: single select, toggle on/off
      onChange(selectedValues.includes(valueId) ? [] : [valueId]);
    } else {
      // Checkbox: multi-select
      const updated = selectedValues.includes(valueId)
        ? selectedValues.filter((id) => id !== valueId)
        : [...selectedValues, valueId];
      onChange(updated);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.filterName}>{filter.name}</Text>
      <View style={styles.valuesContainer}>
        {filter.values.map((value) => (
          <FilterOption
            key={value.id}
            value={value}
            isSelected={selectedValues.includes(value.id)}
            type={filter.type}
            onPress={() => handleSelect(value.id)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  filterName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#000",
  },
  valuesContainer: {
    gap: 8,
  },
});

export default FilterGroupComponent;
