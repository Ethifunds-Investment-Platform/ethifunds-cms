import { variables } from "@/constants";
import axios from "@/lib/axios";
import { Admin } from "@/types/admin.types";
import { admins } from "@/constants/data/admins";
import { PaginatedResponse } from "@/types/global.types";
import paginate from "@/lib/paginate";

type Response = PaginatedResponse<Admin>;

export async function production(): Promise<Response> {
	const response = await axios.get(`/`);
	return paginate(response.data.data);
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve(
					paginate({
						current_page: 1,
						data: admins,
						first_page_url: "http://127.0.0.1:8000/api/admins?page=1",
						from: 1,
						last_page: 1,
						last_page_url: "http://127.0.0.1:8000/api/admins?page=1",
						next_page_url: null,
						path: "http://127.0.0.1:8000/api/admins",
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

export default async function getAdmins(): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production();
}
