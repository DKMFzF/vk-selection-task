import {
	combine,
	createEffect,
	createEvent,
	createStore,
	sample,
} from "effector";

import {
	fetchGenres,
	fetchMovieById,
	fetchMovies,
} from "@/shared/api/kinopoisk";
import { defaultFilters } from "@/shared/lib/query/filtersQuery";
import { readPersisted, writePersisted } from "@/shared/lib/storage/persist";
import type { Movie, MovieFilters, MoviesResponse } from "./types";

const FAVORITES_KEY = "movie_app_favorites";
const COMPARE_KEY = "movie_app_compare_queue";
const PAGE_LIMIT = 50;

const persistedFavorites = readPersisted<Movie[]>(FAVORITES_KEY, []);
const persistedCompare = readPersisted<Movie[]>(COMPARE_KEY, []);

export const appStarted = createEvent();
export const filtersChanged = createEvent<Partial<MovieFilters>>();
export const filtersReplaced = createEvent<MovieFilters>();
export const loadNextPageRequested = createEvent();
export const movieDetailsRequested = createEvent<number>();
export const detailsCleared = createEvent();

export const favoriteAddConfirmed = createEvent<Movie>();
export const favoriteRemoved = createEvent<number>();

export const compareAdded = createEvent<Movie>();
export const compareRemoved = createEvent<number>();
export const compareCleared = createEvent();

export const moviesRequestedFx = createEffect(
	async ({
		page,
		filters,
	}: {
		page: number;
		filters: MovieFilters;
	}): Promise<MoviesResponse> =>
		fetchMovies({ page, filters, limit: PAGE_LIMIT }),
);

export const movieDetailsRequestedFx = createEffect(
	async (id: number): Promise<Movie> => fetchMovieById(id),
);

export const genresRequestedFx = createEffect(
	async (): Promise<string[]> => fetchGenres(),
);

export const $filters = createStore<MovieFilters>(defaultFilters)
	.on(filtersChanged, (state, payload) => ({ ...state, ...payload }))
	.on(filtersReplaced, (_, payload) => payload);

export const $page = createStore(0);
export const $movies = createStore<Movie[]>([]);
export const $isLoadingMovies = moviesRequestedFx.pending;
export const $moviesError = createStore<string | null>(null)
	.on(moviesRequestedFx.failData, (_, error) => error.message)
	.reset([moviesRequestedFx.done, filtersChanged, filtersReplaced]);
export const $totalPages = createStore(1).on(
	moviesRequestedFx.doneData,
	(_, payload) => payload.pages,
);
export const $hasMore = combine(
	$page,
	$totalPages,
	(page, totalPages) => page < totalPages,
);

export const $selectedMovie = createStore<Movie | null>(null)
	.on(movieDetailsRequestedFx.doneData, (_, payload) => payload)
	.reset(detailsCleared);
export const $isLoadingDetails = movieDetailsRequestedFx.pending;
export const $detailsError = createStore<string | null>(null)
	.on(movieDetailsRequestedFx.failData, (_, error) => error.message)
	.reset([movieDetailsRequestedFx.done, movieDetailsRequested]);

export const $genres = createStore<string[]>([]).on(
	genresRequestedFx.doneData,
	(_, payload) => payload,
);
export const $isLoadingGenres = genresRequestedFx.pending;

export const $favorites = createStore<Movie[]>(persistedFavorites)
	.on(favoriteAddConfirmed, (state, movie) => {
		if (state.some((item) => item.id === movie.id)) return state;
		const next = [...state, movie];
		writePersisted(FAVORITES_KEY, next);
		return next;
	})
	.on(favoriteRemoved, (state, movieId) => {
		const next = state.filter((item) => item.id !== movieId);
		writePersisted(FAVORITES_KEY, next);
		return next;
	});

export const $compareQueue = createStore<Movie[]>(persistedCompare)
	.on(compareAdded, (state, movie) => {
		if (state.some((item) => item.id === movie.id)) return state;
		const next = state.length < 2 ? [...state, movie] : [state[1], movie];
		writePersisted(COMPARE_KEY, next);
		return next;
	})
	.on(compareRemoved, (state, movieId) => {
		const next = state.filter((item) => item.id !== movieId);
		writePersisted(COMPARE_KEY, next);
		return next;
	})
	.on(compareCleared, () => {
		writePersisted(COMPARE_KEY, []);
		return [];
	});

$movies
	.on(moviesRequestedFx.doneData, (state, payload) =>
		payload.page === 1 ? payload.docs : [...state, ...payload.docs],
	)
	.reset(filtersChanged)
	.reset(filtersReplaced);

$page
	.on(moviesRequestedFx.doneData, (_, payload) => payload.page)
	.reset(filtersChanged)
	.reset(filtersReplaced);

sample({
	clock: appStarted,
	target: genresRequestedFx,
});

sample({
	clock: [filtersChanged, filtersReplaced],
	target: loadNextPageRequested,
});

sample({
	clock: loadNextPageRequested,
	source: {
		page: $page,
		hasMore: $hasMore,
		isLoading: $isLoadingMovies,
		filters: $filters,
	},
	filter: ({ isLoading, hasMore }) => !isLoading && hasMore,
	fn: ({ page, filters }) => ({ page: page + 1, filters }),
	target: moviesRequestedFx,
});

sample({
	clock: movieDetailsRequested,
	target: movieDetailsRequestedFx,
});
