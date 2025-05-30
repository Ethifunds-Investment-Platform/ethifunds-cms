import getRecentTransactions from "@/services/transactions/recent-transactions";
import { useAppSelector } from "@/store/hooks";
import { useQuery } from "@tanstack/react-query";

export default function useRecentTransactions() {
	const { currency } = useAppSelector((state) => state.account);

	const query = useQuery(["recent-transactions", currency], () => getRecentTransactions({}), {
		select: (data) => (data?.length > 5 ? data?.slice(0, 5) : data),
	});
	return {
		...query,
		sign: currency.sign,
	};
}
