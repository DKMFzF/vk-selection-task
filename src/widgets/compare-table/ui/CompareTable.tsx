import { Button, Card, Div, Text, Title } from "@vkontakte/vkui";

import type { Movie } from "@/entities/movie/model";

type CompareTableProps = {
	movies: Movie[];
	onRemove: (movieId: number) => void;
	onClear: () => void;
};

const renderValue = (value: string | number | null): string => {
	if (value === null || value === "") return "—";
	return String(value);
};

export const CompareTable = ({
	movies,
	onRemove,
	onClear,
}: CompareTableProps): React.JSX.Element => {
	if (movies.length === 0) {
		return (
			<Div>
				<Text>Выберите до двух фильмов для сравнения.</Text>
			</Div>
		);
	}

	return (
		<Card mode="shadow">
			<Div>
				<Title level="2" style={{ marginTop: 0 }}>
					Сравнение фильмов
				</Title>
				<Button
					mode="secondary"
					size="s"
					onClick={onClear}
					style={{ marginBottom: 12 }}
				>
					Очистить
				</Button>
				<div style={{ display: "grid", gap: 8 }}>
					{movies.map((movie) => (
						<Card key={movie.id} mode="outline">
							<Div>
								<Title level="3">{movie.title}</Title>
								<Text>Год: {renderValue(movie.year)}</Text>
								<Text>Рейтинг: {renderValue(movie.rating)}</Text>
								<Text>
									Жанры:{" "}
									{movie.genres.length > 0 ? movie.genres.join(", ") : "—"}
								</Text>
								<Text>Длительность: {renderValue(movie.durationMinutes)}</Text>
								<Button
									mode="outline"
									size="s"
									onClick={() => onRemove(movie.id)}
								>
									Убрать
								</Button>
							</Div>
						</Card>
					))}
				</div>
			</Div>
		</Card>
	);
};
