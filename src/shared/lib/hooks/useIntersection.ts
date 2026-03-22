import { useEffect, useRef } from "react";

type UseIntersectionParams = {
	onIntersect: () => void;
	enabled: boolean;
};

export const useIntersection = ({
	onIntersect,
	enabled,
}: UseIntersectionParams) => {
	const targetRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!enabled || !targetRef.current) return;
		const observer = new IntersectionObserver(
			(entries) => {
				const [entry] = entries;
				if (entry?.isIntersecting) onIntersect();
			},
			{ threshold: 1 },
		);
		observer.observe(targetRef.current);
		return () => observer.disconnect();
	}, [enabled, onIntersect]);

	return targetRef;
};
