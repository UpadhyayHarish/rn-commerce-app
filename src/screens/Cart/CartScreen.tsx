import React, { useMemo } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import CartItem from '../../components/CartItem/CartItem';
import EmptyState from '../../components/EmptyState/EmptyState';
import { clearCart } from '../../redux/slices/cartSlice';

const CartScreen = () => {
  const { cartProducts } = useAppSelector((s) => s.cart);
  const dispatch = useAppDispatch();

  const totalPrice = useMemo(
    () => cartProducts.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartProducts]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartProducts}
        renderItem={({ item }) => <CartItem item={item} />}
        keyExtractor={item => item.productId}
        ListEmptyComponent={<EmptyState message="Your cart is empty" />}
      />
      {cartProducts.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.total}>Total: ${totalPrice.toFixed(2)}</Text>
          <TouchableOpacity style={styles.orderBtn} onPress={() => dispatch(clearCart())}>
            <Text style={styles.orderText}>Process Order</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderBtn: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  orderText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CartScreen;
