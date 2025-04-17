import { variables } from "@/constants";
import { investmentProducts } from "@/constants/data/investments/investment-category-products";
import axios from "@/lib/axios";
import { InvestmentProduct, InvestmentStatus, ProductSection } from "@/types/investment.types";

type Parameters = {
	name: string;
	product_custodian_id: number;
	product_category_id: number;
	display_image: File;
	account_id: number;
	product_label: string;
	product_section: ProductSection;
	description: string;
	tenor_unit: string;
	tenor_value: number;
	total_units: number;
	expected_roi: number;
	funding_deadline: string;
	funding_goal: string;
	unit_price: string;
	status: InvestmentStatus;
	product_memo: File;
};

type Response = InvestmentProduct;

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.patch(`/investments/create`, data);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(investmentProducts[0]), 2000);
	});
}

export default async function createInvestment(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
