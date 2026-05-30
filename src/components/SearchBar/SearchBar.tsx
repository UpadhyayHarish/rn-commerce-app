import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface SearchBarProps {
  onSearch: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = React.memo(({ onSearch }) => {
  const [value, setValue] = useState('');

  const handleChange = (text: string) => {
    setValue(text);
    onSearch(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search products..."
        value={value}
        onChangeText={handleChange}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
});

export default SearchBar;
