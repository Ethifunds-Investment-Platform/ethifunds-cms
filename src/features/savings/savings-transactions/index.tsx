import AppContainer from "@/components/container/container";
import Render from "@/components/render";
import * as React from "react";
import useUi from "@/hooks/use-ui";
import useSavingsTransactions from "./use-transactions";
import SavingsTransactionTable from "../savings-transactions-table";
import TableFilters from "../savings-transactions-table/table-filters";
import TablePagination from "../savings-transactions-table/table-pagination";


export default function SavingsTransactions() {
	const { isFetching, isError, error, data, sign } = useSavingsTransactions();
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
			<h1 className="hero-accent">Savings Transaction History</h1>

			<TableFilters disabled={isFetching} />

			<div className="flex h-screen flex-col">
				<Render isLoading={isFetching} isError={isError} error={error}>
					<div className="grow overflow-auto">
						<SavingsTransactionTable
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
