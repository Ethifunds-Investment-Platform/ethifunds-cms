import { variables } from "@/constants";
import axios from "@/lib/axios";
import { generateDigits } from "@/lib/generate-digits";

type Response = {
	total_users: number;
	active_users: number;
	new_users: number;
	investors: number;
	total_investments: number;
	active_investments: number;
};

export async function production(): Promise<Response> {
	const response = await axios.get(`/dashboard/metrics`);

	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					total_users: generateDigits(99999),
					active_users: generateDigits(9999),
					new_users: generateDigits(9999),
					investors: generateDigits(99999),
					total_investments: generateDigits(9999),
					active_investments: generateDigits(9999),
				}),
			2000
		);
	});
}

export default async function getDashboardMetrics(): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production();
}
