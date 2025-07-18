import { variables } from "@/constants";
import { transactions } from "@/constants/data/transactions";

import axios from "@/lib/axios";
import { TransactCategory, Transaction } from "@/types/transaction.types";

type Parameters = {
	category?: TransactCategory;
};

type Response = Transaction[];

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.get(
		`${
			data.category ? `/transactions?category=${data.category}` : "/dashboard/transactions/recent"
		}`
	);

	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(transactions), 2000);
	});
}

export default async function getRecentTransactions(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
