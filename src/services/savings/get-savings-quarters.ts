import { variables } from "@/constants";

import { savingsQuarters } from "@/constants/data/savings/savings-quarters";
import axios from "@/lib/axios";
import paginate from "@/lib/paginate";
import { PaginatedResponse } from "@/types/global.types";
import { SavingsQuarter } from "@/types/savings.types";

type Response =  PaginatedResponse<SavingsQuarter>;

export async function production(): Promise<Response> {
	const response = await axios.get(`/ethicoop/quarters?limit=100`);
	return paginate(response.data.data);
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					docs: savingsQuarters,
					total: savingsQuarters.length,
					page: 1,
					limit: 10,
				} as any),
			2000
		);
	});
}

export default async function getSavingsQuarters(): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production();
}
