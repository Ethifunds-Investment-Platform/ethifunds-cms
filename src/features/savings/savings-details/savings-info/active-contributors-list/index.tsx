import EmptyData from "@/components/empty-data";
import ErrorBoundary from "@/components/error-boundary";
import Render from "@/components/render";
import { useQuery } from "@tanstack/react-query";
import ContributorCard from "./contributor-card";
import useAppSelectors from "@/store/use-app-selectors";
import { Skeleton } from "@/components/ui/skeleton";
import getCycleContributors from "@/services/savings/get-cycle-contributors";
import { amountSeparator } from "@/lib/amount-separator";

type ContributorsProps = {
	savings_id: string;
};
export default function ActiveContributorsList(props: ContributorsProps) {
	const { currency } = useAppSelectors("account");

	const savings_id = props.savings_id;
	const { isFetching, isError, error, data } = useQuery(
		["active-contribution-list", savings_id],
		() => getCycleContributors({ savings_id }),
		{
			enabled: !props.savings_id ? false : true,
		}
	);


	return (
		<ErrorBoundary>
			<Render
				isLoading={isFetching}
				isError={isError}
				error={error}
				loadingComponent={<Skeleton className="h-80 lg:w-2/5 w-full" />}
			>
				<div className="p-5 border rounded-lg space-y-3 overflow-auto max-h-80 w-full lg:w-2/5">
					<div className="flex justify-between gap-3 border-b [&_span]:content-accent pb-3">
						<span>Contributors ({amountSeparator(data?.length ?? 0)})</span>
						<span className="content-standard">
							Amount Raised/ <br />
							Target Amount({currency.sign})
						</span>
					</div>
					{data && data?.length < 1 ? (
						<EmptyData title="No contribution made yet" text="all contributions will appear here" />
					) : (
						data?.map((item, idx) => <ContributorCard key={idx} {...item} />)
					)}
				</div>
			</Render>
		</ErrorBoundary>
	);
}
