export type ListingTrends = {
	username: string;
	listed_units: number;
	valued_at: number;
};

export type ListingByUnits = {
	">50": number;
	">100": number;
	">250": number;
	">350": number;
	">500": number;
	">1000": number;
};

export type SaleOption = "ethifunds" | "marketplace";
export type Status = "pending" | "approved" | "rejected";

export type Listing = {
	id: number;
	product_id: number;
	product: ListingProduct;
	seller_info: SellerInfo;
	buyer_product_id: null;
	units: number;
	final_price_per_unit: string;
	asking_price_per_unit: string;
	counter_price_per_unit: string;
	total_price: string;
	sale_option: SaleOption;
	status: Status;
	created_at: string;
	updated_at: string;
};

export type SellerInfo = {
	id: number;
	name: string;
	email: string;
	phone: string;
	address: string;
	created_at: string;
	updated_at: string;
};

export type ListingProduct = {
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
};

export type ApproveRejectPayload = {
	status: "approved" | "rejected";
	listing_id: string;
	reason?: string; // this for rejected only
	flag_listing: boolean; // this is for rejected only
};

export type CounterOfferPayload = {
	listing_id: number;
	counter_price_per_unit: string;
};
