import { variables } from "@/constants";
import { savingsContributors } from "@/constants/data/savings/savings-contributors";
import axios from "@/lib/axios";
import { SavingsContributor } from "@/types/savings.types";

type Parameters = {
	savings_id: string;
};

type Response = SavingsContributor[];

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.get(`/savings/${data.savings_id}/contributors`);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(savingsContributors), 2000);
	});
}

export default async function getCycleContributors(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
