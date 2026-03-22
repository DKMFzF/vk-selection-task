import { useUnit } from "effector-react";
import { useEffect } from "react";

import {
	$detailsError,
	$isLoadingDetails,
	$selectedMovie,
	detailsCleared,
	movieDetailsRequested,
} from "@/entities/movie/model";

export const useMovieDetails = (movieId: number | null) => {
	const [movie, isLoading, error] = useUnit([
		$selectedMovie,
		$isLoadingDetails,
		$detailsError,
	]);
	const requestDetails = useUnit(movieDetailsRequested);
	const clear = useUnit(detailsCleared);

	useEffect(() => {
		if (!movieId) return;
		requestDetails(movieId);
		return () => clear();
	}, [clear, movieId, requestDetails]);

	return { movie, isLoading, error };
};
