import { variables } from "@/constants";
import axios from "@/lib/axios";
import { generateDigits } from "@/lib/generate-digits";
import { TopInvestment } from "@/types/investment.types";

type Response = TopInvestment[];

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
						id: 1,
						name: "blue homes",
						value: generateDigits(9999999),
						category_name: "reits",
					},
					{
						id: 2,
						name: "green estates",
						value: generateDigits(9999999),
						category_name: "ethivest",
					},
					{
						id: 3,
						name: "solar ventures",
						value: generateDigits(9999999),
						category_name: "ethicoop",
					},
					{
						id: 4,
						name: "urban living",
						value: generateDigits(9999999),
						category_name: "reits",
					},
					{
						id: 5,
						name: "eco funds",
						value: generateDigits(9999999),
						category_name: "ethivest",
					},
					{
						id: 6,
						name: "future housing",
						value: generateDigits(9999999),
						category_name: "ethicoop",
					},
					{
						id: 7,
						name: "smart investments",
						value: generateDigits(9999999),
						category_name: "reits",
					},
					{
						id: 8,
						name: "green future",
						value: generateDigits(9999999),
						category_name: "ethivest",
					},
					{
						id: 9,
						name: "sustainable growth",
						value: generateDigits(9999999),
						category_name: "ethicoop",
					},
					{
						id: 10,
						name: "urban eco",
						value: generateDigits(9999999),
						category_name: "reits",
					},
				]),
			2000
		);
	});
}

export default async function getTopInvestments(): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production();
}
