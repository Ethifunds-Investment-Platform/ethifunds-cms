import { Link } from "react-router-dom";
import ErrorBoundary from "@/components/error-boundary";
import { useAppSelector } from "@/store/hooks";

import { SavingsTransaction } from "@/types/savings.types";
import SavingsTransactionTable from "../savings-transactions-table";
import useCustomNavigation from "@/hooks/use-navigation";

type SavingsTransactionsProps = {
	data: SavingsTransaction[];
};
export default function RecentSavingsTransactions(props: SavingsTransactionsProps) {
	const { currency } = useAppSelector((state) => state.account);
	const { params } = useCustomNavigation();

	const savings_id = params.savings_id;

	const sign = currency.sign;
	const data = props.data;

	return (
		<div className="space-y-5">
			<ErrorBoundary>
				<div className="flex items-center justify-between px-1">
					<h1 className="highlight-accent text-neutral-1000">Recent Savings Transactions </h1>
					{data && data?.length > 0 && (
						<Link to={`/savings/${savings_id}/transactions`} className="underline text-primary">
							View All
						</Link>
					)}
				</div>

				<div className="h-full overflow-auto max-h-96 min-h-60">
					<SavingsTransactionTable data={data ?? []} isEmpty={!data?.length} sign={sign} />
				</div>
			</ErrorBoundary>
		</div>
	);
}
