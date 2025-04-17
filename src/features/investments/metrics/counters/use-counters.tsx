import useCustomNavigation from "@/hooks/use-navigation";
import getInvestmentMetrics from "@/services/investments/metrics/investment-metrics";

import { useQuery } from "react-query";

export default function useCounter() {
	const { queryParams } = useCustomNavigation();

	const category_id = queryParams.get("category_id") ?? "";
	const query = useQuery(["investments-metrics", category_id], () =>
		getInvestmentMetrics({ category_id })
	);

	return {
		...query,
	};
}
