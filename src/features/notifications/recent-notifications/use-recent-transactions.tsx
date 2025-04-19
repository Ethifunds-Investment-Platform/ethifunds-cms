import { useQuery } from "react-query";
import getRecentNotifications from "@/services/notifications/metrics/get-recent-notification";

export default function useRecentNotifications() {
	const query = useQuery(["recent-notifications"], () => getRecentNotifications());

	return {
		...query,
	};
}
