import type { PropsWithChildren } from "react";
import { AdaptivityProvider, AppRoot, ConfigProvider } from "@vkontakte/vkui";
import { BrowserRouter } from "react-router-dom";

export const AppProviders = ({
	children,
}: PropsWithChildren): React.JSX.Element => {
	return (
		<ConfigProvider>
			<AdaptivityProvider>
				<AppRoot>
					<BrowserRouter>{children}</BrowserRouter>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
};
