import React, { useCallback } from "react";
import { Ionicons } from '@expo/vector-icons';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../../redux/slices/cartSlice";
import type { Product } from "../../types/product";
import { RootStackNav } from "../../navigation/navigationTypes";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = React.memo(({ product }) => {
  const navigation = useNavigation<RootStackNav>();
  const dispatch = useAppDispatch();
  const cartProduct = useAppSelector((s) =>
    s.cart.cartProducts.find((item) => item.productId === product.id),
  );

  const handleNavigate = useCallback(() => {
    navigation.navigate("ProductDetails", { productId: product.id });
  }, [navigation, product.id]);

  const handleAddToCart = useCallback(() => {
    dispatch(
      addToCart({
        ...product,
        productId: product.id,
        quantity: 1,
      }),
    );
  }, [dispatch, product]);

  const handleIncrease = useCallback(() => {
    dispatch(increaseQuantity(product.id));
  }, [dispatch, product.id]);

  const handleDecrease = useCallback(() => {
    if (cartProduct && cartProduct.quantity > 1) {
      dispatch(decreaseQuantity(product.id));
    } else {
      dispatch(removeFromCart(product.id));
    }
  }, [dispatch, product.id, cartProduct]);

  return (
    <View style={styles.card}>
      <Pressable style={styles.touch} onPress={handleNavigate}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.name}>{product.name}</Text>
        <View style={styles.info}>
          <Text style={styles.price}>${product.price}</Text>
          {cartProduct ? (
            <View style={styles.controls}>
              <Pressable style={styles.btn} onPress={handleDecrease}>
                {cartProduct.quantity > 1 ? (
                  <Text style={styles.btnText}>-</Text>
                ) : (
                  <Ionicons name="trash-outline" size={20} color="#FF3B30" />
                )}
              </Pressable>
              <Text style={styles.qty}>{cartProduct.quantity}</Text>
              <Pressable style={styles.btn} onPress={handleIncrease}>
                <Text style={styles.btnText}>+</Text>
              </Pressable>
            </View>
          ) : (
            <Pressable style={styles.button} onPress={handleAddToCart}>
              <Text style={styles.buttonText}>Add to Cart</Text>
            </Pressable>
          )}
        </View>
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff", // Required for Android shadow
    borderRadius: 10,
    padding: 12,
    margin: 6,
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    // Android shadow
    elevation: 5,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  btn: {
    backgroundColor: "#eee",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginHorizontal: 4,
  },
  btnText: {
    fontSize: 16,
    color: "#007AFF",
  },
  qty: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 8,
  },
  touch: {
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: "#007AFF",
    marginBottom: 4,
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 8,
    width: "30%",
    alignSelf: "flex-end",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default ProductCard;
