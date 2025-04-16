import getUsersMetrics from "@/services/users/metrics/get-users-metrics";

import { useQuery } from "react-query";

export default function useCounter() {
	const query = useQuery(["users-metrics"], () => getUsersMetrics());

	return {
		...query,
	};
}
