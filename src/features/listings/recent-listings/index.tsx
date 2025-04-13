import ListingTable from "../listing-table";
import { Link } from "react-router-dom";
import ErrorBoundary from "@/components/error-boundary";
import { useAppSelector } from "@/store/hooks";
import useRecentListing from "./use-recent-listing";
import Render from "@/components/render";

export default function RecentListing() {
	const { currency } = useAppSelector((state) => state.account);
	const { isFetching, isError, error, data } = useRecentListing();

	const sign = currency.sign;

	return (
		<div className="space-y-5">
			<ErrorBoundary>
				<div className="flex items-center justify-between px-1">
					<h1 className="highlight-accent text-neutral-1000">Recent Listing </h1>
					{data && data?.length > 0 && (
						<Link to={`/listings/all-listings`} className="text-primary underline">
							View All
						</Link>
					)}
				</div>

				<Render isLoading={isFetching} isError={isError} error={error}>
					<div className="h-full max-h-96 min-h-60 overflow-auto">
						<ListingTable data={data ?? []} isEmpty={!data?.length} sign={sign} />
					</div>
				</Render>
			</ErrorBoundary>
		</div>
	);
}
