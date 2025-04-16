export type TabsValues = "overview" | "activity_log";

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
		title: "Activity Log",
		value: "activity_log",
	},
];
