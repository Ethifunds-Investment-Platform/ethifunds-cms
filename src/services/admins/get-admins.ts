import { variables } from "@/constants";
import { PaginationQuery } from "@/types/global.types";
import axios from "@/lib/axios";
import { Admin } from "@/types/admin.types";
import { admins } from "@/constants/data/admins";

type Response = Admin[];

export async function production(): Promise<Response> {
	const response = await axios.get(`/admins`);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(admins), 2000);
	});
}

export default async function getAdmins(): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production();
}
