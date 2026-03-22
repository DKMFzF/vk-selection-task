import { StrictMode } from "react";

import { AppProviders } from "./providers/AppProviders";
import { AppRouter } from "./router/AppRouter";

export const App = (): React.JSX.Element => {
	return (
		<StrictMode>
			<AppProviders>
				<AppRouter />
			</AppProviders>
		</StrictMode>
	);
};
