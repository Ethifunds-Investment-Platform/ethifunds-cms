import TransactionTable from "../transaction-table";
import ErrorBoundary from "@/components/error-boundary";
import { useAppSelector } from "@/store/hooks";
import usePendingTransactions from "./use-pending-transactions";
import Render from "@/components/render";
import { Link } from "react-router-dom";

export default function PendingTransactions() {
	const { currency } = useAppSelector((state) => state.account);
	const { isFetching, isError, error, data } = usePendingTransactions();

	const sign = currency.sign;

	return (
		<div className="space-y-5">
			<ErrorBoundary>
				<div className="flex items-center justify-between px-1">
					<h1 className="highlight-accent text-neutral-1000">Pending Transactions </h1>

					<Link to={`/transactions/all-transactions`} className="underline text-primary">
						View All Transactions
					</Link>
				</div>

				<Render isLoading={isFetching} isError={isError} error={error}>
					<div className="h-full overflow-auto max-h-96 min-h-60">
						<TransactionTable data={data ?? []} isEmpty={!data?.length} sign={sign} />
					</div>
				</Render>
			</ErrorBoundary>
		</div>
	);
}
