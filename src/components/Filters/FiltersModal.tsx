import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FilterGroup, AppliedFilters } from "../../types/filter";
import FilterOption from "./FilterOption";

interface FiltersModalProps {
  visible: boolean;
  filters: FilterGroup[];
  appliedFilters: AppliedFilters;
  onApply: (filters: AppliedFilters) => void;
  onClose: () => void;
}

const FiltersModal: React.FC<FiltersModalProps> = ({
  visible,
  filters,
  appliedFilters,
  onApply,
  onClose,
}) => {
  const [tempFilters, setTempFilters] =
    useState<AppliedFilters>(appliedFilters);
  const [selectedFilterId, setSelectedFilterId] = useState<string>(
    filters?.[0]?.id || "",
  );

  useEffect(() => {
    if (visible) {
      setTempFilters(appliedFilters);
      setSelectedFilterId(filters?.[0]?.id || "");
    }
  }, [visible, appliedFilters, filters]);

  const selectedFilter = useMemo(
    () =>
      filters.find((filter) => filter.id === selectedFilterId) || filters[0],
    [filters, selectedFilterId],
  );

  const selectedValues = tempFilters[selectedFilter?.id] || [];

  const handleFilterChange = (filterId: string, values: string[]) => {
    setTempFilters((prev) => ({
      ...prev,
      [filterId]: values.length > 0 ? values : [],
    }));
  };

  const handleValueToggle = (valueId: string) => {
    if (!selectedFilter) return;

    const currentValues = tempFilters[selectedFilter.id] || [];

    if (selectedFilter.type === "radio") {
      const nextValues = currentValues.includes(valueId) ? [] : [valueId];
      handleFilterChange(selectedFilter.id, nextValues);
    } else {
      const nextValues = currentValues.includes(valueId)
        ? currentValues.filter((id) => id !== valueId)
        : [...currentValues, valueId];
      handleFilterChange(selectedFilter.id, nextValues);
    }
  };

  const handleApply = () => {
    onApply(tempFilters);
    onClose();
  };

  const handleReset = () => {
    setTempFilters({});
  };

  const handleClose = () => {
    setTempFilters(appliedFilters);
    onClose();
  };

  const hasApplied = (filter: FilterGroup) => {
    return (tempFilters[filter.id]?.length ?? 0) > 0;
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={handleClose}>
            <Ionicons name="close" size={24} color="#000" />
          </Pressable>
          <Text style={styles.title}>Filters</Text>
          <Pressable onPress={handleReset}>
            <Text style={styles.resetButton}>Reset</Text>
          </Pressable>
        </View>

        <View style={styles.body}>
          <View style={styles.sidebar}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {filters.map((filter) => (
                <Pressable
                  key={filter.id}
                  onPress={() => setSelectedFilterId(filter.id)}
                  style={[
                    styles.sidebarItem,
                    selectedFilterId === filter.id && styles.sidebarItemActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.sidebarLabel,
                      selectedFilterId === filter.id &&
                        styles.sidebarLabelActive,
                    ]}
                  >
                    {filter.name}
                  </Text>
                  {hasApplied(filter) && (
                    <Ionicons name="checkmark" size={16} color="#007AFF" />
                  )}
                </Pressable>
              ))}
            </ScrollView>
          </View>

          <View style={styles.detailPane}>
            <Text style={styles.detailTitle}>{selectedFilter?.name}</Text>
            <Text style={styles.detailSubtitle}>
              {selectedFilter?.type === "radio"
                ? "Choose one option"
                : "Select one or more options"}
            </Text>
            <ScrollView style={styles.detailValues}>
              {selectedFilter?.values.map((value) => (
                <FilterOption
                  key={value.id}
                  value={value}
                  isSelected={selectedValues.includes(value.id)}
                  type={selectedFilter.type}
                  onPress={() => handleValueToggle(value.id)}
                />
              ))}
            </ScrollView>
          </View>
        </View>

        <View style={styles.footer}>
          <Pressable style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  resetButton: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
  body: {
    flex: 1,
    flexDirection: "row",
  },
  sidebar: {
    width: "35%",
    borderRightWidth: 1,
    borderRightColor: "#f0f0f0",
    backgroundColor: "#fafafa",
  },
  sidebarItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sidebarItemActive: {
    backgroundColor: "#e8f2ff",
  },
  sidebarLabel: {
    fontSize: 16,
    color: "#333",
    flexShrink: 1,
  },
  sidebarLabelActive: {
    color: "#007AFF",
    fontWeight: "700",
  },
  detailPane: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  detailSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  detailValues: {
    flex: 1,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  applyButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default FiltersModal;
