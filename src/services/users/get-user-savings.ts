import { variables } from "@/constants";
import axios from "@/lib/axios";

export type UserSaving = {
	id: number;
	cycle_title: string;
	contribution_amount: string;
	contributions_made: number;
	status: string;
	created_at: string;
	updated_at: string;
};

type Parameters = {
	user_id: string;
};

type Response = UserSaving[];

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.get(`/users/${data.user_id}/savings`);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve([]), 2000);
	});
}

export default async function getUserSavings(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
