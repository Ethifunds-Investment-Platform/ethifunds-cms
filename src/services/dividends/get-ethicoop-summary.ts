import { variables } from "@/constants";
import axios from "@/lib/axios";
import { EthicoopQuarterSummary } from "@/types/dividend.types";

export async function production(): Promise<EthicoopQuarterSummary[]> {
	const response = await axios.get(`/ethicoop/dividends/summary`);
	return response.data.data;
}

export async function development(): Promise<EthicoopQuarterSummary[]> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve([
					{
						quarter_id: 1,
						label: "2026 Q1",
						year: 2026,
						quarter: 1,
						roi_percent: 5,
						start_date: "2026-01-01",
						end_date: "2026-03-31",
						status: "open",
						recipients: 0,
						total_disbursed: 0,
					},
				]),
			1000
		);
	});
}

export default async function getEthicoopSummary(): Promise<EthicoopQuarterSummary[]> {
	if (variables.NODE_ENV === "development") return development();

	return production();
}
