import { variables } from "@/constants";
import axios from "@/lib/axios";
import { generateDigits } from "@/lib/generate-digits";
import { ListingTrends } from "@/types/listing.types";

type Response = ListingTrends[];

export async function production(): Promise<Response> {
	const response = await axios.post(` /investments/top-investments`);

	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve([
					{
						username: "john",
						listed_units: generateDigits(999),
						valued_at: generateDigits(9999999),
					},
					{
						username: "jane",
						listed_units: generateDigits(999),
						valued_at: generateDigits(9999999),
					},
					{
						username: "michael",
						listed_units: generateDigits(999),
						valued_at: generateDigits(9999999),
					},
					{
						username: "emily",
						listed_units: generateDigits(999),
						valued_at: generateDigits(9999999),
					},
					{
						username: "david",
						listed_units: generateDigits(999),
						valued_at: generateDigits(9999999),
					},
					{
						username: "sarah",
						listed_units: generateDigits(999),
						valued_at: generateDigits(9999999),
					},
					{
						username: "chris",
						listed_units: generateDigits(999),
						valued_at: generateDigits(9999999),
					},
					{
						username: "laura",
						listed_units: generateDigits(999),
						valued_at: generateDigits(9999999),
					},
					{
						username: "sustainable",
						listed_units: generateDigits(999),
						valued_at: generateDigits(9999999),
					},
					{
						username: "urban",
						listed_units: generateDigits(999),
						valued_at: generateDigits(9999999),
					},
				]),
			2000
		);
	});
}

export default async function getListingTrends(): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production();
}
