import getDashboardMetrics from "@/services/dashboard/metrics";
import useCustomNavigation from "@/hooks/use-navigation";

import { useQuery } from "@tanstack/react-query";

export default function useCounter() {
	const { queryParams } = useCustomNavigation();
	const period = queryParams.get("period") ?? undefined;

	const query = useQuery(["dashboard-query", period], () => getDashboardMetrics({ period }));

	return {
		...query,
	};
}
