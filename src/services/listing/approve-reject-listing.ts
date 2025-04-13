import { variables } from "@/constants";
import axios from "@/lib/axios";

import { Listing } from "@/types/listing.types";
import { listings } from "@/constants/data/listings";

type Parameters = {
	status: "approved" | "rejected";
	listing_id: string;
	reason?: string; // this for rejected only
	flag_listing?: boolean; // this is for rejected only
};

type Response = Listing;

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.post(`/listings/approve-reject`, data);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(listings[0]), 2000);
	});
}

export default async function approveRejectListing(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
