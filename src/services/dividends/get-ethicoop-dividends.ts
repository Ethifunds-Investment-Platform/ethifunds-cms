import { variables } from "@/constants";
import { PaginatedResponse, PaginationQuery } from "@/types/global.types";
import axios from "@/lib/axios";
import paginate from "@/lib/paginate";
import { EthicoopDividendRecord } from "@/types/dividend.types";

type Parameters = Partial<PaginationQuery> & {};

type Response = PaginatedResponse<EthicoopDividendRecord>;

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.get(`/ethicoop/dividends${data.query_string}`);
	return paginate(response.data.data);
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve(
					paginate({
						current_page: 1,
						data: [],
						first_page_url: "",
						from: 0,
						last_page: 1,
						last_page_url: "",
						next_page_url: null,
						path: "",
						per_page: 20,
						prev_page_url: null,
						to: 0,
						total: 0,
					})
				),
			1000
		);
	});
}

export default async function getEthicoopDividends(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
