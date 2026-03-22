import styles from "./FilterControls.module.css";

type FilterCheckboxProps = {
	label: string;
	checked: boolean;
	onChange: () => void;
};

export const FilterCheckbox = ({
	label,
	checked,
	onChange,
}: FilterCheckboxProps): React.JSX.Element => {
	return (
		<label className={styles.check}>
			<input
				type="checkbox"
				className={styles.checkInput}
				checked={checked}
				onChange={onChange}
			/>
			<span>{label}</span>
		</label>
	);
};
