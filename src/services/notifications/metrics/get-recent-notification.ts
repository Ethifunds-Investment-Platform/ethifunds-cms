import { variables } from "@/constants";
import { notifications } from "@/constants/notifications/notifications";
import axios from "@/lib/axios";
import { Notification } from "@/types/notification.types";

type Response = Notification[];

export async function production(): Promise<Response> {
	const response = await axios.get(`/notifications/recent-investments`);

	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(notifications), 2000);
	});
}

export default async function getRecentNotifications(): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production();
}
