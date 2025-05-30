import { variables } from "@/constants";
import { admins } from "@/constants/data/admins";
import axios from "@/lib/axios";
import { Admin } from "@/types/admin.types";

type Parameters = {
	user_id: string;
};

type Response = Admin;

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.get(`/${data.user_id}`);

	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					...admins[0],
				}),
			2000
		);
	});
}

export default async function getAdminDetails(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
