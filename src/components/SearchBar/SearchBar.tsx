import React, { useState, useEffect, useRef } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SearchBarProps {
  onSearch: (text: string) => void;
}

const PLACEHOLDER = "Search products...";

const SearchBar: React.FC<SearchBarProps> = React.memo(({ onSearch }) => {
  const [value, setValue] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let index = 0;
    let isDeleting = false;

    intervalRef.current = setInterval(() => {
      setPlaceholder(() => {
        if (!isDeleting) {
          // Typing
          const nextText = PLACEHOLDER.slice(0, index + 1);
          index++;

          if (index === PLACEHOLDER.length) {
            setTimeout(() => {
              isDeleting = true;
            }, 1200); // Pause before deleting
          }

          return nextText;
        } else {
          // Deleting
          index--;

          if (index === 0) {
            isDeleting = false;
          }

          return PLACEHOLDER.slice(0, index);
        }
      });
    }, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
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
        placeholder={`${placeholder} `}
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
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
});

export default SearchBar;
