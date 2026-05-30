import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CartProduct } from '../../types/cart';

interface CartState {
	cartProducts: CartProduct[];
}

const initialState: CartState = {
	cartProducts: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart(state, action: PayloadAction<CartProduct>) {
			const existing = state.cartProducts.find(
				(item) => item.productId === action.payload.productId
			);
			if (existing) {
				existing.quantity += action.payload.quantity;
			} else {
				state.cartProducts.push(action.payload);
			}
		},
		removeFromCart(state, action: PayloadAction<string>) {
			state.cartProducts = state.cartProducts.filter(
				(item) => item.productId !== action.payload
			);
		},
		increaseQuantity(state, action: PayloadAction<string>) {
			const item = state.cartProducts.find(
				(item) => item.productId === action.payload
			);
			if (item) item.quantity += 1;
		},
		decreaseQuantity(state, action: PayloadAction<string>) {
			const item = state.cartProducts.find(
				(item) => item.productId === action.payload
			);
			if (item && item.quantity > 1) item.quantity -= 1;
		},
		clearCart(state) {
			state.cartProducts = [];
		},
	},
});

export const {
	addToCart,
	removeFromCart,
	increaseQuantity,
	decreaseQuantity,
	clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
