import useCustomNavigation from "@/hooks/use-navigation";
import { formatSearchString } from "@/lib/build-query-string";
import getUsers from "@/services/users/get-users";
import * as React from "react";
import { useQuery } from "react-query";

export default function useAllUsers() {
	const { location, queryParams } = useCustomNavigation();

	const hasQuery = queryParams.has("status");
	const query_string = React.useMemo(() => formatSearchString(location.search), [location.search]);

	const query = useQuery(["users", query_string], () => getUsers({ query_string }), {
		enabled: !hasQuery,
	});

	React.useMemo(() => {
		if (!hasQuery && query.isFetched) {
			query.refetch();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasQuery, query.isFetched]);
	return {
		...query,
	};
}
