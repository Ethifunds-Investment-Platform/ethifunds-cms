import { variables } from "@/constants";
import axios from "@/lib/axios";
import { generateDigits } from "@/lib/generate-digits";
import { ListingByUnits } from "@/types/listing.types";

type Response = ListingByUnits;

export async function production(): Promise<Response> {
	const response = await axios.post(` /investments/top-investments`);

	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					">50": generateDigits(999),
					">100": generateDigits(999),
					">250": generateDigits(999),
					">350": generateDigits(999),
					">500": generateDigits(999),
					">1000": generateDigits(999),
				}),
			2000
		);
	});
}

export default async function getListingByUnits(): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production();
}
