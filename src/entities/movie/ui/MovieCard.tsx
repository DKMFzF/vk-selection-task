import { Button, Card, Div, Text, Title } from "@vkontakte/vkui";
import { Link } from "react-router-dom";

import type { Movie } from "@/entities/movie/model";
import { RatingBadge } from "./RatingBadge";
import styles from "./MovieCard.module.css";

type MovieCardProps = {
	movie: Movie;
	isFavorite: boolean;
	isCompared: boolean;
	onAddToFavorites: (movie: Movie) => void;
	onRemoveFromFavorites: (movieId: number) => void;
	onAddToCompare: (movie: Movie) => void;
	onRemoveFromCompare: (movieId: number) => void;
};

export const MovieCard = ({
	movie,
	isFavorite,
	isCompared,
	onAddToFavorites,
	onRemoveFromFavorites,
	onAddToCompare,
	onRemoveFromCompare,
}: MovieCardProps): React.JSX.Element => {
	return (
		<Card mode="shadow" className={styles.card}>
			<div className={styles.posterWrap}>
				<div className={styles.rating}>
					<RatingBadge value={movie.rating} />
				</div>
				{movie.posterUrl ? (
					<img
						src={movie.posterUrl}
						alt={movie.title}
						className={styles.poster}
					/>
				) : (
					<div className={styles.posterFallback}>Нет постера</div>
				)}
			</div>
			<Div className={styles.content}>
				<Title level="3" className={styles.title}>
					{movie.title}
				</Title>
				<Text className={styles.meta}>{movie.year ?? "—"}</Text>
				<div className={styles.actions}>
					<Button
						size="s"
						mode="secondary"
						to={`/movies/${movie.id}`}
						Component={Link}
					>
						Детали
					</Button>
					<Button
						size="s"
						mode={isFavorite ? "outline" : "primary"}
						onClick={() =>
							isFavorite
								? onRemoveFromFavorites(movie.id)
								: onAddToFavorites(movie)
						}
					>
						{isFavorite ? "Из избранного" : "В избранное"}
					</Button>
					<Button
						size="s"
						mode={isCompared ? "outline" : "secondary"}
						onClick={() =>
							isCompared ? onRemoveFromCompare(movie.id) : onAddToCompare(movie)
						}
					>
						{isCompared ? "Убрать сравнение" : "Сравнить"}
					</Button>
				</div>
			</Div>
		</Card>
	);
};
