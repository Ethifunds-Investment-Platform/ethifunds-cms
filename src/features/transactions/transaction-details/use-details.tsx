import useCustomNavigation from "@/hooks/use-navigation";
import getTransactionDetails from "@/services/transactions/get-transaction-details";
import useAppSelectors from "@/store/use-app-selectors";
import { useQuery } from "react-query";

export default function useDetails() {
	const { currency } = useAppSelectors("account");
	const { params } = useCustomNavigation();
	const transaction_id = params.transaction_id ?? "";
	const query = useQuery(["transactions-details", currency], () =>
		getTransactionDetails({ transaction_id })
	);
	return {
		...query,
		sign: currency.sign,
	};
}
