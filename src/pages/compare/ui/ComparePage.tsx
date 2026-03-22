import { Div, Group, Title } from "@vkontakte/vkui";

import { useCompareMovies } from "@/features/movie-compare/hooks/useCompareMovies";
import { CompareTable } from "@/widgets/compare-table/ui/CompareTable";

export const ComparePage = (): React.JSX.Element => {
	const { compareQueue, removeFromCompare, clearCompare } = useCompareMovies();

	return (
		<Group>
			<Div>
				<Title level="1" style={{ marginTop: 0 }}>
					Сравнение
				</Title>
				<CompareTable
					movies={compareQueue}
					onRemove={removeFromCompare}
					onClear={clearCompare}
				/>
			</Div>
		</Group>
	);
};
