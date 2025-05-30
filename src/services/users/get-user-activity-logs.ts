import { variables } from "@/constants";
import { activityLog } from "@/constants/data/activity-log";

import axios from "@/lib/axios";

import { ActivityLog } from "@/types/user.types";

type Parameters = {
	user_id: string;
};

type Response = ActivityLog[];

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.get(`/users/${data.user_id}/activity-logs`);

	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(activityLog), 2000);
	});
}

export default async function getUserActivityLog(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
