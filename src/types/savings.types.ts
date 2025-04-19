export type SavingsByAmount = {
	">5000": number;
	">10000": number;
	">20000": number;
	">500000": number;
	">1000000": number;
	">2000000": number;
	">5000000": number;
	">10000000": number;
};

export type Savings = {
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
	total_contributors: number;
	amount_raised: number;
	target_amount: number;
	interest_type: string;
	interest_frequency: string;
	interest_duration: number;
	created_at: string;
	updated_at: string;
};

export type SavingsTransaction = {
	id: number;
	account_id: string;
	username: string;
	amount: string;
	status: "success" | "failed" | "pending";
	target_amount: string;
	amount_paid: string;
	transaction_reference: string;
	transaction_date: string;
	created_at: string;
	updated_at: string;
};

export type SavingsContributor = {
	id: number;
	user_id: number;
	username: string;
	target_amount: string;
	amount_raised: string;
	savings_id: number;
	created_at: string;
	updated_at: string;
};



export type CreateSavingsPayload = {
	start_date: string;
	created_by: number;
	roi: string;
	min_amount: string;
	max_amount: string;
};

export type UpdateSavingsPayload = {
	start_date: string;
	savings_id: number;
	roi: string;
	min_amount: string;
	max_amount: string;
};