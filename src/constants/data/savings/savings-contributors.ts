import { SavingsContributor } from "@/types/savings.types";
import { users } from "../users";

export const savingsContributors: SavingsContributor[] = [
	{
		id: 1,
		user_id: 101,
		user: users[0],
		amount_contributed: "5000",
		last_contribution_date: "2023-01-01T10:00:00Z",
		created_at: "2023-01-01T10:00:00Z",
		updated_at: "2023-01-15T12:00:00Z",
	},
	{
		id: 2,
		user_id: 102,
		user: users[1],
		amount_contributed: "3000",
		last_contribution_date: "2023-02-01T11:00:00Z",
		created_at: "2023-02-01T11:00:00Z",
		updated_at: "2023-02-10T14:00:00Z",
	},
	{
		id: 3,
		user_id: 103,
		user: users[1],
		amount_contributed: "4000",
		last_contribution_date: "2023-03-01T09:00:00Z",
		created_at: "2023-03-01T09:00:00Z",
		updated_at: "2023-03-20T16:00:00Z",
	},
	{
		id: 4,
		user_id: 104,
		user: users[0],
		amount_contributed: "2000",
		last_contribution_date: "2023-04-01T08:00:00Z",
		created_at: "2023-04-01T08:00:00Z",
		updated_at: "2023-04-05T10:00:00Z",
	},
	{
		id: 5,
		user_id: 105,
		user: users[1],
		amount_contributed: "10000",
		last_contribution_date: "2023-05-01T07:00:00Z",
		created_at: "2023-05-01T07:00:00Z",
		updated_at: "2023-05-15T18:00:00Z",
	},
];