import TransactionTable from "../transaction-table";
import { Link } from "react-router-dom";
import ErrorBoundary from "@/components/error-boundary";
import { useAppSelector } from "@/store/hooks";
import useRecentTransactions from "./use-recent-transactions";
import Render from "@/components/render";

export default function RecentTransactions() {
	const { currency } = useAppSelector((state) => state.account);
	const { isFetching, isError, error, data } = useRecentTransactions();

	const sign = currency.sign;

	return (
		<div className="space-y-5">
			<ErrorBoundary>
				<div className="flex items-center justify-between px-1">
					<h1 className="highlight-accent text-neutral-1000">Recent Transactions </h1>
					{data && data?.length > 0 && (
						<Link to={`/transactions/all-transactions`} className="underline text-primary">
							View All
						</Link>
					)}
				</div>

				<Render isLoading={isFetching} isError={isError} error={error}>
					<div className="h-full overflow-auto max-h-96 min-h-60">
						<TransactionTable data={data?? []} isEmpty={!data?.length} sign={sign} />
					</div>
				</Render>
			</ErrorBoundary>
		</div>
	);
}
