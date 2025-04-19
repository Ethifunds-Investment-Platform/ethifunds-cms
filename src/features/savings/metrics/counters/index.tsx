import { SkeletonList } from "@/components/ui/skeleton";
import useCounter from "./use-counters";
import CounterCard from "./counter-card";
import Render from "@/components/render";
import ErrorBoundary from "@/components/error-boundary";
import useAppSelectors from "@/store/use-app-selectors";

export type Counter = {
	title: string;
	count: number;
};

export default function Counters() {
	const { currency } = useAppSelectors("account");
	const { isFetching, isError, error, data } = useCounter();
	const sign = currency.sign;

	const dataList: Counter[] = [
		{
			title: "Completed Cycles",
			count: data?.completed_cycles ?? 0,
		},
		{
			title: "Total Contributors",
			count: data?.total_contributors ?? 0,
		},
		{
			title: `Amount Raised (${sign})`,
			count: data?.amount_raised ?? 0,
		},
		{
			title: `Amount Disbursed (${sign})`,
			count: data?.amount_disbursed ?? 0,
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
