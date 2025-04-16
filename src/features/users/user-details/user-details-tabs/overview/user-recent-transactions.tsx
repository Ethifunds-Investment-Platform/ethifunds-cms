import { Transaction } from "@/types/transaction.types";
import TransactionTable from "./transaction-table";
import useAppSelectors from "@/store/use-app-selectors";
import * as React from "react";

type TransactionsProps = {
	data: Transaction[];
};
export default function UserRecentTransactions(props: TransactionsProps) {
	const { currency } = useAppSelectors("account");
	const data = props.data;
	const sign = currency.sign;

	return (
		<React.Fragment>
			<h1 className="highlight-accent text-neutral-1000">Recent Transactions</h1>
			<div className="h-full max-h-96 min-h-60 overflow-auto">
				<TransactionTable data={data ?? []} isEmpty={!data?.length} sign={sign} />
			</div>
		</React.Fragment>
	);
}
