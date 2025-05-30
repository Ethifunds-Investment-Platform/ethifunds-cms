import { variables } from "@/constants";
import axios from "@/lib/axios";

type Response = void;
type Parameters = {
	transaction_id: string;
};

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.post(`/transactions/resend-otp`, data);

	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(), 2000);
	});
}

export default async function requestTransactionApproval(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
