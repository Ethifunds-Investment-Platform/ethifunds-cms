import { Notification } from "@/types/notification.types";
import { marketplaceNotifications } from "./marketplace-notification";
import { myActiveInvestmentsNotifications } from "./active-investment-notifications";
import { savingsNotifications } from "./savings-notifications";
import { investmentProductsNotifications } from "./investment-product-notification";

export const notifications: Notification[] = [
	{
		id: 12,
		data: {
			type: "ACCOUNT_NOTIFICATION",
			message:
				"your account has been successfully verified and you have full access to all the features in the application",
		},
		read_at: null,
		created_at: "2025-01-24T01:12:51.000000Z",
		updated_at: "2025-01-24T01:12:51. 000000Z",
	},
	{
		id: 11,
		data: {
			type: "SYSTEM_NOTIFICATION",
			message:
				"system maintenance has been concluded and application is back at full capacity, thanks for your patience.",
		},
		read_at: "2025-01-24T01:12:51.000000Z",
		created_at: "2025-01-24T01:12:51.000000Z",
		updated_at: "2025-01-24T01:12:51. 000000Z",
	},

	{
		id: 30,
		data: {
			type: "PROMOTIONAL_NOTIFICATION",
			message:
				"New investment opportunities available for grabs check out the investments for more details",
			product: investmentProductsNotifications[0],
		},
		read_at: "2025-01-24T01:12:51.000000Z",
		created_at: "2025-01-24T01:12:51.000000Z",
		updated_at: "2025-01-24T01:12:51.000000Z",
	},
	{
		id: 1,
		data: {
			type: "INVESTMENT_OFFER_NOTIFICATION",
			message:
				"Your counter offer of ₦5 per unit for 3 units of REIT Product 1 has been sent to the seller. You'll be notified once they respond!",
		},
		read_at: null,
		created_at: "2025-01-24T01:12:51.000000Z",
		updated_at: "2025-01-24T01:12:51.000000Z",
	},

	{
		id: 310,
		data: {
			type: "TRANSACTIONS_NOTIFICATION",
			message: "NGN 5,000 was successfully transferred from your Vault to your wallet",
		},
		read_at: null,
		created_at: "2025-01-24T01:12:51.000000Z",
		updated_at: "2025-01-24T01:12:51.000000Z",
	},
	{
		id: 2,
		data: {
			type: "INVESTMENT_OFFER_NOTIFICATION",
			message: "Note that a counter offer has been made on your REIT investment",
			listing: marketplaceNotifications[0],
		},
		read_at: null,
		created_at: "2025-01-24T01:12:51.000000Z",
		updated_at: "2025-01-24T01:12:51.000000Z",
	},

	{
		id: 3,
		data: {
			type: "PROMOTIONAL_NOTIFICATION",
			message: "New REIT investment opportunity up for grabs check investments for details",
			product: investmentProductsNotifications[0],
		},
		read_at: "2025-01-24T01:12:51.000000Z",
		created_at: "2025-01-24T01:12:51.000000Z",
		updated_at: "2025-01-24T01:12:51.000000Z",
	},

	{
		id: 4,
		data: {
			type: "INVESTMENT_TRANSACTIONS_NOTIFICATION",
			message: "you have successfully renewed your savings investment",
			user_savings: savingsNotifications[0],
		},
		read_at: null,
		created_at: "2025-01-24T01:12:51.000000Z",
		updated_at: "2025-01-24T01:12:51.000000Z",
	},

	{
		id: 29,
		data: {
			type: "INVESTMENT_TRANSACTIONS_NOTIFICATION",
			message: "you have successfully purchased your an investment",
			user_investment: myActiveInvestmentsNotifications[0].investments[0],
		},
		read_at: null,
		created_at: "2025-01-24T01:12:51.000000Z",
		updated_at: "2025-01-24T01:12:51.000000Z",
	},
];
