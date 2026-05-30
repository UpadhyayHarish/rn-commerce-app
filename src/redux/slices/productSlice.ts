import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types/product';

interface ProductState {
	products: Product[];
	loading: boolean;
	hasMore: boolean;
	page: number;
	searchText: string;
	selectedProduct: Product | null;
}

const initialState: ProductState = {
	products: [],
	loading: false,
	hasMore: true,
	page: 1,
	searchText: '',
	selectedProduct: null,
};

const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		setProducts(state, action: PayloadAction<Product[]>) {
			state.products = action.payload;
		},
		appendProducts(state, action: PayloadAction<Product[]>) {
			state.products = [...state.products, ...action.payload];
		},
		setLoading(state, action: PayloadAction<boolean>) {
			state.loading = action.payload;
		},
		setPage(state, action: PayloadAction<number>) {
			state.page = action.payload;
		},
		setSearchText(state, action: PayloadAction<string>) {
			state.searchText = action.payload;
		},
		setSelectedProduct(state, action: PayloadAction<Product | null>) {
			state.selectedProduct = action.payload;
		},
		setHasMore(state, action: PayloadAction<boolean>) {
			state.hasMore = action.payload;
		},
		resetProducts(state) {
			state.products = [];
			state.page = 1;
			state.hasMore = true;
			state.searchText = '';
		},
	},
});

export const {
	setProducts,
	appendProducts,
	setLoading,
	setPage,
	setSearchText,
	setSelectedProduct,
	setHasMore,
	resetProducts,
} = productSlice.actions;

export default productSlice.reducer;
