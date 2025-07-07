import { variables } from "@/constants";
import axios from "@/lib/axios";
import { generateDigits } from "@/lib/generate-digits";
import { UserAccountBalances } from "@/types/user.types";

type Parameters = {
	user_id: string;
};

type Response = UserAccountBalances;

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.get(`/users/${data.user_id}/balances`);

	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					wallet_balance: generateDigits(9999),
					vault_balance: generateDigits(9999),
					investment_balance: generateDigits(9999),
					// ethivest_balance: generateDigits(9999),
					// ethicoop_balance: generateDigits(9999),
					// reits_balance: generateDigits(99999),
				}),
			2000
		);
	});
}

export default async function getUserAccountBalances(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
