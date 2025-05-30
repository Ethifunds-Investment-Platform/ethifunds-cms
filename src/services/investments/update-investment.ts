import { variables } from "@/constants";
import { investmentProducts } from "@/constants/data/investments/investment-category-products";
import axios from "@/lib/axios";
import { InvestmentProduct } from "@/types/investment.types";

type Parameters = FormData & {
	investment_id: string;
};

type Response = InvestmentProduct;

export async function production({ investment_id, ...data }: Parameters): Promise<Response> {
	const response = await axios.post(`/investments/${investment_id}/edit`, data, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(investmentProducts[0]), 2000);
	});
}

export default async function updateInvestment(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
