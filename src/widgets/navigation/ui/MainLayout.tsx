import {
	PanelHeader,
	SplitCol,
	SplitLayout,
	Tabbar,
	TabbarItem,
} from "@vkontakte/vkui";
import {
	Icon24FavoriteOutline,
	Icon24HomeOutline,
	Icon24SortHorizontalOutline,
} from "@vkontakte/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const TABS = [
	{ path: "/movies", text: "Фильмы", icon: <Icon24HomeOutline /> },
	{ path: "/favorites", text: "Избранное", icon: <Icon24FavoriteOutline /> },
	{
		path: "/compare",
		text: "Сравнение",
		icon: <Icon24SortHorizontalOutline />,
	},
];

export const MainLayout = (): React.JSX.Element => {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<SplitLayout header={<PanelHeader delimiter="none">Movie App</PanelHeader>}>
			<SplitCol autoSpaced>
				<div style={{ minHeight: "calc(100vh - 96px)" }}>
					<Outlet />
				</div>
				<Tabbar>
					{TABS.map((tab) => (
						<TabbarItem
							key={tab.path}
							selected={location.pathname.startsWith(tab.path)}
							text={tab.text}
							onClick={() => navigate(tab.path)}
						>
							{tab.icon}
						</TabbarItem>
					))}
				</Tabbar>
			</SplitCol>
		</SplitLayout>
	);
};
