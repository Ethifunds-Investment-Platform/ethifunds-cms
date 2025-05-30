import { variables } from "@/constants";
import { listings } from "@/constants/data/listings";
import axios from "@/lib/axios";
import { Listing, SaleOption } from "@/types/listing.types";

type Parameters = {
	sale_option?: SaleOption;
};

type Response = Listing[];

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.get(`/listing/recent-listing?sale_option=${data.sale_option??""}`);

	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(listings), 2000);
	});
}

export default async function getRecentListing(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
