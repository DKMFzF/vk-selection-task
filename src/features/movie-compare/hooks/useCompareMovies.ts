import { useUnit } from "effector-react";

import {
	$compareQueue,
	compareAdded,
	compareCleared,
	compareRemoved,
} from "@/entities/movie/model";

export const useCompareMovies = () => {
	const compareQueue = useUnit($compareQueue);
	const add = useUnit(compareAdded);
	const remove = useUnit(compareRemoved);
	const clear = useUnit(compareCleared);

	return {
		compareQueue,
		addToCompare: add,
		removeFromCompare: remove,
		clearCompare: clear,
	};
};
