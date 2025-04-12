import getRecentTransactions from "@/services/transactions/recent-transactions";
import { useAppSelector } from "@/store/hooks";
import { useQuery } from "react-query";

export default function useRecentTransactions() {
	const { currency } = useAppSelector((state) => state.account);

	const query = useQuery(["recent-transactions", currency], () => getRecentTransactions({}));
	return {
		...query,
		sign: currency.sign,
	};
}
