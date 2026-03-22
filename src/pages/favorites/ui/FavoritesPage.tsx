import { Div, Group, Text } from "@vkontakte/vkui";
import { useMemo } from "react";

import { useFavorites } from "@/features/favorites/hooks/useFavorites";
import { FavoriteConfirmModal } from "@/features/favorites/ui/FavoriteConfirmModal";
import { useCompareMovies } from "@/features/movie-compare/hooks/useCompareMovies";
import { SectionHeader } from "@/shared/ui/SectionHeader";
import { MoviesFeed } from "@/widgets/movies-feed/ui/MoviesFeed";

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
					<SectionHeader title="Избранные фильмы" />
					{favorites.length === 0 ? (
						<Text>Список избранного пуст.</Text>
					) : (
						<MoviesFeed
							movies={favorites}
							isLoading={false}
							error={null}
							favoriteIds={favoriteIds}
							compareIds={compareIds}
							onAddToFavorites={requestAddFavorite}
							onRemoveFromFavorites={removeFavorite}
							onAddToCompare={addToCompare}
							onRemoveFromCompare={removeFromCompare}
						/>
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
