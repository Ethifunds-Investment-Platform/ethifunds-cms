import { variables } from "@/constants";
import axios from "@/lib/axios";

import { Listing } from "@/types/listing.types";
import { listings } from "@/constants/data/listings";

type Parameters = {
	listing_id: number;
	counter_price_per_unit: string;
};

type Response = Listing;

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.post(`/listings/counter-offer`, data);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(listings[0]), 2000);
	});
}

export default async function counterOffer(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
