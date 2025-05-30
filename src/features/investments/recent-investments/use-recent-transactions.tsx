import useCustomNavigation from "@/hooks/use-navigation";
import getRecentInvestments from "@/services/investments/get-recent-investments";
import { useAppSelector } from "@/store/hooks";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";

export default function useRecentInvestment() {
	const { currency } = useAppSelector((state) => state.account);

	const { queryParams } = useCustomNavigation();
	const category_id = queryParams.get("category_id") ?? "";

	const hasActionQuery = queryParams.has("action");

	const query = useQuery(["recent-Investments", category_id], () =>
		getRecentInvestments({ category_id })
	);

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
