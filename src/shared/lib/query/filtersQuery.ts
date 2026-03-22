import type { MovieFilters } from "@/entities/movie/model/types";

const MIN_YEAR = 1990;
const MAX_YEAR = new Date().getFullYear();

const toNumber = (value: string | null, fallback: number): number => {
	if (!value) return fallback;
	const parsed = Number(value);
	return Number.isFinite(parsed) ? parsed : fallback;
};

export const defaultFilters: MovieFilters = {
	genres: [],
	ratingFrom: 0,
	ratingTo: 10,
	yearFrom: MIN_YEAR,
	yearTo: MAX_YEAR,
};

export const parseFiltersFromQuery = (
	searchParams: URLSearchParams,
): MovieFilters => {
	const genresRaw = searchParams.get("genres") || "";
	const genres = genresRaw
		.split(",")
		.map((item) => item.trim())
		.filter(Boolean);

	return {
		genres,
		ratingFrom: toNumber(
			searchParams.get("ratingFrom"),
			defaultFilters.ratingFrom,
		),
		ratingTo: toNumber(searchParams.get("ratingTo"), defaultFilters.ratingTo),
		yearFrom: Math.max(
			toNumber(searchParams.get("yearFrom"), defaultFilters.yearFrom),
			MIN_YEAR,
		),
		yearTo: toNumber(searchParams.get("yearTo"), defaultFilters.yearTo),
	};
};

export const buildQueryFromFilters = (
	filters: MovieFilters,
): URLSearchParams => {
	const params = new URLSearchParams();
	if (filters.genres.length > 0) params.set("genres", filters.genres.join(","));
	params.set("ratingFrom", String(filters.ratingFrom));
	params.set("ratingTo", String(filters.ratingTo));
	params.set("yearFrom", String(filters.yearFrom));
	params.set("yearTo", String(filters.yearTo));
	return params;
};
