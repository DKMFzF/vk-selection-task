import { Box, Button, Checkbox, Input, Title } from "@vkontakte/vkui";
import { useUnit } from "effector-react";
import { useEffect, useState } from "react";

import { $genres, $isLoadingGenres } from "@/entities/movie/model";
import { Loader } from "@/shared/ui/Loader";
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
		<Box className={styles.container}>
			<Title level="2" className={styles.title}>
				Фильтры
			</Title>
			<div className={styles.controls}>
				<div>
					<div className={styles.genresTitle}>Рейтинг от</div>
					<Input
						aria-label="Рейтинг от"
						type="number"
						value={ratingFromInput}
						onChange={(event) => setRatingFromInput(event.target.value)}
						onBlur={() =>
							commitNumberFilter(
								"ratingFrom",
								ratingFromInput,
								filters.ratingFrom,
							)
						}
						onKeyDown={(event) => {
							if (event.key === "Enter") {
								event.preventDefault();
								event.currentTarget.blur();
							}
						}}
					/>
				</div>
				<div>
					<div className={styles.genresTitle}>Рейтинг до</div>
					<Input
						aria-label="Рейтинг до"
						type="number"
						value={ratingToInput}
						onChange={(event) => setRatingToInput(event.target.value)}
						onBlur={() =>
							commitNumberFilter("ratingTo", ratingToInput, filters.ratingTo)
						}
						onKeyDown={(event) => {
							if (event.key === "Enter") {
								event.preventDefault();
								event.currentTarget.blur();
							}
						}}
					/>
				</div>
				<div>
					<div className={styles.genresTitle}>Год от</div>
					<Input
						aria-label="Год от"
						type="number"
						value={yearFromInput}
						onChange={(event) => setYearFromInput(event.target.value)}
						onBlur={() =>
							commitNumberFilter("yearFrom", yearFromInput, filters.yearFrom)
						}
						onKeyDown={(event) => {
							if (event.key === "Enter") {
								event.preventDefault();
								event.currentTarget.blur();
							}
						}}
					/>
				</div>
				<div>
					<div className={styles.genresTitle}>Год до</div>
					<Input
						aria-label="Год до"
						type="number"
						value={yearToInput}
						onChange={(event) => setYearToInput(event.target.value)}
						onBlur={() =>
							commitNumberFilter("yearTo", yearToInput, filters.yearTo)
						}
						onKeyDown={(event) => {
							if (event.key === "Enter") {
								event.preventDefault();
								event.currentTarget.blur();
							}
						}}
					/>
				</div>
			</div>

			<div className={styles.genresTitle}>Жанры</div>
			{isLoadingGenres ? (
				<Loader />
			) : (
				<div className={styles.genres}>
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
			<div className={styles.footer}>
				<Button
					className={styles.resetBtn}
					mode="outline"
					onClick={() => updateFilters({ genres: [] })}
				>
					Сбросить жанры
				</Button>
			</div>
		</Box>
	);
};
