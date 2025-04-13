import useCustomNavigation from "@/hooks/use-navigation";
import { formatSearchString } from "@/lib/build-query-string";
import getListing from "@/services/listing/get-listing";

import { useAppSelector } from "@/store/hooks";
import * as React from "react";
import { useQuery } from "react-query";

export default function useListing() {
	const { currency } = useAppSelector((state) => state.account);
	const { location } = useCustomNavigation();
	

	const query_string = React.useMemo(
		() =>
			formatSearchString(location.search, {
				currency: currency.code,
			}),
		[currency.code, location.search]
	);

	
	const query = useQuery(["listings", query_string], () => getListing({ query_string }));
	return {
		...query,
		sign: currency.sign,
	};
}
