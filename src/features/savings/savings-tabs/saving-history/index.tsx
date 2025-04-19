import TabContainer from "../tab-container";
import TableFilters from "../../savings-table/table-filters";
import Render from "@/components/render";
import SavingsTable from "../../savings-table";
import TablePagination from "../../savings-table/table-pagination";
import * as React from "react";
import useSavingsHistory from "./use-savings-history";

export default React.memo(function SavingsHistory() {
	const { isFetching, isError, error, data, sign } = useSavingsHistory();

	return (
		<TabContainer value="savings_history" className="space-y-5">
			<h1 className="hero-accent">Savings History</h1>

			<TableFilters disabled={isFetching} />

			<div className="flex h-screen flex-col">
				<Render isLoading={isFetching} isError={isError} error={error}>
					<div className="grow overflow-auto">
						<SavingsTable
							data={data?.docs?.slice(0) ?? []}
							isEmpty={!data?.docs?.length}
							sign={sign}
						/>
					</div>
					{data && <TablePagination {...data} />}
				</Render>
			</div>
		</TabContainer>
	);
});
