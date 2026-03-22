import { Button, Div, Group, Text } from "@vkontakte/vkui";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { useFavorites } from "@/features/favorites/hooks/useFavorites";
import { FavoriteConfirmModal } from "@/features/favorites/ui/FavoriteConfirmModal";
import { useCompareMovies } from "@/features/movie-compare/hooks/useCompareMovies";
import { useMovieDetails } from "@/features/movie-details/hooks/useMovieDetails";
import { Loader } from "@/shared/ui/Loader";
import { MovieDetailsCard } from "@/widgets/movie-details/ui/MovieDetailsCard";

export const MovieDetailsPage = (): React.JSX.Element => {
	const { id } = useParams();
	const movieId = useMemo(() => Number(id), [id]);
	const { movie, isLoading, error } = useMovieDetails(
		Number.isFinite(movieId) ? movieId : null,
	);
	const {
		favoriteIds,
		pendingMovie,
		requestAddFavorite,
		removeFavorite,
		cancelFavoriteAdd,
		confirmFavoriteAdd,
	} = useFavorites();
	const { compareQueue, addToCompare, removeFromCompare } = useCompareMovies();

	const compareIds = useMemo(
		() => new Set(compareQueue.map((item) => item.id)),
		[compareQueue],
	);

	return (
		<>
			<Group>
				<Div>
					{isLoading ? <Loader /> : null}
					{error ? <Text>Ошибка загрузки: {error}</Text> : null}
					{movie ? (
						<>
							<MovieDetailsCard movie={movie} />
							<div style={{ display: "flex", gap: 8, marginTop: 16 }}>
								<Button
									onClick={() =>
										favoriteIds.has(movie.id)
											? removeFavorite(movie.id)
											: requestAddFavorite(movie)
									}
								>
									{favoriteIds.has(movie.id)
										? "Убрать из избранного"
										: "В избранное"}
								</Button>
								<Button
									mode="secondary"
									onClick={() =>
										compareIds.has(movie.id)
											? removeFromCompare(movie.id)
											: addToCompare(movie)
									}
								>
									{compareIds.has(movie.id)
										? "Убрать из сравнения"
										: "Сравнить"}
								</Button>
							</div>
						</>
					) : null}
				</Div>
			</Group>
			<FavoriteConfirmModal
				pendingMovie={pendingMovie}
				onCancel={cancelFavoriteAdd}
				onConfirm={confirmFavoriteAdd}
			/>
		</>
	);
};
