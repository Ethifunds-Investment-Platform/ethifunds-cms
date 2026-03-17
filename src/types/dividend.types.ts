export type EthivestDividendRecord = {
	id: number;
	user_id: number;
	product_id: number;
	investment_amount: string;
	roi_percent: string;
	dividend_amount: string;
	paid_at: string;
	created_at: string;
	updated_at: string;
	user: {
		id: number;
		email: string;
		user_profile: {
			id: number;
			user_id: number;
			first_name: string;
			last_name: string;
		} | null;
	} | null;
	product: {
		id: number;
		name: string;
		status: string;
	} | null;
};

export type EthivestProductSummary = {
	product_id: number;
	product_name: string;
	product_status: string;
	expected_roi: string;
	dividend_payout_frequency: string;
	payout_rounds: number;
	total_recipients: number;
	total_disbursed: number;
	last_roi_percent: number;
	last_paid_at: string | null;
	first_paid_at: string | null;
};

export type EthivestProductDividendRound = {
	payout_date: string;
	roi_percent: string;
	recipients: number;
	total_amount: string;
	total_capital: string;
	paid_at: string;
};

export type EthivestProductDividendDetail = {
	product: {
		id: number;
		name: string;
		status: string;
		expected_roi: string;
		dividend_payout_frequency: string;
	};
	rounds: EthivestProductDividendRound[];
	recipients: EthivestDividendRecord[] | null;
	totals: {
		total_disbursed: number;
		total_rounds: number;
		unique_investors: number;
	};
};

export type EthicoopDividendRecord = {
	id: number;
	user_id: number;
	quarter_id: number;
	capital_start: string;
	capital_end: string;
	roi_percent: string;
	dividend_amount: string;
	paid_at: string;
	created_at: string;
	updated_at: string;
	user: {
		id: number;
		email: string;
		user_profile: {
			id: number;
			user_id: number;
			first_name: string;
			last_name: string;
		} | null;
	} | null;
	quarter: {
		id: number;
		year: number;
		quarter: number;
		roi_percent: string;
		start_date: string;
		end_date: string;
		status: string;
	} | null;
};

export type EthicoopQuarterSummary = {
	quarter_id: number;
	label: string;
	year: number;
	quarter: number;
	roi_percent: number;
	start_date: string | null;
	end_date: string | null;
	status: string;
	recipients: number;
	total_disbursed: number;
};

export type DividendMetrics = {
	ethivest: {
		total_disbursed: number;
		total_records: number;
		products_paid: number;
		last_payout_at: string | null;
	};
	ethicoop: {
		total_disbursed: number;
		total_records: number;
		quarters_paid: number;
		last_payout_at: string | null;
	};
	combined: {
		total_disbursed: number;
		total_records: number;
	};
};
