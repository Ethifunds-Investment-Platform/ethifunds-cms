import getRecentListing from "@/services/listing/get-recent-listing";
import { useAppSelector } from "@/store/hooks";
import { useQuery } from "react-query";

export default function useRecentListing() {
	const { currency } = useAppSelector((state) => state.account);

	const query = useQuery(["recent-listing", currency], () => getRecentListing({}));
	return {
		...query,
		sign: currency.sign,
	};
}
