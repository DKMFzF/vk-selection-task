import { useUnit } from "effector-react";
import { useEffect, useMemo, useRef } from "react";
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
	const updateFiltersEvent = useUnit(filtersChanged);
	const replaceFilters = useUnit(filtersReplaced);
	const [searchParams, setSearchParams] = useSearchParams();
	const syncFromUrlRef = useRef(false);
	const localChangeRef = useRef(false);
	const searchKey = searchParams.toString();
	const filtersKey = useMemo(
		() => buildQueryFromFilters(filters).toString(),
		[filters],
	);

	useEffect(() => {
		if (localChangeRef.current) {
			if (searchKey === filtersKey) {
				localChangeRef.current = false;
			}
			return;
		}

		const parsed = parseFiltersFromQuery(new URLSearchParams(searchKey));
		const parsedKey = buildQueryFromFilters(parsed).toString();
		if (parsedKey !== filtersKey) {
			syncFromUrlRef.current = true;
			replaceFilters(parsed);
		}
	}, [filtersKey, replaceFilters, searchKey]);

	useEffect(() => {
		if (syncFromUrlRef.current) {
			syncFromUrlRef.current = false;
			return;
		}
		if (filtersKey !== searchKey) {
			setSearchParams(buildQueryFromFilters(filters), { replace: true });
		}
	}, [filters, filtersKey, searchKey, setSearchParams]);

	const updateFilters = (payload: Parameters<typeof updateFiltersEvent>[0]) => {
		localChangeRef.current = true;
		updateFiltersEvent(payload);
	};

	return {
		filters,
		updateFilters,
	};
};
