import {
	Button,
	Checkbox,
	Div,
	FormItem,
	Input,
	Text,
	Title,
} from "@vkontakte/vkui";
import { useUnit } from "effector-react";

import { $genres, $isLoadingGenres } from "@/entities/movie/model";
import { Loader } from "@/shared/ui/Loader";
import { useMovieFilters } from "../hooks/useMovieFilters";

const MAX_GENRES_VISIBLE = 10;

export const MovieFilters = (): React.JSX.Element => {
	const { filters, updateFilters } = useMovieFilters();
	const [genres, isLoadingGenres] = useUnit([$genres, $isLoadingGenres]);

	const onToggleGenre = (genre: string) => {
		const hasGenre = filters.genres.includes(genre);
		updateFilters({
			genres: hasGenre
				? filters.genres.filter((item) => item !== genre)
				: [...filters.genres, genre],
		});
	};

	return (
		<Div>
			<Title level="2" style={{ marginTop: 0 }}>
				Фильтры
			</Title>
			<FormItem top="Рейтинг от">
				<Input
					type="number"
					value={String(filters.ratingFrom)}
					onChange={(event) =>
						updateFilters({ ratingFrom: Number(event.target.value) || 0 })
					}
				/>
			</FormItem>
			<FormItem top="Рейтинг до">
				<Input
					type="number"
					value={String(filters.ratingTo)}
					onChange={(event) =>
						updateFilters({ ratingTo: Number(event.target.value) || 10 })
					}
				/>
			</FormItem>
			<FormItem top="Год от">
				<Input
					type="number"
					value={String(filters.yearFrom)}
					onChange={(event) =>
						updateFilters({ yearFrom: Number(event.target.value) || 1990 })
					}
				/>
			</FormItem>
			<FormItem top="Год до">
				<Input
					type="number"
					value={String(filters.yearTo)}
					onChange={(event) =>
						updateFilters({
							yearTo: Number(event.target.value) || filters.yearTo,
						})
					}
				/>
			</FormItem>
			<FormItem top="Жанры">
				{isLoadingGenres ? (
					<Loader />
				) : (
					<div style={{ display: "grid", gap: 8 }}>
						{genres.slice(0, MAX_GENRES_VISIBLE).map((genre) => (
							<Checkbox
								key={genre}
								checked={filters.genres.includes(genre)}
								onChange={() => onToggleGenre(genre)}
							>
								{genre}
							</Checkbox>
						))}
					</div>
				)}
			</FormItem>
			<Button mode="outline" onClick={() => updateFilters({ genres: [] })}>
				Сбросить жанры
			</Button>
			<Text style={{ marginTop: 10, display: "block" }}>
				Фильтры синхронизированы с URL.
			</Text>
		</Div>
	);
};
