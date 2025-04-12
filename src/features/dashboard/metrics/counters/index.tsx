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
			title: "total users",
			count: data?.total_users ?? 0,
		},
		{
			title: "new users",
			count: data?.new_users ?? 0,
		},
		{
			title: "active users",
			count: data?.active_users ?? 0,
		},
		{
			title: "investors",
			count: data?.investors ?? 0,
		},
		{
			title: "total investments",
			count: data?.total_investments ?? 0,
		},
		{
			title: "active investment",
			count: data?.active_investments ?? 0,
		},
	];

	return (
		<div className="grid grid-cols-3 gap-3">
			<ErrorBoundary>
				<Render
					isLoading={isFetching}
					isError={isError}
					error={error}
					loadingComponent={<SkeletonList count={6}   className="h-24"/>}
				>
					{dataList.map((item, idx) => (
						<CounterCard key={idx} {...item} />
					))}
				</Render>
			</ErrorBoundary>
		</div>
	);
}
