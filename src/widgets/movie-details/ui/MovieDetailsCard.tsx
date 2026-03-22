import { Button, Card, Div, Text } from "@vkontakte/vkui";

import type { Movie } from "@/entities/movie/model";
import { MovieMetaRow } from "@/entities/movie/ui/MovieMetaRow";
import { RatingBadge } from "@/entities/movie/ui/RatingBadge";
import { SectionHeader } from "@/shared/ui/SectionHeader";
import styles from "./MovieDetailsCard.module.css";

type MovieDetailsCardProps = {
	movie: Movie;
	isFavorite: boolean;
	isCompared: boolean;
	onToggleFavorite: () => void;
	onToggleCompare: () => void;
};

export const MovieDetailsCard = ({
	movie,
	isFavorite,
	isCompared,
	onToggleFavorite,
	onToggleCompare,
}: MovieDetailsCardProps): React.JSX.Element => {
	const genresText = movie.genres.length > 0 ? movie.genres.join(", ") : "—";

	return (
		<Card mode="shadow">
			<Div>
				<div className={styles.layout}>
					<div>
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

					<div>
						<SectionHeader title={movie.title} />
						<Text className={styles.description}>{movie.description}</Text>
						<div className={styles.metaBlock}>
							<MovieMetaRow
								label="Рейтинг"
								value={movie.rating?.toFixed(1) ?? "—"}
							/>
							<MovieMetaRow
								label="Дата выхода"
								value={movie.releaseDate ?? "—"}
							/>
							<MovieMetaRow label="Жанры" value={genresText} />
						</div>
					</div>

					<div className={styles.sidebar}>
						<div className={styles.ratingValue}>
							<RatingBadge value={movie.rating} />
						</div>
						<div className={styles.actions}>
							<Button
								mode={isFavorite ? "outline" : "primary"}
								onClick={onToggleFavorite}
							>
								{isFavorite ? "Убрать из избранного" : "В избранное"}
							</Button>
							<Button
								mode={isCompared ? "outline" : "secondary"}
								onClick={onToggleCompare}
							>
								{isCompared ? "Убрать из сравнения" : "Сравнить"}
							</Button>
						</div>
					</div>
				</div>
			</Div>
		</Card>
	);
};
