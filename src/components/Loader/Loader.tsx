import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Loader: React.FC = React.memo(() => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#007AFF" />
  </View>
));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
});

export default Loader;
