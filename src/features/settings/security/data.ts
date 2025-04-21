import { assets } from "@/constants";
import { SettingsTab } from "../data";

type SecurityTab = SettingsTab & {
	text: string;
	bg: string;
	bg_style: string;
};
export const securityTabs: SecurityTab[] = [
	{
		title: "Change Password",
		text: "Regularly Update your password to keep your account safe.",
		value: "change_password",
		bg_style: "",
		bg: assets.change_password_icon_01,
	},

	// {
	// 	title: "Two Factor Authentication",
	// 	text: "Activate 2FA for enhanced security, ensuring that only you have access to your account",
	// 	value: "2fa",
	// 	bg_style: "",
	// 	bg: assets.two_factory_auth_icon_01,
	// },
];
