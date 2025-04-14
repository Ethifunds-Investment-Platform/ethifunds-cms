import { SkeletonList } from "@/components/ui/skeleton";
import useCounter from "./use-counters";
import CounterCard from "./counter-card";
import Render from "@/components/render";
import ErrorBoundary from "@/components/error-boundary";
import { amountSeparator } from "@/lib/amount-separator";
import useAppSelectors from "@/store/use-app-selectors";

export type Counter = {
	title: string;
	count: string;
};

export default function Counters() {
	const { isFetching, isError, error, data } = useCounter();
	const { currency } = useAppSelectors("account");
	const sign = currency.sign;
	const dataList: Counter[] = [
		{
			title: "Total Transactions",
			count: `${amountSeparator(data?.total_transactions ?? 0)}`,
		},
		{
			title: "Total Transactions Amount",
			count: `${sign} ${amountSeparator(data?.total_transactions_amount ?? 0)}`,
		},
		{
			title: "Total Withdrawal",
			count: `${amountSeparator(data?.total_withdrawal ?? 0)}`,
		},

		{
			title: "Total Withdrawal Amount",
			count: `${sign} ${amountSeparator(data?.total_withdrawal_amount ?? 0)}`,
		},
		{
			title: "Total Deposit",
			count: `${amountSeparator(data?.total_deposit ?? 0)}`,
		},
		{
			title: "Total Deposit Amount",
			count: `${sign} ${amountSeparator(data?.total_deposit_amount ?? 0)}`,
		},
		{
			title: "Successful Transactions",
			count: `${amountSeparator(data?.successful_transactions ?? 0)}`,
		},
		{
			title: "Successful Transactions Amount",
			count: `${sign} ${amountSeparator(data?.successful_transactions_amount ?? 0)}`,
		},
		{
			title: "Failed Transactions",
			count: `${amountSeparator(data?.failed_transactions ?? 0)}`,
		},
		{
			title: "Failed Transactions Amount",
			count: `${sign} ${amountSeparator(data?.failed_transactions_amount ?? 0)}`,
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
