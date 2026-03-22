import { Div, Text } from "@vkontakte/vkui";

import type { Movie } from "@/entities/movie/model";
import { MovieCard } from "@/entities/movie/ui/MovieCard";
import { Loader } from "@/shared/ui/Loader";
import styles from "./MoviesFeed.module.css";

type MoviesFeedProps = {
	movies: Movie[];
	isLoading: boolean;
	error: string | null;
	favoriteIds: Set<number>;
	compareIds: Set<number>;
	onAddToFavorites: (movie: Movie) => void;
	onRemoveFromFavorites: (movieId: number) => void;
	onAddToCompare: (movie: Movie) => void;
	onRemoveFromCompare: (movieId: number) => void;
};

export const MoviesFeed = ({
	movies,
	isLoading,
	error,
	favoriteIds,
	compareIds,
	onAddToFavorites,
	onRemoveFromFavorites,
	onAddToCompare,
	onRemoveFromCompare,
}: MoviesFeedProps): React.JSX.Element => {
	if (error) {
		return (
			<Div>
				<Text>Ошибка загрузки: {error}</Text>
			</Div>
		);
	}

	if (movies.length === 0 && isLoading) {
		return (
			<Div>
				<Loader />
			</Div>
		);
	}

	if (movies.length === 0) {
		return (
			<Div>
				<Text>Ничего не найдено по выбранным фильтрам.</Text>
			</Div>
		);
	}

	return (
		<div className={styles.grid}>
			{movies.map((movie) => (
				<MovieCard
					key={movie.id}
					movie={movie}
					isFavorite={favoriteIds.has(movie.id)}
					isCompared={compareIds.has(movie.id)}
					onAddToFavorites={onAddToFavorites}
					onRemoveFromFavorites={onRemoveFromFavorites}
					onAddToCompare={onAddToCompare}
					onRemoveFromCompare={onRemoveFromCompare}
				/>
			))}
		</div>
	);
};
