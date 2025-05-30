import ExportFilter from "@/components/table-filters/export-filter";
import { DateFilter } from "@/components/table-filters/date-filter";
import StatusFilter from "@/components/table-filters/status-filter";
import TableSearchBar from "./table-search-bar";

export type FilterProps = {
	disabled: boolean;
};
export default function TableFilters(props: FilterProps) {
	const statusList = [
		{
			name: "all",
			path: "all",
		},

		{
			name: "pending",
			path: "pending",
		},

		{
			name: "approved",
			path: "approved",
		},
		{
			name: "rejected",
			path: "rejected",
		},
		{
			name: "completed",
			path: "completed",
		},
	];

	return (
		<div className="flex items-center gap-3 overflow-auto py-1">
			<TableSearchBar {...props} />

			<StatusFilter {...props} statusList={statusList} />
			<ExportFilter {...props} url="/listing/export" />
			<DateFilter {...props} />
		</div>
	);
}
