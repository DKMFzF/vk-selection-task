import { apiClient } from "./client";
import { mapMovieDtoToModel } from "@/entities/movie/model/adapters";
import type {
	Movie,
	MovieFilters,
	MoviesApiResponseDto,
	MoviesResponse,
} from "@/entities/movie/model/types";

type FetchMoviesParams = {
	page: number;
	limit: number;
	filters: MovieFilters;
};

const buildYearRange = (from: number, to: number): string => `${from}-${to}`;
const buildRatingRange = (from: number, to: number): string => `${from}-${to}`;

export const fetchMovies = async (
	params: FetchMoviesParams,
): Promise<MoviesResponse> => {
	const { page, limit, filters } = params;
	const response = await apiClient.get<MoviesApiResponseDto>("/movie", {
		params: {
			page,
			limit,
			"rating.kp": buildRatingRange(filters.ratingFrom, filters.ratingTo),
			year: buildYearRange(filters.yearFrom, filters.yearTo),
			"genres.name": filters.genres,
		},
		paramsSerializer: {
			indexes: null,
		},
	});

	return {
		docs: response.data.docs.map(mapMovieDtoToModel),
		total: response.data.total,
		page: response.data.page,
		pages: response.data.pages,
	};
};

export const fetchMovieById = async (id: number): Promise<Movie> => {
	const response = await apiClient.get(`/movie/${id}`);
	return mapMovieDtoToModel(response.data);
};

export const fetchGenres = async (): Promise<string[]> => {
	const response = await apiClient.get<Array<{ name: string }>>(
		"/movie/possible-values-by-field",
		{
			params: { field: "genres.name" },
		},
	);
	return response.data
		.map((item) => item.name)
		.filter(Boolean)
		.slice(0, 20);
};
