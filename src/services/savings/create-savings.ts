import { variables } from "@/constants";
import { savings } from "@/constants/data/savings/savings";
import axios from "@/lib/axios";
import { CreateSavingsPayload, Savings } from "@/types/savings.types";

type Parameters = CreateSavingsPayload;

type Response = Savings;

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.post(`/savings/create`, data);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(savings[0]), 2000);
	});
}

export default async function createSavings(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
