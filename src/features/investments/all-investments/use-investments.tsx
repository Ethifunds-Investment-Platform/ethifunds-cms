import useCustomNavigation from "@/hooks/use-navigation";
import { formatSearchString } from "@/lib/build-query-string";
import getInvestments from "@/services/investments/get-investments";

import { useAppSelector } from "@/store/hooks";
import * as React from "react";
import { useQuery } from "@tanstack/react-query";

export default function useInvestments() {
	const { currency } = useAppSelector((state) => state.account);
	const { location, queryParams } = useCustomNavigation();

	const category_id = queryParams.get("category_id") ?? "";

	const hasActionQuery = queryParams.has("action");

	const query_string = React.useMemo(() => formatSearchString(location.search), [location.search]);

	const query = useQuery(["all-investments", query_string], () => getInvestments({ query_string }));

	// this triggers a refetch whenever an action has been performed
	React.useMemo(() => {
		if (!hasActionQuery && query.isFetched) {
			query.refetch();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasActionQuery, query.isFetched]);

	return {
		...query,
		sign: currency.sign,
		category_id,
	};
}