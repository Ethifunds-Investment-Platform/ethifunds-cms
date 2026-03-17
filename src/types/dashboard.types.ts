export type FinancialOverview = {
	assets_under_management: {
		total: number;
		investments: number;
		savings: number;
	};
	wallet_balances: Record<string, number>;
	transaction_volume: {
		total_credits: number;
		total_debits: number;
		net_flow: number;
		count: number;
	};
	dividends: {
		ethivest: number;
		ethicoop: number;
		total: number;
	};
	investment_performance: {
		total_invested: number;
		total_profit_withdrawn: number;
		total_interest_accrued: number;
	};
};
