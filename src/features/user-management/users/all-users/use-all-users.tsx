import useCustomNavigation from "@/hooks/use-navigation";
import { formatSearchString } from "@/lib/build-query-string";
import getUsers from "@/services/users/get-users";
import * as React from "react";
import { useQuery } from "@tanstack/react-query";

export default function useAllUsers() {
	const { location } = useCustomNavigation();

	const query_string = React.useMemo(() => formatSearchString(location.search), [location.search]);

	const query = useQuery(["users", query_string], () => getUsers({ query_string }), {});


	return {
		...query,
	};
}
