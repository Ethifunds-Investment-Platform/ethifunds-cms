import { variables } from "@/constants";
import axios from "@/lib/axios";

type Parameters = {
	quarter_id: number;
	roi_percent: number;
};

type Response = void;

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.post(`/ethicoop/quarters/disburse`, data);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(), 2000);
	});
}

export default async function processSavingsDisbursement(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
