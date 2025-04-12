import { variables } from "@/constants";
import axios from "@/lib/axios";
import { generateDigits } from "@/lib/generate-digits";

type Response = {
	reits: number;
	ethivest: number;
	ethicoop: number;
};

export async function production(): Promise<Response> {
	const response = await axios.post(`/investments/allocation-metrics`);

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

export default async function getInvestmentAllocation(): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production();
}
