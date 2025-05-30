import EmptyData from "@/components/empty-data";
import ErrorBoundary from "@/components/error-boundary";
import Render from "@/components/render";
import getTopInvestments from "@/services/investments/metrics/top-investments";
import { useQuery } from "@tanstack/react-query";
import TopInvestmentCard from "./top-investment-card";
import useAppSelectors from "@/store/use-app-selectors";
import { Skeleton } from "@/components/ui/skeleton";
import useCustomNavigation from "@/hooks/use-navigation";

export default function TopInvestments() {
	const { currency } = useAppSelectors("account");
	const { queryParams } = useCustomNavigation();

	const category_id = queryParams.get("category_id") ?? "";
	const { isFetching, isError, error, data } = useQuery(["top-investments", category_id], () =>
		getTopInvestments({ category_id })
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
						<span>Top Investments</span>
						<span>Value({currency.sign})</span>
					</div>
					{data && data?.length < 1 ? (
						<EmptyData
							title="No Top Ranking Investment"
							text="all top ranking investment would show here"
						/>
					) : (
						data?.map((item, idx) => <TopInvestmentCard key={idx} {...item} />)
					)}
				</div>
			</Render>
		</ErrorBoundary>
	);
}
