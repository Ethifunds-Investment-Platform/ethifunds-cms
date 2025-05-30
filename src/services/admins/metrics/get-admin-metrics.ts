import { variables } from "@/constants";
import axios from "@/lib/axios";
import { generateDigits } from "@/lib/generate-digits";

type Response = {
	total_admins: number;
	active_admins: number;
	inactive_admins: number;
	suspended_admins: number;
};
export async function production(): Promise<Response> {
	const response = await axios.get(`/metrics`);

	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					total_admins: generateDigits(99999),
					active_admins: generateDigits(9999),
					inactive_admins: generateDigits(9999),
					suspended_admins: generateDigits(999),
				}),
			2000
		);
	});
}

export default async function getAdminMetric(): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production();
}
