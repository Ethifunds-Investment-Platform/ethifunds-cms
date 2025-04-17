import { variables } from "@/constants";
import { investmentProducts } from "@/constants/data/investments/investment-category-products";
import axios from "@/lib/axios";
import { InvestmentProduct } from "@/types/investment.types";

type Parameters = {
	category_id?: string;
};
type Response = InvestmentProduct[];

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.post(
		`/investments/recent-investments?category_id=${data.category_id}`
	);

	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(investmentProducts), 2000);
	});
}

export default async function getRecentInvestments(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
