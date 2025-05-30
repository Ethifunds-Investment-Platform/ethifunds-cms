import getNotificationMetrics from "@/services/notifications/metrics/notification-metrics";

import { useQuery } from "@tanstack/react-query";

export default function useCounter() {
	const query = useQuery(["notifications-metrics"], () => getNotificationMetrics());

	return {
		...query,
	};
}
