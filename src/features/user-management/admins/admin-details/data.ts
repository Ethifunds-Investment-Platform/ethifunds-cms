export type TabsValues = "overview" | "activity_log";

export type AdminDetailsTab = {
	title: string;
	value: TabsValues;
};

export const adminDetailsTabs: AdminDetailsTab[] = [
	{
		title: "Overview",
		value: "overview",
	},
	{
		title: "Activity Log",
		value: "activity_log",
	},
];
