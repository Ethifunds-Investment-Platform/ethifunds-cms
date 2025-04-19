import { variables } from "@/constants";
import axios from "@/lib/axios";
import { generateDigits } from "@/lib/generate-digits";

type Response = {
	notification_sent: number;
	email_notifications: number;
	in_app_notifications: number;
};

export async function production(): Promise<Response> {
	const response = await axios.post(`/notifications/metrics`);

	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					notification_sent: generateDigits(999),
					email_notifications: generateDigits(99),
					in_app_notifications: generateDigits(99),
				}),
			2000
		);
	});
}

export default async function getNotificationMetrics(): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production();
}
