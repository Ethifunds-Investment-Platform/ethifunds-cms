import useCustomNavigation from "@/hooks/use-navigation";
import { formatSearchString } from "@/lib/build-query-string";
import getTransactions from "@/services/transactions/get-transactions";

import { useAppSelector } from "@/store/hooks";
import * as React from "react";
import { useQuery } from "react-query";

export default function useTransactions() {
	const { currency } = useAppSelector((state) => state.account);
	const { location } = useCustomNavigation();

	const query_string = React.useMemo(
		() =>
			formatSearchString(location.search, {
				currency: currency.code,
			}),
		[currency.code, location.search]
	);

	const query = useQuery(["transactions", query_string], () => getTransactions({ query_string }));
	return {
		...query,
		sign: currency.sign,
	};
}
