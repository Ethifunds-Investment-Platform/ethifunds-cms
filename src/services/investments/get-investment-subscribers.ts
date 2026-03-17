import { variables } from "@/constants";
import axios from "@/lib/axios";
import { InvestmentSubscriber } from "@/types/investment.types";

type Parameters = {
	id: string;
};

type Response = InvestmentSubscriber[];

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.get(`/investments/${data.id}/subscribers`);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve([]), 2000);
	});
}

export default async function getInvestmentSubscribers(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
