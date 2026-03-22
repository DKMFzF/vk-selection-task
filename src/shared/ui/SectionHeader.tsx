import styles from "./SectionHeader.module.css";

type SectionHeaderProps = {
	title: string;
	subtitle?: string;
};

export const SectionHeader = ({
	title,
	subtitle,
}: SectionHeaderProps): React.JSX.Element => {
	return (
		<div>
			<h1 className={styles.title}>{title}</h1>
			{subtitle ? <div className={styles.subtitle}>{subtitle}</div> : null}
		</div>
	);
};
