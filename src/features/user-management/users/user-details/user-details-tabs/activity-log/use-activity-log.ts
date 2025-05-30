import useCustomNavigation from "@/hooks/use-navigation";
import getUserActivityLog from "@/services/users/get-user-activity-logs";
import { ActivityLog } from "@/types/user.types";
import * as React from "react";
import { useQuery } from "@tanstack/react-query";

export default function useActivityLog() {
	const [activityLog, setActivityLog] = React.useState<ActivityLog[]>([]);

	const { params } = useCustomNavigation();
	const user_id = params.user_id ?? "";

	const { isFetching, isError, error } = useQuery(
		["user-activity-log"],
		() => getUserActivityLog({ user_id }),
		{
			onSuccess(data) {
				console.log(data, "data");
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
