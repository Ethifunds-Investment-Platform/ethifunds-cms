import useCustomNavigation from "@/hooks/use-navigation";
import getUserDetails from "@/services/users/get-user-details";
import { Transaction } from "@/types/transaction.types";
import { User } from "@/types/user.types";
import * as React from "react";
import { useQuery } from "react-query";

export default function useOverview() {
	const [user, setUser] = React.useState<User | null>(null);
	const [recentTransaction, setRecentTransaction] = React.useState<Transaction[]>();
	const { params, queryParams } = useCustomNavigation();

	const hasStatusQuery = queryParams.has("status");

	const user_id = params.user_id ?? "";

	const { isFetching, isError, error, ...query } = useQuery(
		["user-details"],
		() => getUserDetails({ user_id }),
		{
			onSuccess({ recent_transactions, ...data }) {
				setUser(data);
				setRecentTransaction(recent_transactions);
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
		user,
		recentTransaction,
	};
}
