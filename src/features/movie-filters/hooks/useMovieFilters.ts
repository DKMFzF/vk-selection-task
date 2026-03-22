import { useUnit } from "effector-react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import {
	$filters,
	filtersChanged,
	filtersReplaced,
} from "@/entities/movie/model";
import {
	buildQueryFromFilters,
	parseFiltersFromQuery,
} from "@/shared/lib/query/filtersQuery";

export const useMovieFilters = () => {
	const filters = useUnit($filters);
	const updateFilters = useUnit(filtersChanged);
	const replaceFilters = useUnit(filtersReplaced);
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		const parsed = parseFiltersFromQuery(searchParams);
		const isSame =
			parsed.ratingFrom === filters.ratingFrom &&
			parsed.ratingTo === filters.ratingTo &&
			parsed.yearFrom === filters.yearFrom &&
			parsed.yearTo === filters.yearTo &&
			parsed.genres.join(",") === filters.genres.join(",");
		if (!isSame) replaceFilters(parsed);
	}, [filters, replaceFilters, searchParams]);

	useEffect(() => {
		const nextParams = buildQueryFromFilters(filters);
		const next = nextParams.toString();
		const current = searchParams.toString();
		if (next !== current) {
			setSearchParams(nextParams, { replace: true });
		}
	}, [filters, searchParams, setSearchParams]);

	return {
		filters,
		updateFilters,
	};
};
