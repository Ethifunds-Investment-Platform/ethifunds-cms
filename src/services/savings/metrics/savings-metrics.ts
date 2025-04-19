import { variables } from "@/constants";
import axios from "@/lib/axios";
import { generateDigits } from "@/lib/generate-digits";

type Response = {
	total_contributors: number;
	amount_raised: number;
	completed_cycles: number;
	amount_disbursed: number;
};
export async function production(): Promise<Response> {
	const response = await axios.post(`/savings/metrics`);

	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					total_contributors: generateDigits(9999),
					amount_raised: generateDigits(999999),
					completed_cycles: generateDigits(99),
					amount_disbursed: generateDigits(99999),
				}),
			2000
		);
	});
}

export default async function getSavingsMetrics(): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production();
}
