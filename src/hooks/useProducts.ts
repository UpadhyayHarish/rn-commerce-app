import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
	setProducts,
	appendProducts,
	setLoading,
	setPage,
	setSearchText,
	setHasMore,
	resetProducts,
} from '../redux/slices/productSlice';
import { getProducts } from '../services/productService';
import { PAGE_LIMIT } from '../utils/constants';

export const useProducts = () => {
	const dispatch = useAppDispatch();
	const { products, loading, hasMore, page, searchText } = useAppSelector((s) => s.product);

	const fetchProducts = useCallback(async (reset = false) => {
		dispatch(setLoading(true));
		const res = await getProducts(page, PAGE_LIMIT, searchText);
		if (reset) {
			dispatch(setProducts(res.products));
		} else {
			dispatch(appendProducts(res.products));
		}
		dispatch(setHasMore(res.hasMore));
		dispatch(setLoading(false));
	}, [dispatch, page, searchText]);

	useEffect(() => {
		fetchProducts(page === 1);
		// eslint-disable-next-line
	}, [page, searchText]);

	const onSearch = useCallback((text: string) => {
		dispatch(setSearchText(text));
		dispatch(setPage(1));
		dispatch(resetProducts());
	}, [dispatch]);

	const loadMore = useCallback(() => {
		if (!loading && hasMore) {
			dispatch(setPage(page + 1));
		}
	}, [dispatch, loading, hasMore, page]);

	const refresh = useCallback(() => {
		dispatch(setPage(1));
		dispatch(resetProducts());
	}, [dispatch]);

	return {
		products,
		loading,
		hasMore,
		page,
		searchText,
		onSearch,
		loadMore,
		refresh,
	};
};
