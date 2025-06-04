import { variables } from "@/constants";
import { notifications } from "@/constants/notifications/notifications";
import axios from "@/lib/axios";
import { Notification } from "@/types/notification.types";
import { PaginatedResponse } from "@/types/global.types";
import paginate from "@/lib/paginate";

type Response = PaginatedResponse<Notification>;

export async function production(): Promise<Response> {
	const response = await axios.get(`/notifications/recent-notifications`);

	return paginate(response.data.data);
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve(
					paginate({
						data: notifications,
						total: notifications.length,
						current_page: 1,
						first_page_url: "",
						from: 1,
						last_page: 1,
						last_page_url: "",
						next_page_url: "",
						per_page: 10,
						prev_page_url: "",
						to: 10,
						path: "",
					})
				),
			2000
		);
	});
}

export default async function getRecentNotifications(): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production();
}
