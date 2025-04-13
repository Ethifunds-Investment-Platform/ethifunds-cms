import EmptyData from "@/components/empty-data";
import ErrorBoundary from "@/components/error-boundary";
import Render from "@/components/render";
import { useQuery } from "react-query";
import ListingTrendCard from "./listing-trend-card";
import useAppSelectors from "@/store/use-app-selectors";
import { Skeleton } from "@/components/ui/skeleton";
import getListingTrends from "@/services/listing/metrics/listing-trends";

export default function ListingTrends() {
	const { currency } = useAppSelectors("account");
	const { isFetching, isError, error, data } = useQuery(["listing-trends"], () =>
		getListingTrends()
	);

	return (
		<ErrorBoundary>
			<Render
				isLoading={isFetching}
				isError={isError}
				error={error}
				loadingComponent={<Skeleton className="h-80" />}
			>
				<div className="p-5 border rounded-lg space-y-3">
					<div className="flex justify-between border-b [&_span]:content-accent pb-3">
						<span>User Listing Trends (units)</span>
						<span>Value({currency.sign})</span>
					</div>
					{data && data?.length < 1 ? (
						<EmptyData
							title="No Top Ranking Investment"
							text="all top ranking investment would show here"
						/>
					) : (
						data?.map((item, idx) => <ListingTrendCard key={idx} {...item} />)
					)}
				</div>
			</Render>
		</ErrorBoundary>
	);
}
