import { useQuery } from "@tanstack/react-query";
import { TabsContent } from "@/components/ui/tabs";
import Render from "@/components/render";
import EthivestSummaryTable from "../../ethivest-summary-table";
import getEthivestSummary from "@/services/dividends/get-ethivest-summary";
import EthivestHistoryTable from "../../ethivest-history-table";
import TablePagination from "../../ethivest-history-table/table-pagination";
import getEthivestDividends from "@/services/dividends/get-ethivest-dividends";
import useCustomNavigation from "@/hooks/use-navigation";
import { formatSearchString } from "@/lib/build-query-string";
import * as React from "react";

export default function EthivestTab() {
	const { location } = useCustomNavigation();
	const query_string = React.useMemo(() => formatSearchString(location.search), [location.search]);

	const summary = useQuery(["ethivest-dividend-summary"], () => getEthivestSummary());

	const history = useQuery(["ethivest-dividend-history", query_string], () =>
		getEthivestDividends({ query_string })
	);

	return (
		<TabsContent value="ethivest" className="space-y-8 pt-5">
			<div className="space-y-3">
				<h3 className="content-accent">Per-Product Summary</h3>
				<Render isLoading={summary.isFetching} isError={summary.isError} error={summary.error}>
					<div className="overflow-auto">
						<EthivestSummaryTable
							data={summary.data ?? []}
							isEmpty={!summary.data?.length}
						/>
					</div>
				</Render>
			</div>

			<div className="space-y-3">
				<h3 className="content-accent">Dividend History</h3>
				<Render isLoading={history.isFetching} isError={history.isError} error={history.error}>
					<div className="overflow-auto">
						<EthivestHistoryTable
							data={history.data?.docs ?? []}
							isEmpty={!history.data?.docs?.length}
						/>
					</div>
					{history.data && <TablePagination {...history.data} />}
				</Render>
			</div>
		</TabsContent>
	);
}
