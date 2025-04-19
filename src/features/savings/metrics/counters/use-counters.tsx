import getSavingsMetrics from "@/services/savings/metrics/savings-metrics";

import { useQuery } from "react-query";

export default function useCounter() {
	const query = useQuery(["savings-metrics"], () => getSavingsMetrics());

	return {
		...query,
	};
}
