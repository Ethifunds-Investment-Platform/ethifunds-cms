export type Features =
	| "investments"
	| "listing approval"
	| "user management"
	| "admins"
	| "transactions"
	| "savings"
	| "settings"
	| "profile"
	| "change password"
	| "notification";

export type FeatureList = {
	id: number;
	name: Features;
	path: string;
	tags?: string[];
};

// users?section=admins
export const featureList: FeatureList[] = [
	{
		id: 3,
		name: "investments",
		path: "/investments",
		tags: ["invest", "reit", "reits", "ethivest"],
	},

	{
		id: 3,
		name: "transactions",
		path: "/transactions",
		tags: ["transactions", "payments", "transfer", "new transactions"],
	},

	{
		id: 10,
		name: "user management",
		path: "/users",
		tags: ["users", "all users", "view users", "new users", "clients", "user list", "app users"],
	},

	{
		id: 10,
		name: "admins",
		path: "/users?section=admins",
		tags: ["admins", "all admins",  "view admins", "new admin", "create admin", "admin list", "app admins"],
	},
	{
		id: 10,
		name: "listing approval",
		path: "/listings",
		tags: [
			"listings",
			"listing",
			"approval",
			"listing approval",
			"approve listing",
			"approve investment",
			"approve offers",
			"approve offer",
			"offers",
			"offer",
		],
	},

	{
		id: 5,
		name: "savings",
		path: "/savings",
		tags: ["ethicoop", "sharia savings", "cooperative", "co operative"],
	},

	{
		id: 7,
		name: "settings",
		path: "/settings",
		tags: ["account settings", "my settings", "app settings"],
	},

	{
		id: 10,
		name: "change password",
		path: "/settings?tab=security&sub_tab=change_password",
		tags: [
			"update password",
			"password",
			"reset password",
			"user password",
			"account password",
			"new password",
			"settings",
		],
	},

	{
		id: 17,
		name: "notification",
		path: "/notifications",
		tags: [
			"notifications",
			"in app notifications",
			"push notifications",
			"new notification",
			"create notification",
		],
	},
];
