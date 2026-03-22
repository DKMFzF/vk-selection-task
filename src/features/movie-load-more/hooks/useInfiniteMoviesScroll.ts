import { useCallback } from "react";

import { useIntersection } from "@/shared/lib/hooks/useIntersection";

type UseInfiniteMoviesScrollParams = {
	enabled: boolean;
	onLoadMore: () => void;
};

export const useInfiniteMoviesScroll = ({
	enabled,
	onLoadMore,
}: UseInfiniteMoviesScrollParams) => {
	const onIntersect = useCallback(() => {
		if (enabled) onLoadMore();
	}, [enabled, onLoadMore]);

	return useIntersection({ enabled, onIntersect });
};
