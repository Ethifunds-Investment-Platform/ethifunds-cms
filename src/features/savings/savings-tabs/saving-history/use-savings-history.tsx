import useCustomNavigation from "@/hooks/use-navigation";
import { formatSearchString } from "@/lib/build-query-string";
import getSavings from "@/services/savings/get-savings";

import { useAppSelector } from "@/store/hooks";
import * as React from "react";
import { useQuery } from "react-query";

export default function useSavingsHistory() {
	const { currency } = useAppSelector((state) => state.account);
	const { location } = useCustomNavigation();

	const query_string = React.useMemo(() => formatSearchString(location.search), [location.search]);

	const query = useQuery(["savings-history", query_string], () => getSavings({ query_string }));
	return {
		...query,
		sign: currency.sign,
	};
}
