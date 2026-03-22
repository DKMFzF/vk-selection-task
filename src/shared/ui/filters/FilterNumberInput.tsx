import styles from "./FilterControls.module.css";

type FilterNumberInputProps = {
	label: string;
	value: string;
	onChange: (value: string) => void;
	onCommit: () => void;
};

export const FilterNumberInput = ({
	label,
	value,
	onChange,
	onCommit,
}: FilterNumberInputProps): React.JSX.Element => {
	return (
		<label className={styles.field}>
			<span className={styles.label}>{label}</span>
			<input
				type="number"
				value={value}
				className={styles.input}
				onChange={(event) => onChange(event.target.value)}
				onBlur={onCommit}
				onKeyDown={(event) => {
					if (event.key === "Enter") {
						event.preventDefault();
						event.currentTarget.blur();
					}
				}}
			/>
		</label>
	);
};
