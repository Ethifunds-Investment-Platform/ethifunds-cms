export type TopInvestment = {
	id: number;
	name: string;
	value: number;
	category_name: string;
};

export type InvestmentByUnits = {
	">50": number;
	">100": number;
	">250": number;
	">350": number;
	">500": number;
	">1000": number;
};

export const InvestmentsStatus = ["active", "inactive", "draft"] as const;

export type InvestmentStatus = (typeof InvestmentsStatus)[number];

export type InvestmentProduct = {
	id: number;
	name: string;
	product_custodian_id: number;
	product_category_id: number;
	display_image: string;
	account_id: number;
	type: string;
	description: string;
	minimum_investment: string;
	maximum_investment: string;
	expected_roi: number;
	tenor_unit: string;
	tenor_value: number;
	unit_price: string;
	total_units: number;
	units_sold: number;
	contribution_frequency: string;
	contribution_amount: string;
	profit_sharing_ratio: number;
	dividend_payout_frequency: string;
	funding_goal: string;
	amount_raised: string;
	funding_deadline: string;
	bond_issuer: null;
	bond_interest_rate: null;
	hybrid_components: [];
	status: InvestmentStatus;
	created_at: string;
	updated_at: string;
	custodian: InvestmentProductCustodian;
	category: InvestmentCategory;
	product_label: InvestmentProductLabel;
	product_section: InvestmentProductLabel;
	product_memo: string;
};

export type InvestmentCategory = {
	id: number;
	name: string;
	display_image: string;
	description: string;
	display_title: string;
	type: string;
	status: string;
	created_at: string | null;
	updated_at: string | null;
};

export type InvestmentProductCustodian = {
	id: number;
	name: string;
	email: string;
	phone: string;
	address: string;
	description: string;
	status: string;
	created_at: string;
	updated_at: string;
};

export type InvestmentProductLabel = {
	active: 1;
	created_at: null;
	description: string;
	id: 2;
	name: string;
	product_id: null;
	updated_at: null;
};

// New Investment
export type NewInvestmentPayload = {
	name: string;
	product_custodian_id: number;
	product_category_id: number;
	display_image: File;
	account_id: number;
	product_label: string;
	product_section: string;
	description: string;
	tenor_unit: string;
	tenor_value: number;
	total_units: number;
	expected_roi: number;
	funding_deadline?: string;
	funding_goal: string;
	unit_price: string;
	status: InvestmentStatus;
	product_memo: File;
};

export type UpdateInvestmentPayload = {
	name: string;
	product_category_id: number;
	display_image?: File;
	product_label: string;
	product_section: string;
	description: string;
	tenor_unit: string;
	tenor_value: number;
	total_units: number;
	expected_roi: number;
	funding_deadline?: string;
	funding_goal: string;
	unit_price: string;
	status: InvestmentStatus;
	product_memo?: File;
};
