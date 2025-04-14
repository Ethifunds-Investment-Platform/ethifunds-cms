import getTransactionsMetrics from "@/services/transactions/metrics/get-transactions-metrics";

import { useQuery } from "react-query";

export default function useCounter() {
	const query = useQuery(["transactions-metrics"], () => getTransactionsMetrics());

	return {
		...query,
	};
}
