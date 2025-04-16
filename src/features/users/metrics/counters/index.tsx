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
			title: "Total Users",
			count: data?.total_users ?? 0,
		},
		{
			title: "Active Users",
			count: data?.active_users ?? 0,
		},
		{
			title: "Inactive Users",
			count: data?.inactive_users ?? 0,
		},
		{
			title: "Suspended Users",
			count: data?.suspended_users ?? 0,
		},
		{
			title: "Investors",
			count: data?.investors ?? 0,
		},
	];

	return (
		<div className="grid grid-cols-3 lg:grid-cols-5 gap-3">
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
