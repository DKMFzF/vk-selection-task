import { useUnit } from "effector-react";
import { useEffect } from "react";

import {
	$compareQueue,
	$favorites,
	$hasMore,
	$isLoadingMovies,
	$movies,
	$moviesError,
	appStarted,
	loadNextPageRequested,
} from "@/entities/movie/model/store";

export const useMoviesFeed = () => {
	const [movies, isLoading, error, hasMore, favorites, compareQueue] = useUnit([
		$movies,
		$isLoadingMovies,
		$moviesError,
		$hasMore,
		$favorites,
		$compareQueue,
	]);
	const requestNextPage = useUnit(loadNextPageRequested);
	const startApp = useUnit(appStarted);

	useEffect(() => {
		startApp();
	}, [startApp]);

	return {
		movies,
		isLoading,
		error,
		hasMore,
		favorites,
		compareQueue,
		requestNextPage,
	};
};
