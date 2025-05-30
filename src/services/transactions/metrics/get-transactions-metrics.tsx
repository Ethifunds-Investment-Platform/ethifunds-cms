import { variables } from "@/constants";
import axios from "@/lib/axios";
import { generateDigits } from "@/lib/generate-digits";

type Response = {
	total_transactions: number;
	total_transactions_amount: number;
	total_withdrawal: number;
	total_withdrawal_amount: number;
	total_deposit: number;
	total_deposit_amount: number;
	successful_transactions: number;
	successful_transactions_amount: number;
	failed_transactions: number;
	failed_transactions_amount: number;
};

export async function production(): Promise<Response> {
	const response = await axios.get(`/transactions/metrics`);

	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					total_transactions: generateDigits(99999),
					total_transactions_amount: generateDigits(9999999),
					total_withdrawal: generateDigits(9999),
					total_withdrawal_amount: generateDigits(999999),
					total_deposit: generateDigits(9999),
					total_deposit_amount: generateDigits(999999),
					successful_transactions: generateDigits(9999),
					successful_transactions_amount: generateDigits(999999),
					failed_transactions: generateDigits(999),
					failed_transactions_amount: generateDigits(99999),
				}),
			2000
		);
	});
}

export default async function getTransactionsMetrics(): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production();
}
