import { mockProducts } from '../mock/products';
import type { Product, ProductListResponse } from '../types/product';

export const getProducts = async (
	page = 1,
	limit = 10,
	searchText = ''
): Promise<ProductListResponse> => {
	await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay
	let filtered = mockProducts;
	if (searchText) {
		filtered = filtered.filter((p) =>
			p.name.toLowerCase().includes(searchText.toLowerCase())
		);
	}
	const start = (page - 1) * limit;
	const end = start + limit;
	const products = filtered.slice(start, end);
	return {
		products,
		totalCount: filtered.length,
		hasMore: end < filtered.length,
	};
};

export const getProductDetails = async (productId: string): Promise<Product | undefined> => {
	await new Promise((resolve) => setTimeout(resolve, 500));
	return mockProducts.find((p) => p.id === productId);
};
