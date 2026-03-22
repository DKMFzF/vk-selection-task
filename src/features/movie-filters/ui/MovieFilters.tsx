import { Button, Div, Title } from "@vkontakte/vkui";
import { useUnit } from "effector-react";
import { useEffect, useState } from "react";

import { $genres, $isLoadingGenres } from "@/entities/movie/model";
import { Loader } from "@/shared/ui/Loader";
import { FilterCheckbox, FilterNumberInput } from "@/shared/ui/filters";
import { useMovieFilters } from "../hooks/useMovieFilters";
import styles from "./MovieFilters.module.css";

const MAX_GENRES_VISIBLE = 10;

export const MovieFilters = (): React.JSX.Element => {
	const { filters, updateFilters } = useMovieFilters();
	const [genres, isLoadingGenres] = useUnit([$genres, $isLoadingGenres]);
	const [ratingFromInput, setRatingFromInput] = useState(
		String(filters.ratingFrom),
	);
	const [ratingToInput, setRatingToInput] = useState(String(filters.ratingTo));
	const [yearFromInput, setYearFromInput] = useState(String(filters.yearFrom));
	const [yearToInput, setYearToInput] = useState(String(filters.yearTo));

	useEffect(() => {
		setRatingFromInput(String(filters.ratingFrom));
		setRatingToInput(String(filters.ratingTo));
		setYearFromInput(String(filters.yearFrom));
		setYearToInput(String(filters.yearTo));
	}, [filters.ratingFrom, filters.ratingTo, filters.yearFrom, filters.yearTo]);

	const onToggleGenre = (genre: string) => {
		const hasGenre = filters.genres.includes(genre);
		updateFilters({
			genres: hasGenre
				? filters.genres.filter((item) => item !== genre)
				: [...filters.genres, genre],
		});
	};

	const commitNumberFilter = (
		key: "ratingFrom" | "ratingTo" | "yearFrom" | "yearTo",
		rawValue: string,
		fallback: number,
	) => {
		const parsed = Number(rawValue);
		const nextValue = Number.isFinite(parsed) ? parsed : fallback;
		if (filters[key] === nextValue) return;
		updateFilters({
			[key]: nextValue,
		});
	};

	return (
		<Div className={styles.container}>
			<Title level="2" className={styles.title}>
				Фильтры
			</Title>
			<div className={styles.controls}>
				<FilterNumberInput
					label="Рейтинг от"
					value={ratingFromInput}
					onChange={setRatingFromInput}
					onCommit={() =>
						commitNumberFilter(
							"ratingFrom",
							ratingFromInput,
							filters.ratingFrom,
						)
					}
				/>
				<FilterNumberInput
					label="Рейтинг до"
					value={ratingToInput}
					onChange={setRatingToInput}
					onCommit={() =>
						commitNumberFilter("ratingTo", ratingToInput, filters.ratingTo)
					}
				/>
				<FilterNumberInput
					label="Год от"
					value={yearFromInput}
					onChange={setYearFromInput}
					onCommit={() =>
						commitNumberFilter("yearFrom", yearFromInput, filters.yearFrom)
					}
				/>
				<FilterNumberInput
					label="Год до"
					value={yearToInput}
					onChange={setYearToInput}
					onCommit={() =>
						commitNumberFilter("yearTo", yearToInput, filters.yearTo)
					}
				/>
			</div>

			<div className={styles.genresTitle}>Жанры</div>
			{isLoadingGenres ? (
				<Loader />
			) : (
				<div className={styles.genres}>
					{genres.slice(0, MAX_GENRES_VISIBLE).map((genre) => (
						<FilterCheckbox
							key={genre}
							label={genre}
							checked={filters.genres.includes(genre)}
							onChange={() => onToggleGenre(genre)}
						/>
					))}
				</div>
			)}
			<div className={styles.footer}>
				<Button
					className={styles.resetBtn}
					mode="outline"
					onClick={() => updateFilters({ genres: [] })}
				>
					Сбросить жанры
				</Button>
			</div>
		</Div>
	);
};
