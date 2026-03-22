import type { Movie, MovieDto } from "./types";

const EMPTY_DESCRIPTION = "Описание отсутствует";
const EMPTY_TITLE = "Без названия";

export const mapMovieDtoToModel = (dto: MovieDto): Movie => ({
	id: dto.id,
	title: dto.name || dto.alternativeName || EMPTY_TITLE,
	description: dto.description || EMPTY_DESCRIPTION,
	year: dto.year ?? null,
	rating: dto.rating?.kp ?? null,
	genres: dto.genres?.map((genre) => genre.name).filter(Boolean) ?? [],
	durationMinutes: dto.movieLength ?? null,
	releaseDate: dto.premiere?.world ?? null,
	posterUrl: dto.poster?.url || dto.poster?.previewUrl || null,
});
