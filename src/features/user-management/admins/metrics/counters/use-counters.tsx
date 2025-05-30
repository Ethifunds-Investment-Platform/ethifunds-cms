import getAdminMetrics from "@/services/admins/metrics/get-admin-metrics";

import { useQuery } from "@tanstack/react-query";

export default function useCounter() {
	const query = useQuery(["admins-metrics"], () => getAdminMetrics());

	return {
		...query,
	};
}
