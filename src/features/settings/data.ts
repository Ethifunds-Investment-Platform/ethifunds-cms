export type TabsValues = "profile" | "security" | "change_password" | "2fa" | "default";

export type SettingsTab = {
	title: string;
	value: TabsValues;
};

export const settingsTab: SettingsTab[] = [
	{
		title: "profile",
		value: "profile",
	},
	{
		title: "security",
		value: "security",
	},
];
