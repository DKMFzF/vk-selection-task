import styles from "./RatingBadge.module.css";

type RatingBadgeProps = {
	value: number | null;
};

const getBadgeClass = (value: number | null): string => {
	if (value === null) return styles.empty;
	if (value >= 7) return styles.high;
	if (value >= 5) return styles.medium;
	return styles.low;
};

export const RatingBadge = ({ value }: RatingBadgeProps): React.JSX.Element => {
	return (
		<span className={`${styles.badge} ${getBadgeClass(value)}`}>
			{value === null ? "—" : value.toFixed(1)}
		</span>
	);
};
