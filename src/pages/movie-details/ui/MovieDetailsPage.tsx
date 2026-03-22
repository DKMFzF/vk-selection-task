import { Button, Div, Group, Text } from "@vkontakte/vkui";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useFavorites } from "@/features/favorites/hooks/useFavorites";
import { FavoriteConfirmModal } from "@/features/favorites/ui/FavoriteConfirmModal";
import { useCompareMovies } from "@/features/movie-compare/hooks/useCompareMovies";
import { useMovieDetails } from "@/features/movie-details/hooks/useMovieDetails";
import { Loader } from "@/shared/ui/Loader";
import { MovieDetailsCard } from "@/widgets/movie-details/ui/MovieDetailsCard";
import styles from "./MovieDetailsPage.module.css";

export const MovieDetailsPage = (): React.JSX.Element => {
	const navigate = useNavigate();
	const { id } = useParams();
	const movieId = useMemo(() => Number(id), [id]);
	const { movie, isLoading, error } = useMovieDetails(
		Number.isFinite(movieId) ? movieId : null,
	);
	const {
		favoriteIds,
		pendingMovie,
		requestAddFavorite,
		removeFavorite,
		cancelFavoriteAdd,
		confirmFavoriteAdd,
	} = useFavorites();
	const { compareQueue, addToCompare, removeFromCompare } = useCompareMovies();

	const compareIds = useMemo(
		() => new Set(compareQueue.map((item) => item.id)),
		[compareQueue],
	);

	return (
		<>
			<div className={styles.container}>
				<Group>
					<Div>
						<Button
							mode="tertiary"
							size="s"
							style={{ marginBottom: 12 }}
							onClick={() => {
								if (window.history.length > 1) {
									navigate(-1);
								} else {
									navigate("/movies");
								}
							}}
						>
							Назад
						</Button>
						{isLoading ? <Loader /> : null}
						{error ? <Text>Ошибка загрузки: {error}</Text> : null}
						{movie ? (
							<MovieDetailsCard
								movie={movie}
								isFavorite={favoriteIds.has(movie.id)}
								isCompared={compareIds.has(movie.id)}
								onToggleFavorite={() =>
									favoriteIds.has(movie.id)
										? removeFavorite(movie.id)
										: requestAddFavorite(movie)
								}
								onToggleCompare={() =>
									compareIds.has(movie.id)
										? removeFromCompare(movie.id)
										: addToCompare(movie)
								}
							/>
						) : null}
					</Div>
				</Group>
			</div>
			<FavoriteConfirmModal
				pendingMovie={pendingMovie}
				onCancel={cancelFavoriteAdd}
				onConfirm={confirmFavoriteAdd}
			/>
		</>
	);
};
