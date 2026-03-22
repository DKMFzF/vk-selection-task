import { Div, Group, SplitCol, SplitLayout } from "@vkontakte/vkui";
import { useMemo } from "react";

import { useFavorites } from "@/features/favorites/hooks/useFavorites";
import { FavoriteConfirmModal } from "@/features/favorites/ui/FavoriteConfirmModal";
import { useCompareMovies } from "@/features/movie-compare/hooks/useCompareMovies";
import { useInfiniteMoviesScroll } from "@/features/movie-load-more/hooks/useInfiniteMoviesScroll";
import { MovieFilters } from "@/features/movie-filters/ui/MovieFilters";
import { useMoviesFeed } from "@/features/movies/hooks/useMoviesFeed";
import { Loader } from "@/shared/ui/Loader";
import { CompareTable } from "@/widgets/compare-table/ui/CompareTable";
import { MoviesFeed } from "@/widgets/movies-feed/ui/MoviesFeed";

export const MoviesPage = (): React.JSX.Element => {
	const { movies, isLoading, error, hasMore, requestNextPage } =
		useMoviesFeed();
	const {
		favoriteIds,
		pendingMovie,
		requestAddFavorite,
		removeFavorite,
		cancelFavoriteAdd,
		confirmFavoriteAdd,
	} = useFavorites();
	const { compareQueue, addToCompare, removeFromCompare, clearCompare } =
		useCompareMovies();

	const compareIds = useMemo(
		() => new Set(compareQueue.map((movie) => movie.id)),
		[compareQueue],
	);
	const loadMoreRef = useInfiniteMoviesScroll({
		enabled: hasMore && !isLoading && !error,
		onLoadMore: requestNextPage,
	});

	return (
		<>
			<SplitLayout>
				<SplitCol width={280} minWidth={280} maxWidth={280}>
					<Group>
						<MovieFilters />
					</Group>
				</SplitCol>
				<SplitCol autoSpaced>
					<Group>
						<Div>
							<MoviesFeed
								movies={movies}
								isLoading={isLoading}
								error={error}
								favoriteIds={favoriteIds}
								compareIds={compareIds}
								onAddToFavorites={requestAddFavorite}
								onRemoveFromFavorites={removeFavorite}
								onAddToCompare={addToCompare}
								onRemoveFromCompare={removeFromCompare}
							/>
							<div ref={loadMoreRef} style={{ height: 20 }} />
							{isLoading ? <Loader /> : null}
						</Div>
					</Group>
					<Group>
						<CompareTable
							movies={compareQueue}
							onRemove={removeFromCompare}
							onClear={clearCompare}
						/>
					</Group>
				</SplitCol>
			</SplitLayout>
			<FavoriteConfirmModal
				pendingMovie={pendingMovie}
				onCancel={cancelFavoriteAdd}
				onConfirm={confirmFavoriteAdd}
			/>
		</>
	);
};
