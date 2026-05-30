export interface Product {
	id: string;
	name: string;
	description: string;
	image: string;
	price: number;
	rating?: number;
}

export interface ProductListResponse {
	products: Product[];
	totalCount: number;
	hasMore: boolean;
}
