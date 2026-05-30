import { useEffect, useState } from 'react';
import { getProductDetails } from '../services/productService';
import type { Product } from '../types/product';

export const useProductDetails = (productId: string) => {
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		let mounted = true;
		setLoading(true);
		getProductDetails(productId).then((data) => {
			if (mounted) setProduct(data || null);
			setLoading(false);
		});
		return () => {
			mounted = false;
		};
	}, [productId]);

	return { product, loading };
};
