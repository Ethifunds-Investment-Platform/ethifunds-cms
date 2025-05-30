import getPendingTransactions from "@/services/transactions/pending-transactions";
import { useAppSelector } from "@/store/hooks";
import { useQuery } from "@tanstack/react-query";

export default function usePendingTransactions() {
	const { currency } = useAppSelector((state) => state.account);

	const query = useQuery(["pending-transactions", currency], () => getPendingTransactions(), {});
	return {
		...query,
		sign: currency.sign,
	};
}
