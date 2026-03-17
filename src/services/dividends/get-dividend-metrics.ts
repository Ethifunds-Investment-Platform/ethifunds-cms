import { variables } from "@/constants";
import axios from "@/lib/axios";
import { DividendMetrics } from "@/types/dividend.types";

export async function production(): Promise<DividendMetrics> {
	const response = await axios.get(`/ethivest/dividends/metrics`);
	return response.data.data;
}

export async function development(): Promise<DividendMetrics> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					ethivest: {
						total_disbursed: 5200000,
						total_records: 45,
						products_paid: 6,
						last_payout_at: "2026-03-10T12:00:00Z",
					},
					ethicoop: {
						total_disbursed: 3100000,
						total_records: 120,
						quarters_paid: 4,
						last_payout_at: "2026-03-01T12:00:00Z",
					},
					combined: {
						total_disbursed: 8300000,
						total_records: 165,
					},
				}),
			1000
		);
	});
}

export default async function getDividendMetrics(): Promise<DividendMetrics> {
	if (variables.NODE_ENV === "development") return development();

	return production();
}
