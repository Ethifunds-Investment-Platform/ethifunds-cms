export type TabsValues = "overview" | "investments" | "savings" | "activity_log";

export type UserDetailsTab = {
	title: string;
	value: TabsValues;
};

export const userDetailsTabs: UserDetailsTab[] = [
	{
		title: "Overview",
		value: "overview",
	},
	{
		title: "Investments",
		value: "investments",
	},
	{
		title: "Savings",
		value: "savings",
	},
	{
		title: "Activity Log",
		value: "activity_log",
	},
];
