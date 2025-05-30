import { variables } from "@/constants";
import axios from "@/lib/axios";
import { generateDigits } from "@/lib/generate-digits";

type Response = {
	listed_investments: number;
	approved_listing: number;
	rejected_listing: number;
};

export async function production(): Promise<Response> {
	const response = await axios.get(`/listing/metrics`);

	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					listed_investments: generateDigits(99999),
					approved_listing: generateDigits(9999),
					rejected_listing: generateDigits(999),
				}),
			2000
		);
	});
}

export default async function getListingMetrics(): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production();
}
