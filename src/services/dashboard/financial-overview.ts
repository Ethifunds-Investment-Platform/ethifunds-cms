import { variables } from "@/constants";
import axios from "@/lib/axios";
import { FinancialOverview } from "@/types/dashboard.types";

type Parameters = {
	period?: string;
};

export async function production(data?: Parameters): Promise<FinancialOverview> {
	const params = data?.period ? `?period=${data.period}` : "";
	const response = await axios.get(`/dashboard/financial-overview${params}`);
	return response.data.data;
}

export async function development(): Promise<FinancialOverview> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					assets_under_management: { total: 0, investments: 0, savings: 0 },
					wallet_balances: {},
					transaction_volume: { total_credits: 0, total_debits: 0, net_flow: 0, count: 0 },
					dividends: { ethivest: 0, ethicoop: 0, total: 0 },
					investment_performance: { total_invested: 0, total_profit_withdrawn: 0, total_interest_accrued: 0 },
				}),
			2000
		);
	});
}

export default async function getFinancialOverview(data?: Parameters): Promise<FinancialOverview> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
