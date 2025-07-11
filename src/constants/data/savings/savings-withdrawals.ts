import { SavingsWithdrawal } from "@/types/savings.types";

export const savingsWithdrawals: SavingsWithdrawal[] = [
	{
		id: 2,
		user_id: 1,
		amount: "100.00",
		status: "paid",
		requested_at: "2025-07-10T00:01:20.000000Z",
		processed_at: "2025-07-10T00:01:36.000000Z",
		target_account_id: 5,
		quarter_id: null,
		created_at: "2025-07-10T00:01:20.000000Z",
		updated_at: "2025-07-10T00:01:36.000000Z",
		user: {
			id: 1,
			email: "uchechukwueze70@gmail.com",
			has_set_pin: 0,
			name: " ",
			user_profile: null,
		},
	},
	{
		id: 3,
		user_id: 1,
		amount: "100.00",
		status: "pending",
		requested_at: "2025-07-10T00:01:20.000000Z",
		processed_at: "2025-07-10T00:01:36.000000Z",
		target_account_id: 5,
		quarter_id: null,
		created_at: "2025-07-10T00:01:20.000000Z",
		updated_at: "2025-07-10T00:01:36.000000Z",
		user: {
			id: 1,
			email: "uchechukwueze70@gmail.com",
			has_set_pin: 0,
			name: " ",
			user_profile: null,
		},
	},
];
