import { variables } from "@/constants";
import { PaginatedResponse, PaginationQuery } from "@/types/global.types";
import axios from "@/lib/axios";
import paginate from "@/lib/paginate";
import { InvestmentProduct } from "@/types/investment.types";
import { investmentProducts } from "@/constants/data/investments/investment-category-products";

type Parameters = Partial<PaginationQuery> & {};

type Response = PaginatedResponse<InvestmentProduct>;

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.get(`/investments${data.query_string}`);
	return paginate(response.data.data);
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve(
					paginate({
						current_page: 1,
						data: investmentProducts,
						first_page_url: "http://127.0.0.1:8000/api/account/transactions?page=1",
						from: 1,
						last_page: 1,
						last_page_url: "http://127.0.0.1:8000/api/account/transactions?page=1",
						next_page_url: null,
						path: "http://127.0.0.1:8000/api/account/transactions",
						per_page: 20,
						prev_page_url: null,
						to: 2,
						total: 2,
					})
				),
			2000
		);
	});
}

export default async function getInvestments(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
