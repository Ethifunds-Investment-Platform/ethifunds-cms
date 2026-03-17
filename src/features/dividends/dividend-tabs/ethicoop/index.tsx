import { useQuery } from "@tanstack/react-query";
import { TabsContent } from "@/components/ui/tabs";
import Render from "@/components/render";
import EthicoopSummaryTable from "../../ethicoop-summary-table";
import getEthicoopSummary from "@/services/dividends/get-ethicoop-summary";
import EthicoopHistoryTable from "../../ethicoop-history-table";
import TablePagination from "../../ethicoop-history-table/table-pagination";
import getEthicoopDividends from "@/services/dividends/get-ethicoop-dividends";
import useCustomNavigation from "@/hooks/use-navigation";
import { formatSearchString } from "@/lib/build-query-string";
import * as React from "react";

export default function EthicoopTab() {
	const { location } = useCustomNavigation();
	const query_string = React.useMemo(() => formatSearchString(location.search), [location.search]);

	const summary = useQuery(["ethicoop-dividend-summary"], () => getEthicoopSummary());

	const history = useQuery(["ethicoop-dividend-history", query_string], () =>
		getEthicoopDividends({ query_string })
	);

	return (
		<TabsContent value="ethicoop" className="space-y-8 pt-5">
			<div className="space-y-3">
				<h3 className="content-accent">Per-Quarter Summary</h3>
				<Render isLoading={summary.isFetching} isError={summary.isError} error={summary.error}>
					<div className="overflow-auto">
						<EthicoopSummaryTable
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
						<EthicoopHistoryTable
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
