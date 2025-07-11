import useCustomNavigation from "@/hooks/use-navigation";
import { formatSearchString } from "@/lib/build-query-string";

import { useAppSelector } from "@/store/hooks";
import * as React from "react";
import { useQuery } from "@tanstack/react-query";

import bulkWithdrawalApproval from "@/services/savings/bulk-withdrawal-approval";
import getSavingsWithdrawals from "@/services/savings/get-savings-withdrawals copy";
import { toast } from "sonner";

export default function useSavingsWithdrawals() {
	const { currency } = useAppSelector((state) => state.account);
	const [isApproving, setIsApproving] = React.useState(false);
	const { location } = useCustomNavigation();

	const query_string = React.useMemo(() => formatSearchString(location.search), [location.search]);

	const query = useQuery(["savings-withdrawals", query_string], () =>
		getSavingsWithdrawals({ query_string, status: "pending" })
	);

	const approveAll = async () => {
		if (!query.data) return;
		setIsApproving(true);
		try {
			await bulkWithdrawalApproval({
				withdrawal_ids: query.data?.docs?.map((item) => item.id) ?? [],
			});
			toast.success("bulk withdrawals approved successfully");
			query.refetch();
		} catch (error) {
			toast.error("failed to approve bulk withdrawals");
			throw error;
		} finally {
			setIsApproving(false);
		}
	};
	return {
		...query,
		sign: currency.sign,
		approveAll,
		isApproving,
	};
}
