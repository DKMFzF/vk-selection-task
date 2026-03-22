import { Card, Div, Text, Title } from "@vkontakte/vkui";

import type { Movie } from "@/entities/movie/model";

type MovieDetailsCardProps = {
	movie: Movie;
};

export const MovieDetailsCard = ({
	movie,
}: MovieDetailsCardProps): React.JSX.Element => {
	return (
		<Card mode="shadow">
			<Div>
				{movie.posterUrl ? (
					<img
						src={movie.posterUrl}
						alt={movie.title}
						style={{
							width: "100%",
							maxWidth: 360,
							borderRadius: 8,
							marginBottom: 16,
						}}
					/>
				) : null}
				<Title level="1" style={{ marginTop: 0 }}>
					{movie.title}
				</Title>
				<Text style={{ marginBottom: 8 }}>{movie.description}</Text>
				<Text>Рейтинг: {movie.rating ?? "—"}</Text>
				<Text>Дата выхода: {movie.releaseDate ?? "—"}</Text>
				<Text>Год: {movie.year ?? "—"}</Text>
				<Text>
					Жанры: {movie.genres.length > 0 ? movie.genres.join(", ") : "—"}
				</Text>
				<Text>
					Длительность:{" "}
					{movie.durationMinutes ? `${movie.durationMinutes} мин` : "—"}
				</Text>
			</Div>
		</Card>
	);
};
