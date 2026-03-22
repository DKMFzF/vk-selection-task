import { Navigate, Route, Routes } from "react-router-dom";

import { MainLayout } from "@/widgets/navigation/ui/MainLayout";
import { ComparePage } from "@/pages/compare/ui/ComparePage";
import { FavoritesPage } from "@/pages/favorites/ui/FavoritesPage";
import { MovieDetailsPage } from "@/pages/movie-details/ui/MovieDetailsPage";
import { MoviesPage } from "@/pages/movies/ui/MoviesPage";

export const AppRouter = (): React.JSX.Element => {
	return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route path="/movies" element={<MoviesPage />} />
				<Route path="/movies/:id" element={<MovieDetailsPage />} />
				<Route path="/favorites" element={<FavoritesPage />} />
				<Route path="/compare" element={<ComparePage />} />
				<Route path="/" element={<Navigate to="/movies" replace />} />
				<Route path="*" element={<Navigate to="/movies" replace />} />
			</Route>
		</Routes>
	);
};
