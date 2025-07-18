import AppContainer from "@/components/container/container";
import TransactionFilters from "../transaction-table/transaction-filters";
import Render from "@/components/render";
import TransactionTable from "../transaction-table";
import useTransactions from "./use-transactions";
import TablePagination from "../transaction-table/table-pagination";
import * as React from "react";
import useUi from "@/hooks/use-ui";

export default function AllTransactions() {
	const { isFetching, isError, error, data, sign } = useTransactions();
	const { changeBackBtn } = useUi({});

	React.useLayoutEffect(() => {
		changeBackBtn({
			show: true,
		});

		return () => {
			changeBackBtn(null);
		};
	}, [changeBackBtn]);

	return (
		<AppContainer className="space-y-5">
			<h1 className="hero-accent">Transaction History</h1>

			<TransactionFilters disabled={isFetching} />

			<div className="flex flex-col h-screen">
				<Render isLoading={isFetching} isError={isError} error={error}>
					<div className="overflow-auto grow">
						<TransactionTable
							data={data?.docs?.slice(0) ?? []}
							isEmpty={!data?.docs?.length}
							sign={sign}
						/>
					</div>
					{data && <TablePagination {...data} />}
				</Render>
			</div>
		</AppContainer>
	);
}
