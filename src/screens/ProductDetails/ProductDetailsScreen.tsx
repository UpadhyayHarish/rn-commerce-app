import React, { useCallback } from "react";
import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useProductDetails } from "../../hooks/useProductDetails";
import Loader from "../../components/Loader/Loader";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../redux/slices/cartSlice";
import type { RootStackParamList } from "../../navigation/navigationTypes";
import { Ionicons } from "@expo/vector-icons";

const ProductDetailsScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, "ProductDetails">>();
  const { productId } = route.params;
  const { product, loading } = useProductDetails(productId);
  const dispatch = useAppDispatch();

  const cartProduct = useAppSelector((s) =>
    s?.cart?.cartProducts?.find((item) => item?.productId === product?.id),
  );

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    dispatch(
      addToCart({
        productId: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: 1,
      }),
    );
  }, [dispatch, product]);

  const handleIncrease = useCallback(() => {
    if (!product) return;
    dispatch(increaseQuantity(product.id));
  }, [dispatch, product]);

  const handleDecrease = useCallback(() => {
    if (!product) return;
    if (cartProduct?.quantity && cartProduct.quantity > 1) {
      dispatch(decreaseQuantity(product.id));
    } else {
      dispatch(removeFromCart(product.id));
    }
  }, [dispatch, cartProduct, product]);

  if (loading || !product) {
    return <Loader />;
  }

  const { id, name, image, description, price } = product;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.price}>${price}</Text>
      <Text style={styles.desc}>{description}</Text>
      <View style={styles.footer}>
        <Text style={styles.price}>${price}</Text>
        {cartProduct ? (
          <View style={styles.controls}>
            <Pressable style={styles.controlButton} onPress={handleDecrease}>
              {cartProduct.quantity > 1 ? (
                <Text style={styles.controlText}>-</Text>
              ) : (
                <Ionicons name="trash-outline" size={20} color="#FF3B30" />
              )}
            </Pressable>
            <Text style={styles.quantity}>{cartProduct.quantity}</Text>
            <Pressable style={styles.controlButton} onPress={handleIncrease}>
              <Text style={styles.controlText}>+</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable style={styles.button} onPress={handleAddToCart}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    color: "#007AFF",
    marginBottom: 8,
  },
  desc: {
    fontSize: 16,
    color: "#444",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "50%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
  },
  controlButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginHorizontal: 8,
  },
  controlText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
  },
  quantity: {
    fontSize: 18,
    fontWeight: "bold",
    minWidth: 32,
    textAlign: "center",
  },
});

export default ProductDetailsScreen;
