import { useEffect, useState } from "react";

export const useFetch = (fn, query) => {
	const [refreshing, setRefreshing] = useState(false);
	const [data, setData] = useState([]);

	const handleRefresh = () => {
		setRefreshing(true);
	};

	useEffect(() => {
		const fetchData = async () => {
			const res = await fn();
			await setData(res);
			setRefreshing(false);
		};
		fetchData();
	}, [refreshing, query]);
	return {
		refreshing,
		data,
		handleRefresh,
	};
};
