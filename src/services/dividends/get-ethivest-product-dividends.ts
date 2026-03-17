import { variables } from "@/constants";
import axios from "@/lib/axios";
import { EthivestProductDividendDetail } from "@/types/dividend.types";

type Parameters = {
	product_id: number;
	round_date?: string;
};

export async function production(data: Parameters): Promise<EthivestProductDividendDetail> {
	const params = data.round_date ? `?round_date=${data.round_date}` : "";
	const response = await axios.get(`/ethivest/products/${data.product_id}/dividends${params}`);
	return response.data.data;
}

export async function development(): Promise<EthivestProductDividendDetail> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					product: {
						id: 1,
						name: "Ethivest Growth Fund",
						status: "active",
						expected_roi: "20",
						dividend_payout_frequency: "quarterly",
					},
					rounds: [],
					recipients: null,
					totals: {
						total_disbursed: 0,
						total_rounds: 0,
						unique_investors: 0,
					},
				}),
			1000
		);
	});
}

export default async function getEthivestProductDividends(
	data: Parameters
): Promise<EthivestProductDividendDetail> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
