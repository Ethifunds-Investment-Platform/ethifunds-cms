import getListingMetrics from "@/services/listing/metrics/listing-metrics";

import { useQuery } from "@tanstack/react-query";

export default function useCounter() {
	const query = useQuery(["listing-metrics"], () => getListingMetrics());

	return {
		...query,
	};
}
