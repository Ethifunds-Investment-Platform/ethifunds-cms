import { variables } from "@/constants";
import axios from "@/lib/axios";
import { generateDigits } from "@/lib/generate-digits";

type Parameters = {
	year?: string;
};

type Response = {
	january: number;
	february: number;
	march: number;
	april: number;
	june: number;
	july: number;
	august: number;
	september: number;
	october: number;
	november: number;
	december: number;
};
export async function production(data: Parameters): Promise<Response> {
	const response = await axios.get(`/users/users-by-month?year=${data.year}`);

	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					january: generateDigits(9999),
					february: generateDigits(9999),
					march: generateDigits(9999),
					april: generateDigits(9999),
					june: generateDigits(9999),
					july: generateDigits(9999),
					august: generateDigits(9999),
					september: generateDigits(9999),
					october: generateDigits(9999),
					november: generateDigits(9999),
					december: generateDigits(9999),
				}),
			2000
		);
	});
}

export default async function getUsersByMonth(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
