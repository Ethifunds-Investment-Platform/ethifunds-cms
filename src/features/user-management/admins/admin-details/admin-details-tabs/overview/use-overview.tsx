import useCustomNavigation from "@/hooks/use-navigation";
import getAdminDetails from "@/services/admins/get-admin-details";
import { Admin } from "@/types/admin.types";
import * as React from "react";
import { useQuery } from "@tanstack/react-query";

export default function useOverview() {
	const [admin, setAdmin] = React.useState<Admin | null>(null);
	const { params, queryParams } = useCustomNavigation();

	const hasStatusQuery = queryParams.has("status");

	const user_id = params.user_id ?? "";

	const { isFetching, isError, error, ...query } = useQuery(
		["admin-details"],
		() => getAdminDetails({ user_id }),
		{
			onSuccess(data) {
				setAdmin(data);
			},
		}
	);

	React.useMemo(() => {
		if (!hasStatusQuery && query.isFetched) {
			query.refetch();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasStatusQuery, query.isFetched]);

	return {
		isFetching,
		isError,
		error,
		admin,
	};
}
