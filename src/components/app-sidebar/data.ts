import * as icons from "./icons";
export type SidebarLink = {
	name: string;
	path: string;
	icon: string;
	activeIcon: string;
	relativePaths: string[];
};

export const sidebarLinks: SidebarLink[] = [
	{
		name: "dashboard",
		path: "dashboard",
		icon: icons.dashboard_icon,
		activeIcon: icons.dashboard_icon_active,
		relativePaths: [],
	},
	{
		name: "listing approval",
		path: "listings",
		icon: icons.listing_icon,
		activeIcon: icons.listing_icon_active,
		relativePaths: [],
	},
	{
		name: "transactions",
		path: "transactions",
		icon: icons.transactions_icon,
		activeIcon: icons.transactions_icon_active,
		relativePaths: [],
	},
	{
		name: "user management",
		path: "users",
		icon: icons.users_icon,
		activeIcon: icons.users_icon_active,
		relativePaths: [],
	},
	{
		name: "Ethivest",
		path: "investments",
		icon: icons.investments_icon,
		activeIcon: icons.investments_icon_active,
		relativePaths: [],
	},
	{
		name: "savings",
		path: "savings",
		icon: icons.savings_icon,
		activeIcon: icons.savings_icon_active,
		relativePaths: [],
	},

	{
		name: "notifications",
		path: "notifications",
		icon: icons.notifications_icon,
		activeIcon: icons.notifications_icon,
		relativePaths: [],
	},

	// {
	// 	name: "report & analysis",
	// 	path: "reports",
	// 	icon: icons.reports_icon,
	// 	activeIcon: icons.reports_icon_active,
	// 	relativePaths: [],
	// },

	// {
	// 	name: "support",
	// 	path: "support",
	// 	icon: icons.support_icon,
	// 	activeIcon: icons.support_icon_active,
	// 	relativePaths: [],
	// },
	{
		name: "settings",
		path: "settings",
		icon: icons.settings_icon,
		activeIcon: icons.settings_icon_active,
		relativePaths: [],
	},
];
