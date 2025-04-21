import { variables } from "@/constants";
import { admins } from "@/constants/data/admins";
import axios from "@/lib/axios";
import { Admin } from "@/types/admin.types";

type Parameters = {
	email?: string;
	username?: string;
	password: string;
};

type Response = {
	user: Admin;
	token: string;
};

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.post(`/auth/login`, data);
	const user = await axios.get("/me", {
		headers: {
			Authorization: `Bearer ${response.data.token}`,
		},
	});

	return {
		user: user.data.data,
		token: response.data.data.token,
	};
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					user: admins[0],
					token: "key12455677",
				}),
			2000
		);
	});
}

export default async function loginAccount(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
