import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface EmptyStateProps {
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = React.memo(({ message }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{message}</Text>
  </View>
));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  text: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});

export default EmptyState;
