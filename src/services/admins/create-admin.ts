import { variables } from "@/constants";
import { admins } from "@/constants/data/admins";
import axios from "@/lib/axios";
import { Admin, AdminRole } from "@/types/admin.types";

type Parameters = {
	email: string;
	first_name: string;
	last_name: string;
	phone_number: string;
	password: string;
	role: AdminRole;
};

type Response = Admin;

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.post(`/admins/create`, data);

	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(admins[0]), 2000);
	});
}

export default async function createAdmin(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
