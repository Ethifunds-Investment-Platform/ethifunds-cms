import useCustomNavigation from "@/hooks/use-navigation";
import getAdmins from "@/services/admins/get-admins";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";

export default function useAllAdmins() {
	const { queryParams } = useCustomNavigation();
	const hasQuery = queryParams.has("status");
	const query = useQuery(["admins"], () => getAdmins());

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
