import TabContainer from "../tab-container";
import TableFilters from "../../contributors-table/table-filters";
import Render from "@/components/render";
import TablePagination from "../../contributors-table/table-pagination";
import * as React from "react";
import useSavingsContributors from "./use-savings-contributors";
import ContributorsTable from "../../contributors-table";

export default React.memo(function SavingsContributors() {
	const { isFetching, isError, error, data, sign } = useSavingsContributors();

	return (
		<TabContainer value="savings_contributors" className="space-y-5">
			<h1 className="hero-accent">Savings Contributors</h1>

			<TableFilters disabled={isFetching} />

			<div className="flex flex-col h-screen">
				<Render isLoading={isFetching} isError={isError} error={error}>
					<div className="overflow-auto grow">
						<ContributorsTable
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
