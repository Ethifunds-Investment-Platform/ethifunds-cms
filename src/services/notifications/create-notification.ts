import { variables } from "@/constants";
import { notifications } from "@/constants/notifications/notifications";
import axios from "@/lib/axios";
import { Notification, NotificationAudience } from "@/types/notification.types";

type Parameters = {
	title: string;
	description: string;
	audience: NotificationAudience;
	schedule_for: string | null;
};
type Response = Notification;

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.post(`/notifications/create`, data);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(notifications[0]), 2000);
	});
}

export default async function createNotification(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
