import { variables } from "@/constants";
import { transactions } from "@/constants/data/transactions";
import { users } from "@/constants/data/users";
import axios from "@/lib/axios";
import { Transaction } from "@/types/transaction.types";
import { User } from "@/types/user.types";

type Parameters = {
	user_id: string;
};

type Response = User & {
	recent_transactions: Transaction[];
};

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.post(`/users/${data.user_id}`);

	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					...users[0],
					recent_transactions: transactions,
				}),
			2000
		);
	});
}

export default async function getUserDetails(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
