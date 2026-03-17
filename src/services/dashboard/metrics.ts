import { variables } from "@/constants";
import axios from "@/lib/axios";
import { generateDigits } from "@/lib/generate-digits";

type Parameters = {
	period?: string;
};

export type DashboardMetricsResponse = {
	total_users: number;
	active_users: number;
	new_users: number;
	investors: number;
	total_investments: number;
	active_investments: number;
	trends?: Record<string, number>;
};

export async function production(data?: Parameters): Promise<DashboardMetricsResponse> {
	const params = data?.period ? `?period=${data.period}` : "";
	const response = await axios.get(`/dashboard/metrics${params}`);

	return response.data.data;
}

export async function development(): Promise<DashboardMetricsResponse> {
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
					trends: {
						total_users: 12.5,
						active_users: -3.2,
						new_users: 25.0,
						investors: 8.1,
						total_investments: 5.4,
						active_investments: -1.7,
					},
				}),
			2000
		);
	});
}

export default async function getDashboardMetrics(data?: Parameters): Promise<DashboardMetricsResponse> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
