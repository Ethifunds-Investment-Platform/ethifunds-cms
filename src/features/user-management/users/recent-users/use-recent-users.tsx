import useCustomNavigation from "@/hooks/use-navigation";
import getRecentUsers from "@/services/users/get-recent-users";
import { useMemo } from "react";
import { useQuery } from "react-query";

export default function useRecentUsers() {
	const { queryParams } = useCustomNavigation();
	const hasQuery = queryParams.has("status");
	const query = useQuery(["recent-users"], () => getRecentUsers());

	useMemo(() => {
		if (!hasQuery && query.isFetched) {
			query.refetch();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasQuery, query.isFetched]);
	return {
		...query,
	};
}
