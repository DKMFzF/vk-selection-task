import { CardGrid, Div, Group, Text, Title } from "@vkontakte/vkui";
import { useMemo } from "react";

import { MovieCard } from "@/entities/movie/ui/MovieCard";
import { useFavorites } from "@/features/favorites/hooks/useFavorites";
import { FavoriteConfirmModal } from "@/features/favorites/ui/FavoriteConfirmModal";
import { useCompareMovies } from "@/features/movie-compare/hooks/useCompareMovies";

export const FavoritesPage = (): React.JSX.Element => {
	const {
		favorites,
		favoriteIds,
		pendingMovie,
		requestAddFavorite,
		removeFavorite,
		cancelFavoriteAdd,
		confirmFavoriteAdd,
	} = useFavorites();
	const { compareQueue, addToCompare, removeFromCompare } = useCompareMovies();
	const compareIds = useMemo(
		() => new Set(compareQueue.map((movie) => movie.id)),
		[compareQueue],
	);

	return (
		<>
			<Group>
				<Div>
					<Title level="1" style={{ marginTop: 0 }}>
						Избранные фильмы
					</Title>
					{favorites.length === 0 ? (
						<Text>Список избранного пуст.</Text>
					) : (
						<CardGrid size="l">
							{favorites.map((movie) => (
								<MovieCard
									key={movie.id}
									movie={movie}
									isFavorite={favoriteIds.has(movie.id)}
									isCompared={compareIds.has(movie.id)}
									onAddToFavorites={requestAddFavorite}
									onRemoveFromFavorites={removeFavorite}
									onAddToCompare={addToCompare}
									onRemoveFromCompare={removeFromCompare}
								/>
							))}
						</CardGrid>
					)}
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
