import { variables } from "@/constants";
import axios from "@/lib/axios";
import { generateDigits } from "@/lib/generate-digits";

type Response = {
	total_users: number;
	active_users: number;
	inactive_users: number;
	suspended_users: number;
	investors: number;
};
export async function production(): Promise<Response> {
	const response = await axios.post(`/users/metrics`);

	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					total_users: generateDigits(99999),
					active_users: generateDigits(9999),
					inactive_users: generateDigits(9999),
					suspended_users: generateDigits(999),
					investors: generateDigits(9999),
				}),
			2000
		);
	});
}

export default async function getUserMetrics(): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production();
}
