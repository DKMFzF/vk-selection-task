import {
	Button,
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
import { useMediaQuery } from "@/shared/lib/hooks/useMediaQuery";
import styles from "./MainLayout.module.css";

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
	const isMobile = useMediaQuery("(max-width: 1023px)");

	return (
		<SplitLayout>
			<SplitCol autoSpaced>
				{isMobile ? (
					<>
						<div className={styles.mobileContent}>
							<Outlet />
						</div>
						<Tabbar>
							{TABS.map((tab) => (
								<TabbarItem
									key={tab.path}
									selected={location.pathname.startsWith(tab.path)}
									aria-label={tab.text}
									onClick={() => navigate(tab.path)}
								>
									{tab.icon}
									<span className="visuallyHidden">{tab.text}</span>
								</TabbarItem>
							))}
						</Tabbar>
					</>
				) : (
					<div className={styles.root}>
						<div className={styles.content}>
							<Outlet />
						</div>
						<nav className={styles.desktopNav} aria-label="Разделы">
							{TABS.map((tab) => (
								<Button
									key={tab.path}
									mode={
										location.pathname.startsWith(tab.path)
											? "primary"
											: "secondary"
									}
									before={tab.icon}
									stretched
									onClick={() => navigate(tab.path)}
									className={styles.desktopNavItem}
								>
									{tab.text}
								</Button>
							))}
						</nav>
					</div>
				)}
			</SplitCol>
		</SplitLayout>
	);
};
