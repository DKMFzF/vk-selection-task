import { Button, Card, Div, Text, Title } from "@vkontakte/vkui";
import { Link } from "react-router-dom";

import type { Movie } from "@/entities/movie/model";

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
		<Card mode="shadow">
			<Div>
				{movie.posterUrl ? (
					<img
						src={movie.posterUrl}
						alt={movie.title}
						style={{
							width: "100%",
							borderRadius: 8,
							objectFit: "cover",
							maxHeight: 320,
						}}
					/>
				) : (
					<div
						style={{ height: 320, borderRadius: 8, background: "#f2f3f5" }}
					/>
				)}
				<Title level="3" style={{ marginTop: 12, marginBottom: 6 }}>
					{movie.title}
				</Title>
				<Text style={{ marginBottom: 4 }}>Год: {movie.year ?? "—"}</Text>
				<Text style={{ marginBottom: 12 }}>Рейтинг: {movie.rating ?? "—"}</Text>
				<div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
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
						{isFavorite ? "Убрать из избранного" : "В избранное"}
					</Button>
					<Button
						size="s"
						mode={isCompared ? "outline" : "secondary"}
						onClick={() =>
							isCompared ? onRemoveFromCompare(movie.id) : onAddToCompare(movie)
						}
					>
						{isCompared ? "Убрать из сравнения" : "Сравнить"}
					</Button>
				</div>
			</Div>
		</Card>
	);
};
