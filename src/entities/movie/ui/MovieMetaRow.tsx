import styles from "./MovieMetaRow.module.css";

type MovieMetaRowProps = {
	label: string;
	value: string;
};

export const MovieMetaRow = ({
	label,
	value,
}: MovieMetaRowProps): React.JSX.Element => {
	return (
		<div className={styles.row}>
			<span className={styles.label}>{label}</span>
			<span className={styles.value}>{value}</span>
		</div>
	);
};
