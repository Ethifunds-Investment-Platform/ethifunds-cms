import getDashboardMetrics from "@/services/dashboard/metrics";

import { useQuery } from "@tanstack/react-query";

export default function useCounter() {
	const query = useQuery(["dashboard-query"], () => getDashboardMetrics());

	return {
		...query,
	};
}
