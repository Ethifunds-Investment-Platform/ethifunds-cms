import useCustomNavigation from "@/hooks/use-navigation";
import getRecentListing from "@/services/listing/get-recent-listing";
import { useAppSelector } from "@/store/hooks";
import { useMemo } from "react";
import { useQuery } from "react-query";

export default function useRecentListing() {
	const { currency } = useAppSelector((state) => state.account);
	const { queryParams } = useCustomNavigation();
	const hasQuery = queryParams.has("status");
	const query = useQuery(["recent-listing", "listings"], () => getRecentListing({}));

	useMemo(() => {
		if (!hasQuery && query.isFetched) {
			query.refetch();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasQuery, query.isFetched]);
	return {
		...query,
		sign: currency.sign,
	};
}
