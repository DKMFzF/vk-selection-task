import { Box, Button, Checkbox, Title } from "@vkontakte/vkui";
import { useUnit } from "effector-react";
import { useEffect, useState } from "react";

import { $genres, $isLoadingGenres } from "@/entities/movie/model";
import { Loader } from "@/shared/ui/Loader";
import { useMovieFilters } from "../hooks/useMovieFilters";
import styles from "./MovieFilters.module.css";

const MAX_GENRES_VISIBLE = 10;
const RATING_MIN = 0;
const RATING_MAX = 10;
const RATING_STEP = 0.1;
const YEAR_MIN = 1990;
const YEAR_MAX = new Date().getFullYear();

export const MovieFilters = (): React.JSX.Element => {
	const { filters, updateFilters } = useMovieFilters();
	const [genres, isLoadingGenres] = useUnit([$genres, $isLoadingGenres]);
	const [ratingFrom, setRatingFrom] = useState(filters.ratingFrom);
	const [ratingTo, setRatingTo] = useState(filters.ratingTo);
	const [yearFrom, setYearFrom] = useState(filters.yearFrom);
	const [yearTo, setYearTo] = useState(filters.yearTo);

	useEffect(() => {
		setRatingFrom(filters.ratingFrom);
		setRatingTo(filters.ratingTo);
		setYearFrom(filters.yearFrom);
		setYearTo(filters.yearTo);
	}, [filters.ratingFrom, filters.ratingTo, filters.yearFrom, filters.yearTo]);

	const onToggleGenre = (genre: string) => {
		const hasGenre = filters.genres.includes(genre);
		updateFilters({
			genres: hasGenre
				? filters.genres.filter((item) => item !== genre)
				: [...filters.genres, genre],
		});
	};

	const commitRatingRange = () => {
		const nextFrom = Number(ratingFrom.toFixed(1));
		const nextTo = Number(ratingTo.toFixed(1));
		if (filters.ratingFrom === nextFrom && filters.ratingTo === nextTo) return;
		updateFilters({ ratingFrom: nextFrom, ratingTo: nextTo });
	};

	const commitYearRange = () => {
		if (filters.yearFrom === yearFrom && filters.yearTo === yearTo) return;
		updateFilters({ yearFrom, yearTo });
	};

	return (
		<Box className={styles.container}>
			<Title level="2" className={styles.title}>
				Фильтры
			</Title>
			<div className={styles.controls}>
				<div>
					<div className={styles.genresTitle}>
						Рейтинг: {ratingFrom.toFixed(1)} - {ratingTo.toFixed(1)}
					</div>
					<div className={styles.rangeWrap}>
						<div
							className={styles.rangeFill}
							style={{
								left: `${((ratingFrom - RATING_MIN) / (RATING_MAX - RATING_MIN)) * 100}%`,
								right: `${100 - ((ratingTo - RATING_MIN) / (RATING_MAX - RATING_MIN)) * 100}%`,
							}}
						/>
						<input
							aria-label="Минимальный рейтинг"
							type="range"
							min={RATING_MIN}
							max={RATING_MAX}
							step={RATING_STEP}
							value={ratingFrom}
							className={styles.rangeInput}
							onChange={(event) =>
								setRatingFrom(Math.min(Number(event.target.value), ratingTo))
							}
							onMouseUp={commitRatingRange}
							onTouchEnd={commitRatingRange}
							onKeyUp={commitRatingRange}
						/>
						<input
							aria-label="Максимальный рейтинг"
							type="range"
							min={RATING_MIN}
							max={RATING_MAX}
							step={RATING_STEP}
							value={ratingTo}
							className={styles.rangeInput}
							onChange={(event) =>
								setRatingTo(Math.max(Number(event.target.value), ratingFrom))
							}
							onMouseUp={commitRatingRange}
							onTouchEnd={commitRatingRange}
							onKeyUp={commitRatingRange}
						/>
					</div>
				</div>

				<div>
					<div className={styles.genresTitle}>
						Год: {yearFrom} - {yearTo}
					</div>
					<div className={styles.rangeWrap}>
						<div
							className={styles.rangeFill}
							style={{
								left: `${((yearFrom - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * 100}%`,
								right: `${100 - ((yearTo - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * 100}%`,
							}}
						/>
						<input
							aria-label="Минимальный год"
							type="range"
							min={YEAR_MIN}
							max={YEAR_MAX}
							step={1}
							value={yearFrom}
							className={styles.rangeInput}
							onChange={(event) =>
								setYearFrom(Math.min(Number(event.target.value), yearTo))
							}
							onMouseUp={commitYearRange}
							onTouchEnd={commitYearRange}
							onKeyUp={commitYearRange}
						/>
						<input
							aria-label="Максимальный год"
							type="range"
							min={YEAR_MIN}
							max={YEAR_MAX}
							step={1}
							value={yearTo}
							className={styles.rangeInput}
							onChange={(event) =>
								setYearTo(Math.max(Number(event.target.value), yearFrom))
							}
							onMouseUp={commitYearRange}
							onTouchEnd={commitYearRange}
							onKeyUp={commitYearRange}
						/>
					</div>
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
