import { variables } from "@/constants";
import { savings } from "@/constants/data/savings/savings";
import { savingsTransactions } from "@/constants/data/savings/savings-transactions";
import axios from "@/lib/axios";
import { Savings, SavingsTransaction } from "@/types/savings.types";

type Parameters = {
	savings_id: string;
};

type Response = {
	savings: Savings;
	recent_transactions: SavingsTransaction[];
};

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.get(`/savings/${data.savings_id}`);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					savings: savings[0],
					recent_transactions: savingsTransactions,
				}),
			2000
		);
	});
}

export default async function getSavingsDetails(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
