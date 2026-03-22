import { StrictMode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { HomePage } from "../pages/HomePage";

import "./app.css";

export const App = (): React.JSX.Element => {
	return (
		<StrictMode>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</BrowserRouter>
		</StrictMode>
	);
};
