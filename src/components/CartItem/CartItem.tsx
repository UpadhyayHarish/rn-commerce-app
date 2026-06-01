import React, { useCallback } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useAppDispatch } from "../../redux/hooks";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../../redux/slices/cartSlice";
import type { CartProduct } from "../../types/cart";
import { Ionicons } from "@expo/vector-icons";
import { RootStackNav } from "../../navigation/navigationTypes";
import { useNavigation } from "@react-navigation/native";

interface CartItemProps {
  item: CartProduct;
}

const CartItem: React.FC<CartItemProps> = React.memo(({ item }) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<RootStackNav>();

  const handleNavigate = useCallback(() => {
    navigation.navigate("ProductDetails", { productId: item.productId });
  }, [navigation, item.productId]);

  const handleIncrease = useCallback(() => {
    dispatch(increaseQuantity(item.productId));
  }, [dispatch, item.productId]);

  const handleDecrease = useCallback(() => {
    if (item.quantity > 1) {
      dispatch(decreaseQuantity(item.productId));
    } else {
      dispatch(removeFromCart(item.productId));
    }
  }, [dispatch, item.productId, item.quantity]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleNavigate}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <View style={styles.controls}>
          <TouchableOpacity style={styles.btn} onPress={handleDecrease}>
            {item.quantity > 1 ? (
              <Text style={styles.btnText}>-</Text>
            ) : (
              <Ionicons name="trash-outline" size={16} color="#FF3B30" />
            )}
          </TouchableOpacity>
          <Text style={styles.qty}>{item.quantity}</Text>
          <TouchableOpacity style={styles.btn} onPress={handleIncrease}>
            <Text style={styles.btnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#fafafa",
    borderRadius: 8,
    padding: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: "#007AFF",
    marginBottom: 8,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
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
});

export default CartItem;
