import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SearchBarProps {
  onSearch: (text: string) => void;
}

const PLACEHOLDER = "Search products...";

const SearchBar: React.FC<SearchBarProps> = React.memo(({ onSearch }) => {
  const [value, setValue] = useState("");
  const [placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    let i = 0;
    setPlaceholder("");
    const interval = setInterval(() => {
      setPlaceholder(PLACEHOLDER.slice(0, i + 1));
      i++;
      if (i === PLACEHOLDER.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (text: string) => {
    setValue(text);
    onSearch(text);
  };

  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#888" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={handleChange}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
        placeholderTextColor="#888"
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 4,
  },
  input: {
    flex: 1,
    backgroundColor: "transparent",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
});

export default SearchBar;
