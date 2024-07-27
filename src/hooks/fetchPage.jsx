import {useCallback, useEffect, useState} from "react";

export const useFetchPage = () => {

	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(0);

	const fetchPage = useCallback(() => {
		const randomInt = Math.floor(Math.random() * 256) + 1;
		setPage(randomInt);

		setTimeout(() => {
			setLoading(true);
		}, 2000);
	}, []);

	useEffect(() => {
		fetchPage();
	}, [fetchPage]);

	return {loading, page, refetch: fetchPage};
};
