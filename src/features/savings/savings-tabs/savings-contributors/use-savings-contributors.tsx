import useCustomNavigation from "@/hooks/use-navigation";
import { formatSearchString } from "@/lib/build-query-string";

import { useAppSelector } from "@/store/hooks";
import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import getSavingsContributors from "@/services/savings/get-savings-contributors";

export default function useSavingsContributors() {
	const { currency } = useAppSelector((state) => state.account);
	const { location } = useCustomNavigation();

	const query_string = React.useMemo(() => formatSearchString(location.search), [location.search]);

	const query = useQuery(["savings-contributors", query_string], () =>
		getSavingsContributors({ query_string })
	);
	return {
		...query,
		sign: currency.sign,
	};
}
