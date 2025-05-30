import { variables } from "@/constants";
import { savings } from "@/constants/data/savings/savings";
import axios from "@/lib/axios";
import { Savings, UpdateSavingsPayload } from "@/types/savings.types";

type Parameters = UpdateSavingsPayload;

type Response = Savings;

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.post(`/savings/${data.savings_id}/edit`, data);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(savings[0]), 2000);
	});
}

export default async function updateSavings(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
