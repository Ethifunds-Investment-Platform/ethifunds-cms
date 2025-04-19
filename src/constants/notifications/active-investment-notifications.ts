import { MyActiveInvestmentNotifications } from "@/types/notification.types";

export const myActiveInvestmentsNotifications: MyActiveInvestmentNotifications[] = [
	{
		category: {
			id: 1,
			name: "Real Estate Investment",
			display_image:
				"https://res.cloudinary.com/dtfbkxzmc/image/upload/v1738885847/Buy_House_yesqry.png",
			description:
				"Diversify your portfolio with Ethifund’s Real Estate Investment Trust (REIT) opportunities. Invest in a carefully curated pool of real estate assets that generate income through rental collections and property sales with transparent returns, flexible buy-and-sell options, and potential for capital growth.",
			display_title: "Real Estate Investment",
			type: "unitized",
			status: "active",
			created_at: null,
			updated_at: null,
		},
		investments: [
			{
				id: 1,
				user_id: 1,
				product_id: 1,
				investment_type: "unitized",
				status: "active",
				total_invested: "4000.00",
				units_purchased: 40,
				units_sold: 12,
				start_at: "2025-02-08T01:51:19.000000Z",
				end_at: null,
				matured_at: null,
				canceled_at: null,
				interest_accrued: "0.00",
				total_roi: "0.00",
				next_payout_date: null,
				payout_frequency: null,
				last_payout_amount: null,
				profit_withdrawn: "0.00",
				withdrawable_balance: "0.00",
				investment_growth: 0,
				transaction_reference: null,
				investment_plan_details: null,
				created_at: "2025-02-08T01:51:19.000000Z",
				updated_at: "2025-02-08T02:07:06.000000Z",
			},
		],
		sum: 4000,
		recent_transactions: [],
	},
];
