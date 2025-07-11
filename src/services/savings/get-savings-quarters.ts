import { variables } from "@/constants";

import { savingsQuarters } from "@/constants/data/savings/savings-quarters";
import axios from "@/lib/axios";
import { SavingsQuarter } from "@/types/savings.types";

type Response = SavingsQuarter[];

export async function production(): Promise<Response> {
	const response = await axios.get(`/ethicoop/quarters`);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(savingsQuarters), 2000);
	});
}

export default async function getSavingsQuarters(): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production();
}
