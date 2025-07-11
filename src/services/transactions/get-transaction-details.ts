import { variables } from "@/constants";
import { transactions } from "@/constants/data/transactions";
import axios from "@/lib/axios";
import { Transaction } from "@/types/transaction.types";

type Parameters = {
	transaction_id: string;
};

type Response = Transaction;

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.get(`/transactions/${data.transaction_id}`);

	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(transactions[0]), 2000);
	});
}

export default async function getTransactionDetails(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
