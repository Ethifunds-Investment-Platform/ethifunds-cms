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
			title: "Listed Investments",
			count: data?.listed_investments ?? 0,
		},
		{
			title: "approved Listing",
			count: data?.approved_listing ?? 0,
		},
		{
			title: "rejected listing",
			count: data?.rejected_listing ?? 0,
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
