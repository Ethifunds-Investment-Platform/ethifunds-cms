export type TabsValues = "overview" | "savings_history" | "savings_contributors";

export type SavingsTab = {
	title: string;
	value: TabsValues;
};

export const savingsTabs: SavingsTab[] = [
	{
		title: "Overview",
		value: "overview",
	},
	{
		title: "Savings History",
		value: "savings_history",
	},
	{
		title: "Savings Contributors",
		value: "savings_contributors",
	},
];
