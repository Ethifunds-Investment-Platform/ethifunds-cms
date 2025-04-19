export type TabsValues = "overview" | "savings_history";

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
];
