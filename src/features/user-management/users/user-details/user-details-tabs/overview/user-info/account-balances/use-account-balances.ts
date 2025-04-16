import useCustomNavigation from "@/hooks/use-navigation";
import getUserAccountBalances from "@/services/users/get-user-account-balances";
import { useQuery } from "react-query";
import * as React from "react";
import { UserAccountBalances } from "@/types/user.types";
import useAppSelectors from "@/store/use-app-selectors";

export default function useAccountBalances() {
	const { currency } = useAppSelectors("account");
	const [balances, setBalances] = React.useState<UserAccountBalances>({
		wallet_balance: 0,
		vault_balance: 0,
		ethivest_balance: 0,
		ethicoop_balance: 0,
		reits_balance: 0,
	});
	const { params } = useCustomNavigation();
	const user_id = params.user_id ?? "";

	const { isFetching, isError, error } = useQuery(
		["account-balances"],
		() => getUserAccountBalances({ user_id }),
		{
			onSuccess(data) {
				setBalances(data);
			},
		}
	);

	return {
		isFetching,
		isError,
		error,
		balances,
		sign: currency.sign,
	};
}
