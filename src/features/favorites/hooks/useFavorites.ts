import { useUnit } from "effector-react";
import { useMemo, useState } from "react";

import {
	$favorites,
	favoriteAddConfirmed,
	favoriteRemoved,
} from "@/entities/movie/model";
import type { Movie } from "@/entities/movie/model";

export const useFavorites = () => {
	const favorites = useUnit($favorites);
	const addConfirmed = useUnit(favoriteAddConfirmed);
	const removeFavorite = useUnit(favoriteRemoved);
	const [pendingMovie, setPendingMovie] = useState<Movie | null>(null);

	const favoriteIds = useMemo(
		() => new Set(favorites.map((movie) => movie.id)),
		[favorites],
	);

	return {
		favorites,
		favoriteIds,
		pendingMovie,
		requestAddFavorite: setPendingMovie,
		cancelFavoriteAdd: () => setPendingMovie(null),
		confirmFavoriteAdd: () => {
			if (!pendingMovie) return;
			addConfirmed(pendingMovie);
			setPendingMovie(null);
		},
		removeFavorite,
	};
};
