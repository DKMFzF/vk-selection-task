import { Div, Text } from "@vkontakte/vkui";

type LoaderProps = {
	label?: string;
};

export const Loader = ({
	label = "Загрузка...",
}: LoaderProps): React.JSX.Element => {
	return (
		<Div style={{ paddingTop: 8, paddingBottom: 8 }}>
			<Text>{label}</Text>
		</Div>
	);
};
