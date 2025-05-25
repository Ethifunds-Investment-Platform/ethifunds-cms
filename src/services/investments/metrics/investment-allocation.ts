import { variables } from "@/constants";
import axios from "@/lib/axios";
import buildQueryString from "@/lib/build-query-string";
import { generateDigits } from "@/lib/generate-digits";

type Response = {
	reits: number;
	ethivest: number;
	ethicoop: number;
};

type Parameters = {
	year: string;
};
export async function production(data: Parameters): Promise<Response> {
	const query = buildQueryString(data);
	const response = await axios.post(`/investments/allocation-metrics?${query}`);

	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					reits: generateDigits(999),
					ethivest: generateDigits(999),
					ethicoop: generateDigits(999),
				}),
			2000
		);
	});
}

export default async function getInvestmentAllocation(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
