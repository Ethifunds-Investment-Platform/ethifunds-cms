import { variables } from "@/constants";
import axios from "@/lib/axios";
import { generateDigits } from "@/lib/generate-digits";
import { SavingsByAmount } from "@/types/savings.types";

type Parameters = {
	savings_id?: string;
};

type Response = SavingsByAmount;

export async function production(data: Parameters): Promise<Response> {
	const query = `savings_id=${data.savings_id}`;
	const response = await axios.get(`/savings/savings-by-amount?${data.savings_id ? query : ""}`);

	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					">5000": generateDigits(999),
					">10000": generateDigits(999),
					">20000": generateDigits(999),
					">500000": generateDigits(999),
					">1000000": generateDigits(999),
					">2000000": generateDigits(999),
					">5000000": generateDigits(999),
					">10000000": generateDigits(999),
				}),
			2000
		);
	});
}

export default async function getSavingsByAmount(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
