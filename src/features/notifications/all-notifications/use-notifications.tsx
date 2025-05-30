import { useQuery } from "@tanstack/react-query";
import getRecentNotifications from "@/services/notifications/metrics/get-recent-notification";

export default function useNotifications() {
	const query = useQuery(["notifications-all"], () => getRecentNotifications());
	return {
		...query,
	};
}
