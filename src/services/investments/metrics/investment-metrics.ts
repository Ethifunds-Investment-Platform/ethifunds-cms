import { variables } from "@/constants";
import axios from "@/lib/axios";
import { generateDigits } from "@/lib/generate-digits";

type Parameters = {
	category_id?: string;
};

type Response = {
	total_investment: number;
	active_investment: number;
	inactive_investment: number;
	completed_investment: number;
	total_investors: number;
};
export async function production(data: Parameters): Promise<Response> {
	const query = `category_id=${data.category_id}`;
	const response = await axios.post(`/investments/metrics?${data.category_id ? query : ""}`);

	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					total_investment: generateDigits(99999),
					active_investment: generateDigits(9999),
					inactive_investment: generateDigits(999),
					completed_investment: generateDigits(999),
					total_investors: generateDigits(999),
				}),
			2000
		);
	});
}

export default async function getInvestmentMetrics(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
