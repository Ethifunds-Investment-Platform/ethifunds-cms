import useCustomNavigation from "@/hooks/use-navigation";
import getAdminActivityLog from "@/services/admins/get-admin-activity-logs";
import { ActivityLog } from "@/types/user.types";
import * as React from "react";
import { useQuery } from "@tanstack/react-query";

export default function useActivityLog() {
	const [activityLog, setActivityLog] = React.useState<ActivityLog[]>([]);

	const { params } = useCustomNavigation();
	const user_id = params.user_id ?? "";

	const { isFetching, isError, error } = useQuery(
		["admin-activity-log"],
		() => getAdminActivityLog({ user_id }),
		{
			onSuccess(data) {
				setActivityLog(data);
			},
		}
	);

	return {
		isFetching,
		isError,
		error,
		activityLog,
	};
}
