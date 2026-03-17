import { variables } from "@/constants";
import axios from "@/lib/axios";

export type UserInvestment = {
	id: number;
	product_name: string;
	category_name: string;
	total_invested: string;
	units_purchased: number;
	total_roi: string;
	status: string;
	start_at: string | null;
	end_at: string | null;
	created_at: string;
};

type Parameters = {
	user_id: string;
};

type Response = UserInvestment[];

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.get(`/users/${data.user_id}/investments`);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve([]), 2000);
	});
}

export default async function getUserInvestments(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
