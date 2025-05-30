import { variables } from "@/constants";
import { transactions } from "@/constants/data/transactions";
import axios from "@/lib/axios";
import { Transaction } from "@/types/transaction.types";



type Response = Transaction[];

export async function production(): Promise<Response> {
	const response = await axios.get(`/transactions/pending`);

	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(transactions), 2000);
	});
}

export default async function getPendingTransactions(): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production();
}
