export const NotificationTypes = [
	"SYSTEM_NOTIFICATION",
	"PROMOTIONAL_NOTIFICATION",
	"ACCOUNT_NOTIFICATION",
	"TRANSACTIONS_NOTIFICATION",
	"INVESTMENT_OFFER_NOTIFICATION",
	"INVESTMENT_TRANSACTIONS_NOTIFICATION",
] as const;

export type NotificationType = (typeof NotificationTypes)[number];

export type NotificationDataTypes = "user_savings" | "product" | "listing" | "user_investment";

export type Notification = {
	id: number;
	data: NotificationData;
	read_at: string | null;
	created_at: string;
	updated_at: string;
};

export type NotificationData = Partial<Record<NotificationDataTypes, any>> & {
	message: string;
	type: NotificationType;
};

export const NotificationAudiences = ["email", "in-app"] as const;
export type NotificationAudience = (typeof NotificationAudiences)[number];

export type CreateNotificationPayload = {
	title: string;
	description: string;
	audience: NotificationAudience;
	schedule_for: string | null;
};

//SAVINGS NOTIFICATION

export const savingsFundingSources = ["wallet", "card"] as const;
export const savingsFundingPreference = ["automatic", "manual"] as const;
export type SavingsFundingSource = (typeof savingsFundingSources)[number];
export type SavingsFundingPreference = (typeof savingsFundingPreference)[number];

export type SavingsNotification = {
	id: number;
	user_id: number;
	saving_type: string;
	ethicoop_cycle_id: number;
	contribution_amount: string;
	contribution_date: string;
	funding_source: SavingsFundingSource;
	funding_preference: SavingsFundingPreference;
	status: string;
	has_contributed: boolean;
	created_at: string;
	updated_at: string;
	total_contribution: string;
	ethicoop_cycle: SavingsCycle;
};

export type SavingsCycle = {
	id: number;
	title: string;
	description: string;
	start_date: string;
	end_date: string;
	status: string;
	created_by: number;
	cycle_type: string;
	roi: string;
	min_amount: string;
	max_amount: string;
	interest_type: string;
	interest_frequency: string;
	interest_duration: number;
	created_at: string;
	updated_at: string;
};

export type SavingsTransactionType = "credit" | "debit" | "transfer";

export type SavingsTransactionStatus = "success" | "failed" | "pending";

export type SavingsTransaction = {
	id: number;
	account_id: string;
	transaction_type: SavingsTransactionType;
	transaction_reference: string;
	description: string;
	amount: string;
	status: SavingsTransactionStatus;
	account_balance_before: string;
	account_balance_after: string;
	transaction_date: string;
	remark: string | null;
	fee: string;
	created_at: string;
	updated_at: string;
};

// INVESTMENT NOTIFICATION

export type SaleOption = "ethifunds" | "marketplace";

export type InvestmentCategoryNotification = {
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

export type InvestmentProductNotification = {
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
	status: string;
	created_at: string;
	updated_at: string;
	custodian: InvestmentProductCustodian;
	category: InvestmentCategoryNotification;
	product_label: InvestmentProductLabel;
	product_section: InvestmentProductLabel;
	product_memo: string;
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

// MY INVESTMENT PRODUCT NOTIFICATION

export type MyInvestmentProductNotification = {
	id: number;
	name: string;
	product_custodian_id: number | null;
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
	unit_start_price: null | string;
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
	status: string;
	created_at: string;
	updated_at: string;
	custodian: MyInvestmentProductCustodian | null;
};

// MY INVESTMENT MARKETPLACE NOTIFICATION

export type MyInvestmentMarketplaceNotification = {
	id: number;
	product_id: number;
	seller_product_id: number;
	buyer_product_id: null;
	units: number;
	final_price_per_unit: string;
	asking_price_per_unit: string;
	counter_price_per_unit: string;
	total_price: string;
	offer: {
		units: number;
		offer_price: number;
		requested_at: string;
	};
	sale_option: SaleOption;
	status: string;
	created_at: string;
	updated_at: string;
	product: MyInvestmentProductNotification;
};

export type MyInvestmentProductCustodian = {
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

// MY ACTIVE INVESTMENT NOTIFICATIONS
export type MyInvestmentTransactionType = "credit" | "debit" | "transfer";

export type MyInvestmentTransactionStatus = "success" | "failed" | "pending";

export type MyActiveInvestmentNotifications = {
	category: InvestmentCategoryNotification;
	investments: ActiveInvestmentInvestmentsNotification[];
	sum: number;
	recent_transactions: MyInvestmentTransactions[];
};

export type ActiveInvestmentInvestmentsNotification = {
	id: number;
	user_id: number;
	product_id: number;
	investment_type: string;
	status: string;
	total_invested: string;
	units_purchased: number;
	units_sold: number;
	start_at: string;
	end_at: string | null;
	matured_at: string | null;
	canceled_at: string | null;
	interest_accrued: string;
	total_roi: string;
	next_payout_date: string | null;
	payout_frequency: string | null;
	last_payout_amount: string | null;
	profit_withdrawn: string;
	withdrawable_balance: string;
	investment_growth: number;
	transaction_reference: string | null;
	investment_plan_details: string | null;
	created_at: string;
	updated_at: string;
};

export type MyInvestmentProduct = {
	id: number;
	name: string;
	product_custodian_id: number | null;
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
	unit_start_price: null | string;
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
	status: string;
	created_at: string;
	updated_at: string;
	custodian: MyInvestmentProductCustodian | null;
};

export type MyInvestmentTransactions = {
	id: number;
	account_id: string;
	transaction_type: MyInvestmentTransactionType;
	transaction_reference: string;
	description: string;
	amount: string;
	status: MyInvestmentTransactionStatus;
	account_balance_before: string;
	account_balance_after: string;
	transaction_date: string;
	remark: string | null;
	fee: string;
	created_at: string;
	updated_at: string;
};

export type MyInvestmentMarketplace = {
	id: number;
	product_id: number;
	seller_product_id: number;
	buyer_product_id: null;
	units: number;
	final_price_per_unit: string;
	asking_price_per_unit: string;
	counter_price_per_unit: string;
	total_price: string;
	offer: {
		units: number;
		offer_price: number;
		requested_at: string;
	};
	sale_option: SaleOption;
	status: string;
	created_at: string;
	updated_at: string;
	product: MyInvestmentProduct;
};

