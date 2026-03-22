import { useUnit } from "effector-react";
import {
	Box,
	Button,
	Group,
	ModalPage,
	ModalPageHeader,
	ModalRoot,
} from "@vkontakte/vkui";
import { useMemo, useState } from "react";

import { $filters } from "@/entities/movie/model";
import { useFavorites } from "@/features/favorites/hooks/useFavorites";
import { FavoriteConfirmModal } from "@/features/favorites/ui/FavoriteConfirmModal";
import { useCompareMovies } from "@/features/movie-compare/hooks/useCompareMovies";
import { useInfiniteMoviesScroll } from "@/features/movie-load-more/hooks/useInfiniteMoviesScroll";
import { MovieFilters } from "@/features/movie-filters/ui/MovieFilters";
import { useMoviesFeed } from "@/features/movies/hooks/useMoviesFeed";
import { defaultFilters } from "@/shared/lib/query/filtersQuery";
import { useMediaQuery } from "@/shared/lib/hooks/useMediaQuery";
import { Loader } from "@/shared/ui/Loader";
import { SectionHeader } from "@/shared/ui/SectionHeader";
import { CompareTable } from "@/widgets/compare-table/ui/CompareTable";
import { MoviesFeed } from "@/widgets/movies-feed/ui/MoviesFeed";
import styles from "./MoviesPage.module.css";

export const MoviesPage = (): React.JSX.Element => {
	const isMobile = useMediaQuery("(max-width: 1023px)");
	const { movies, isLoading, error, hasMore, requestNextPage } =
		useMoviesFeed();
	const filters = useUnit($filters);
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

	const [filtersModalOpen, setFiltersModalOpen] = useState(false);

	const activeFiltersCount = useMemo(() => {
		let count = filters.genres.length;
		if (filters.ratingFrom !== defaultFilters.ratingFrom) count += 1;
		if (filters.ratingTo !== defaultFilters.ratingTo) count += 1;
		if (filters.yearFrom !== defaultFilters.yearFrom) count += 1;
		if (filters.yearTo !== defaultFilters.yearTo) count += 1;
		return count;
	}, [filters]);

	const loadMoreRef = useInfiniteMoviesScroll({
		enabled: hasMore && !isLoading && !error,
		onLoadMore: requestNextPage,
	});

	return (
		<>
			<div className={styles.page}>
				<div className={styles.layoutDesktop}>
					{!isMobile ? (
						<div className={styles.fixedFilters}>
							<MovieFilters />
						</div>
					) : null}

					<div className={styles.contentDesktop}>
						{isMobile ? (
							<div className={styles.mobileActions}>
								<Button
									size="m"
									mode="secondary"
									onClick={() => setFiltersModalOpen(true)}
								>
									Фильтры
									{activeFiltersCount > 0 ? ` (${activeFiltersCount})` : ""}
								</Button>
							</div>
						) : null}

						<div className={styles.topBar}>
							<SectionHeader
								title="Фильмы"
								subtitle="Подборка с рейтингом и датой выхода"
							/>
							<div className={styles.meta}>
								Показано: {movies.length}
								{activeFiltersCount > 0
									? ` | Активных фильтров: ${activeFiltersCount}`
									: ""}
							</div>
						</div>

						<Group>
							<Box>
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
								<div ref={loadMoreRef} className={styles.loadSentinel} />
								{isLoading ? <Loader /> : null}
							</Box>
						</Group>

						<Group>
							<CompareTable
								movies={compareQueue}
								onRemove={removeFromCompare}
								onClear={clearCompare}
							/>
						</Group>
					</div>
				</div>
			</div>

			{isMobile ? (
				<ModalRoot
					activeModal={filtersModalOpen ? "mobile-filters" : null}
					onClose={() => setFiltersModalOpen(false)}
				>
					<ModalPage
						id="mobile-filters"
						onClose={() => setFiltersModalOpen(false)}
						header={<ModalPageHeader>Фильтры</ModalPageHeader>}
					>
						<MovieFilters />
					</ModalPage>
				</ModalRoot>
			) : null}

			<FavoriteConfirmModal
				pendingMovie={pendingMovie}
				onCancel={cancelFavoriteAdd}
				onConfirm={confirmFavoriteAdd}
			/>
		</>
	);
};
