import { SkeletonList } from "@/components/ui/skeleton";
import useCounter from "./use-counters";
import CounterCard from "./counter-card";
import Render from "@/components/render";
import ErrorBoundary from "@/components/error-boundary";

export type Counter = {
	title: string;
	count: number;
};

export default function Counters() {
	const { isFetching, isError, error, data } = useCounter();

	const dataList: Counter[] = [
		{
			title: "Total Investments",
			count: data?.total_investment ?? 0,
		},
		{
			title: "Active Investment",
			count: data?.active_investment ?? 0,
		},
		{
			title: "Inactive Investment",
			count: data?.inactive_investment ?? 0,
		},

		{
			title: "Completed Investment",
			count: data?.completed_investment ?? 0,
		},

		{
			title: "Total Investors",
			count: data?.total_investors ?? 0,
		},
	];

	return (
		<div className="grid grid-cols-3 gap-3">
			<ErrorBoundary>
				<Render
					isLoading={isFetching}
					isError={isError}
					error={error}
					loadingComponent={<SkeletonList count={dataList.length} className="h-24" />}
				>
					{dataList.map((item, idx) => (
						<CounterCard key={idx} {...item} />
					))}
				</Render>
			</ErrorBoundary>
		</div>
	);
}
