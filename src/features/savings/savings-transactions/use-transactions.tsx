import useCustomNavigation from "@/hooks/use-navigation";
import { formatSearchString } from "@/lib/build-query-string";
import getSavingsTransactions from "@/services/savings/get-savings-transactions";

import { useAppSelector } from "@/store/hooks";
import * as React from "react";
import { useQuery } from "react-query";

export default function useSavingsTransactions() {
	const { currency } = useAppSelector((state) => state.account);
	const { location, params } = useCustomNavigation();

	const savings_id = params.savings_id ?? "";
	const query_string = React.useMemo(
		() => formatSearchString(location.search, {}),
		[location.search]
	);

	const query = useQuery(["savings-transactions", query_string], () =>
		getSavingsTransactions({ query_string, savings_id })
	);
	return {
		...query,
		sign: currency.sign,
	};
}
