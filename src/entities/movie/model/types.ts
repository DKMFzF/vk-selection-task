export type MovieGenre = {
	name: string;
};

export type Movie = {
	id: number;
	title: string;
	description: string;
	year: number | null;
	rating: number | null;
	genres: string[];
	durationMinutes: number | null;
	releaseDate: string | null;
	posterUrl: string | null;
};

export type MovieFilters = {
	genres: string[];
	ratingFrom: number;
	ratingTo: number;
	yearFrom: number;
	yearTo: number;
};

export type MoviesResponse = {
	docs: Movie[];
	total: number;
	page: number;
	pages: number;
};

export type MovieDto = {
	id: number;
	name?: string | null;
	alternativeName?: string | null;
	description?: string | null;
	year?: number | null;
	movieLength?: number | null;
	rating?: {
		kp?: number | null;
	} | null;
	genres?: MovieGenre[] | null;
	poster?: {
		url?: string | null;
		previewUrl?: string | null;
	} | null;
	premiere?: {
		world?: string | null;
	} | null;
};

export type MoviesApiResponseDto = {
	docs: MovieDto[];
	total: number;
	page: number;
	pages: number;
};
