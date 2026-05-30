import React from 'react';
import { View, StyleSheet, Text, Image, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useProductDetails } from '../../hooks/useProductDetails';
import Loader from '../../components/Loader/Loader';
import { useAppDispatch } from '../../redux/hooks';
import { addToCart } from '../../redux/slices/cartSlice';

const ProductDetailsScreen = () => {
  const route = useRoute<any>();
  const { productId } = route.params;
  const { product, loading } = useProductDetails(productId);
  const dispatch = useAppDispatch();

  if (loading || !product) return <Loader />;

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.desc}>{product.description}</Text>
      <Button title="Add to Cart" onPress={() => dispatch(addToCart({
        productId: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: 1,
      }))} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    color: '#007AFF',
    marginBottom: 8,
  },
  desc: {
    fontSize: 16,
    color: '#444',
    marginBottom: 16,
  },
});

export default ProductDetailsScreen;
