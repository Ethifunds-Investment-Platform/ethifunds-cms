import { variables } from "@/constants";
import axios from "@/lib/axios";
import { EthivestProductSummary } from "@/types/dividend.types";

export async function production(): Promise<EthivestProductSummary[]> {
	const response = await axios.get(`/ethivest/dividends/summary`);
	return response.data.data;
}

export async function development(): Promise<EthivestProductSummary[]> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve([
					{
						product_id: 1,
						product_name: "Ethivest Growth Fund",
						product_status: "active",
						expected_roi: "20",
						dividend_payout_frequency: "quarterly",
						payout_rounds: 3,
						total_recipients: 15,
						total_disbursed: 2400000,
						last_roi_percent: 20,
						last_paid_at: "2026-03-10T12:00:00Z",
						first_paid_at: "2025-09-10T12:00:00Z",
					},
				]),
			1000
		);
	});
}

export default async function getEthivestSummary(): Promise<EthivestProductSummary[]> {
	if (variables.NODE_ENV === "development") return development();

	return production();
}
