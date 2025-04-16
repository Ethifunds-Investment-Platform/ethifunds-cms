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
			title: "Total Admins",
			count: data?.total_admins ?? 0,
		},
		{
			title: "Active Admins",
			count: data?.active_admins ?? 0,
		},
		{
			title: "Inactive Admins",
			count: data?.inactive_admins ?? 0,
		},
		{
			title: "Suspended Admins",
			count: data?.suspended_admins ?? 0,
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
