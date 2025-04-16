import { formatSearchString } from "@/lib/build-query-string";
import getUsers from "@/services/users/get-users";
import * as React from "react";
import { useQuery } from "react-query";

export default function useAllUsers() {
	const query_string = React.useMemo(() => formatSearchString(location.search), []);

	const query = useQuery(["users", query_string], () => getUsers({ query_string }));
	return {
		...query,
	};
}
