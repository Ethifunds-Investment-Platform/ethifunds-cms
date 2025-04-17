import useCustomNavigation from "@/hooks/use-navigation";
import getRecentInvestments from "@/services/investments/get-recent-investments";
import { useAppSelector } from "@/store/hooks";
import { useQuery } from "react-query";

export default function useRecentInvestment() {
	const { currency } = useAppSelector((state) => state.account);

	const { queryParams } = useCustomNavigation();
	const category_id = queryParams.get("category_id") ?? "";

	const query = useQuery(["recent-Investments", category_id], () =>
		getRecentInvestments({ category_id })
	);
	return {
		...query,
		sign: currency.sign,
		category_id,
	};
}
